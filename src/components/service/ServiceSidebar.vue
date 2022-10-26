<script setup lang="ts">
import { IServiceDetails } from '@/interfaces/service-details.interface'
import { ref, watch } from 'vue'
import ServiceDetails from '@/components/service/ServiceDetails.vue'
import TimesBig from '@/assets/icons/times-big.svg?component'
import ServiceVersions from '@/components/service/ServiceVersions.vue'

const props = defineProps<{
  service: IServiceDetails | null;
}>()
const emit = defineEmits(['closed'])

const isOpen = ref(false)

watch(props, () => {
  if (props.service) {
    isOpen.value = true
  }
})

watch(isOpen, () => {
  if (!isOpen.value) {
    emit('closed')
  }
})

const offsetTop = ref(70)
document.addEventListener('scroll', () => {
  offsetTop.value = 70 - window.scrollY > 0 ? 70 - window.scrollY : 0
})
</script>

<template>
  <transition name="slideIn">
    <div
      v-if="isOpen"
      class="sidebar-container"
      :style="{ top: `${offsetTop}px`, height: `calc(100vh - ${offsetTop}px)` }"
    >
      <div class="sidebar-content">
        <TimesBig
          class="close-icon"
          @click="isOpen = false"
        />
        <ServiceDetails :service="props.service" />
        <ServiceVersions
          v-if="props.service.versions.length"
          :service="props.service"
        />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.sidebar-container {
  position: fixed;
  background: $white;
  width: 360px;
  right: 0;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04));
  z-index: 10;
  overflow-y: auto;

  .sidebar-content {
    padding: 45px 15px 15px 15px;
    display: flex;
    flex-direction: column;
    position: relative;

    .close-icon {
      position: absolute;
      top: 10px;
      right: 15px;
      padding: 3px;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        background: $grey-100;
      }
    }
  }
}
</style>
