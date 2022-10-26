<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>()
</script>

<template>
  <transition name="slideIn">
    <div
      v-if="isOpen"
      class="sidebar-container"
    />
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

  top: 70px;
  height: calc(100vh - 70px);
}
</style>
