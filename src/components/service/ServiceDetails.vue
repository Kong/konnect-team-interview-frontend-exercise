<script setup lang="ts">
import { computed } from 'vue'
import { IServiceDetails } from '@/interfaces/service-details.interface'
import Checkmark from '@/assets/icons/checkmark.svg?component'
import Times from '@/assets/icons/times.svg?component'
import RoundPill from '@/components/common/RoundPill.vue'
import useFormatMetrics from '@/composables/useFormatMetrics'
import AvatarGroup from '@/components/common/AvatarGroup.vue'

const props = defineProps<{
  service: IServiceDetails;
  isCard?: boolean;
}>()

const versionCountText = computed(() => {
  return props.service.versions.length > 1
    ? `${props.service.versions.length} versions`
    : `${props.service.versions.length} version`
})

const { uptimeFormatted, requestsFormatted, errorsFormatted } = useFormatMetrics(props.service)

const serviceDevelopers = computed(() => {
  return props.service.versions.filter(version => version.developer).map(version => version.developer)
})
</script>

<template>
  <div class="header">
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
  </div>
  <h3>
    {{ service.name }}
  </h3>
  <p
    class="service-description"
    :class="{ truncate: props.isCard }"
  >
    {{ service.description || "&#8203;" }}
  </p>
  <div class="footer">
    <ul
      v-if="service.configured"
      class="metrics"
    >
      <li>
        {{ service.metrics?.latency }}ms
        <span class="metric-name">latency</span>
      </li>
      <li>{{ uptimeFormatted }}% <span class="metric-name">uptime</span></li>
      <li>
        {{ requestsFormatted }}
        <span class="metric-name">requests</span> &#183; {{ errorsFormatted }}%
        <span class="metric-name">errors</span>
      </li>
    </ul>
    <p
      v-else
      class="runtime-not-configured"
    >
      Not configured with runtime yet
    </p>
    <AvatarGroup
      v-if="serviceDevelopers.length"
      :profiles="serviceDevelopers"
    />
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;

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

.service-description {
  color: $grey-700;
  max-width: 100%;
}

.footer {
  margin-top: 3em;
  display: inline-flex;
  justify-content: space-between;
  align-items: flex-end;

  .metrics {
    list-style-type: none;
    padding: 0 0 0 15px;
    margin: 0;

    li {
      position: relative;
      margin-top: 7px;
      font-weight: 600;

      &::before {
        content: "";
        width: 6px;
        height: 6px;
        background: #42d782;
        display: block;
        border-radius: 100%;
        position: absolute;
        top: calc(50% - 3px);
        left: -15px;
      }
    }

    .metric-name {
      color: $grey-700;
    }
  }

  .runtime-not-configured {
    font-weight: 600;
    color: $grey-700;
    padding: 0 0 0 15px;
    position: relative;
    margin: 60px 0 0 0;

    &::before {
      content: "";
      width: 6px;
      height: 6px;
      background: $grey-400;
      display: block;
      border-radius: 100%;
      position: absolute;
      top: calc(50% - 3px);
      left: 0;
    }
  }
}
</style>
