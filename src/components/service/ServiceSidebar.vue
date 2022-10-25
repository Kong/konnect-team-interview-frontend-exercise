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
  background: red;
  width: 350px;
  height: calc(100vh - 70px);
  right: 0;

  top: 70px;
  @media (min-width: $md) {
    top: 235px;
  }
}
</style>
