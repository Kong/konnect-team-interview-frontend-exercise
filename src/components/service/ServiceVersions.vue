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
    <h4 class="title">
      Versions ({{ props.service?.versions.length }})
    </h4>
    <div
      v-for="version in props.service?.versions"
      :key="version.id"
      class="version"
    >
      <div>
        <p class="version-name truncate">
          v{{ version.name }}
        </p>
        <p class="version-description">
          {{ version.description }}
        </p>
        <span class="service-type-label">
          {{ service?.type }}
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
            class="truncate developer-name"
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
    margin-bottom: 3.5rem;
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
    }

    .version-name {
      font-size: 13px;
      line-height: 24px;
      font-weight: 600;
      color: $grey-900;
      margin-right: 10px;
      width: 40px;
    }

    .version-description {
      width: 130px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: $grey-700;
      margin-right: 5px;
      font-size: 12px;
      line-height: 16px;
    }

    .service-type-label {
      font-size: 10px;
      font-weight: 500;
      padding: 0 5px;
      border-radius: 4px;
      background: $blue-100;
      color: $blue-400;
    }

    .version-developer-avatar {
      margin-right: 7px;
    }

    .developer-name {
      font-size: 13px;
      line-height: 24px;
      font-weight: 600;
      color: $grey-900;
      max-width: 50px;
    }

    .updated-at {
      font-size: 12px;
      line-height: 16px;
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
