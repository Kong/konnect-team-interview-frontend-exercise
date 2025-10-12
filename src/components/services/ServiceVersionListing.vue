<script setup lang="ts">
import type { ServiceVersion } from '@/types/services'
import BaseAvatar from '../base/BaseAvatar.vue'
import { formatTimeAgo } from '../../utils/services'

const props = defineProps<{
  versions: ServiceVersion[]
}>()
</script>

<template>
  <div class="version-list">
    <h2>Versions ({{ props.versions.length }})</h2>

    <ul>
      <li
        v-for="version in props.versions"
        :key="version.id"
        class="version-list__item"
      >
        <div class="version-list__left">
          <div class="version-list__name">
            {{ version.name }}
          </div>
          <div class="version-list__description">
            {{ version.description }}
          </div>
          <div class="version-list__tags">
            <span>HTTP</span>
            <span>REST</span>
          </div>
        </div>

        <div
          v-if="version.developer"
          class="version-list__developer"
        >
          <BaseAvatar
            size="md"
            :user="{ name: version.developer.name, url: version.developer.avatar }"
          />
          <div>
            <div class="version-list__dev-name">
              {{ version.developer.name }}
            </div>
            <div class="version-list__updated">
              {{ formatTimeAgo(version.updated_at) }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.version-list {
  background: var(--color-surface);
  padding: var(--pad-y);
  color: var(--color-text-dark);

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--pad-y) 0;
    border-bottom: 1px solid var(--color-border);
    gap: 3rem;
  }

  &__left {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  &__name {
    font-weight: var(--weight-bold);
  }

  &__description {
    flex: 1;
    color: var(--color-text-muted);
    font-size: var(--font-xs);
  }

  &__tags {
    display: flex;
    gap: 4px;
    span {
      background: var(--color-secondary-light);
      color: var(--color-secondary);
      font-size: var(--font-xs);
      padding: var(--space-xs);
      border-radius: 3px;
    }
  }

  &__developer {
    display: flex;
    align-items: center;
    gap: var(--space-xs);

    .version-list__dev-name {
      font-weight: var(--weight-medium);
    }

    .version-list__updated {
      font-size: var(--font-xs);
      color: var(--color-text-muted);
    }
  }
}
</style>
