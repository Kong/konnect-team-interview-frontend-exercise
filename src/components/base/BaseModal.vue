<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

function handleOutsideClick(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <div
    class="base-modal"
    @click="handleOutsideClick"
  >
    <div class="base-modal__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5); // dull backdrop

  &__content {
    position: relative;
    max-height: 70vh;
    max-width: 70vw;
    overflow: auto;
    border-radius: 3px;
    background-color: var(--color-surface);
  }
}
</style>
