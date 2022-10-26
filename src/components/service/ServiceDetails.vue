<script setup lang="ts">
import { computed } from 'vue'
import { ServiceDetails } from '@/interfaces/service-details.interface'
import Checkmark from '@/assets/icons/checkmark.svg?component'
import Times from '@/assets/icons/times.svg?component'
import RoundPill from '@/components/common/RoundPill.vue'

const props = defineProps<{
  service: ServiceDetails;
}>()

const versionCountText = computed(() => {
  return props.service.versions.length > 1 ? `${props.service.versions.length} versions` : `${props.service.versions.length} version`
})
</script>

<template>
  <div>
    <header>
      <div class="status">
        <div v-if="service.published">
          <Checkmark class="stroke-current icon-published" />
          <p class="text-sm">
            Published to portal
          </p>
        </div>
        <div v-else>
          <Times class="stroke-current icon-unpublished" />
          <p class="text-sm">
            Unpublished
          </p>
        </div>
      </div>
      <RoundPill v-if="service.versions.length">
        {{ versionCountText }}
      </RoundPill>
    </header>
    <h3>
      {{ service.name }}
    </h3>
    <p>{{ service.description }}</p>
  </div>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;

  .status > div {
    display: inline-flex;
    align-items: center;

    .icon-published {
      color: $green-400;
    }
    .icon-unpublished {
      color: $grey-400;
    }
  }
}
</style>
