<script setup lang="ts">
import { IServiceDetails } from '@/interfaces/service-details.interface'
import AvatarGroup from '@/components/common/AvatarGroup.vue'

const props = defineProps<{
  service: IServiceDetails | null;
}>()

const developerName = (name: string): string => {
  return `${name.split(' ')[0]} ${name.split(' ')[1].charAt(0)}.`
}
</script>

<template>
  <div class="service-versions">
    <h3 class="title">
      Versions ({{ props.service.versions.length }})
    </h3>
    <div
      v-for="(version, n) in props.service.versions"
      :key="version.id"
      class="version"
    >
      <div>
        <p class="version-number">
          v{{ n + 1 }}.0
        </p>
        <p class="version-description">
          {{ version.description }}
        </p>
        <span class="service-type-label">
          {{ service.type }}
        </span>
      </div>
      <div>
        <AvatarGroup
          v-if="version.developer"
          class="version-developer-avatar"
          :profiles="[version.developer]"
          size="sm"
        />
        <div>
          <p
            v-if="version.developer"
            class="developer-name truncate"
          >
            {{ developerName(version.developer.name) }}
          </p>
          <p class="updated-at">
            2 days ago
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.service-versions {
  margin-top: 5rem;

  .title {
    margin-bottom: 3rem;
  }

  .version {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid $grey-200;

    > div {
      display: inline-flex;
      justify-content: space-between;
      align-items: flex-start;

      &:nth-child(2) {
        align-items: center;
      }
    }

    .version-number {
      font-weight: 600;
      color: $grey-900;
      margin-right: 10px;
    }

    .version-description {
      max-width: 130px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: $grey-700;
      margin-right: 5px;
    }

    .service-type-label {
      padding: 3px 5px;
      border-radius: 4px;
      font-size: 1rem;
      background: $blue-100;
      color: $blue-400;
    }

    .version-developer-avatar {
      margin-right: 7px;
    }

    .developer-name {
      font-size: 1.3rem;
      font-weight: 600;
      color: $grey-900;
      max-width: 50px;
    }

    .updated-at {
      font-size: 1rem;
      color: $grey-700;
    }

    p {
      margin: 0;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
