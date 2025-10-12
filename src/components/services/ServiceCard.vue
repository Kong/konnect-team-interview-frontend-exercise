<script setup lang="ts">
import { ServiceStatus, type Service } from '@/types/services'
import BaseCard from '../base/BaseCard.vue'
import BaseButton from '../base/BaseButton.vue'
import {
  getServiceStatusInfo,
  pluralize,
  formatLatency,
  formatUptime,
  formatRequestes,
  formatErrors,
} from '@/utils/services'
import BaseIcon from '../base/BaseIcon.vue'
import AvatarGroup from '../common/AvatarGroup.vue'
import type { AvatarUser } from '../base/BaseAvatar.vue'

const { service } = defineProps<{ service: Service }>()

const emit = defineEmits<{
  (e: 'click', id: Service['id']): void
  (e: 'click:version'): void
}>()

function handleCardClick() {
  emit('click', service.id)
}

const { icon, label, status } = getServiceStatusInfo(service.configured, service.published)
const versionLabel = pluralize('version', service.versions?.length)

const developers = service.versions?.reduce(
  (acc: AvatarUser[], version) => {
    if (version.developer) {
      return [
        ...acc,
        {
          name: version.developer.name,
          url: version.developer.avatar,
          alt: version.developer.name,
        },
      ]
    }
    return acc
  },
  [],
)
</script>

<template>
  <BaseCard
    clickable
    @click="handleCardClick"
  >
    <div class="service-card">
      <header class="service-card__header">
        <div class="service-card__header-top">
          <span class="service-card__status">
            <BaseIcon :name="icon" />
            {{ label }} {{ status === ServiceStatus.PUBLISHED ? ' to portal' : '' }}
          </span>

          <div
            v-if="service.versions?.length"
            class="service-card__actions"
          >
            <BaseButton
              size="sm"
              variant="secondary"
              @click="emit('click:version')"
            >
              {{ versionLabel }}
            </BaseButton>
          </div>
        </div>

        <div class="service-card__header-text">
          <span class="service-card__title">{{ service.name }}</span>
          <span class="service-card__subtitle">{{ service.description }}</span>
        </div>
      </header>

      <main class="service-card__main">
        <ul
          v-if="service.metrics"
          class="service-card__metrics"
        >
          <li class="service-card__metric">
            <span class="service-card__metric-value">{{ formatLatency(service.metrics.latency ?? 0) }}</span>
            <span class="service-card__metric-label">latency</span>
          </li>

          <li class="service-card__metric">
            <span class="service-card__metric-value">{{ formatUptime(service.metrics.uptime) }}</span>
            <span class="service-card__metric-label">uptime</span>
          </li>

          <li class="service-card__metric">
            <span class="service-card__metric-value">{{ formatRequestes(service.metrics.requests) }}</span>
            <span class="service-card__metric-label">requests</span>
            <span class="service-card__metric-value">{{ formatErrors(service.metrics.errors) }}</span>
            <span class="service-card__metric-label">error</span>
          </li>
        </ul>

        <div
          v-else-if="!service.configured"
          class="service-card__metrics service-card__metrics--empty"
        >
          <span class="service-card__metric-label">Not configured with runtime yet</span>
        </div>

        <div class="service-card__developers">
          <AvatarGroup :users="developers" />
        </div>
      </main>
    </div>
  </BaseCard>
</template>

<style lang="scss" scoped>
.service-card {
  display: flex;
  flex-direction: column;

  &__header {
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-text {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: var(--pad-y) 0;
    }

    .service-card__title {
      font-size: var(--font-md);
      font-weight: var(--weight-bold);
    }

    .service-card__subtitle {
      font-size: var(--font-xs);
      color: var(--color-text-muted);
    }
  }

  &__status {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--color-text-muted);
    font-size: var(--font-xs);
  }

  &__actions {
    display: flex;
    align-items: center;
  }

  &__main {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__metrics {
    padding: 0;
    display: flex;
    flex-direction: column;
    font-size: var(--font-xs);
    gap: var(--space-xs);

    &--empty {
      justify-content: center;
      align-items: center;
      color: var(--color-text-muted);
    }

    .service-card__metric {
      list-style-position: inside;
      &-value {
        font-weight: var(--weight-bold);
      }

      &-label {
        padding: var(--space-xs);
        color: var(--color-text-muted);
      }

      &::marker {
        font-size: var(--font-md);
        color: var(--color-primary);
      }
    }
  }
  &__developers {
    display: flex;
    align-items: center;
  }
}
</style>
