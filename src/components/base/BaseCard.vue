<script setup lang="ts">
const props = defineProps<{
  clickable?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<template>
  <div
    class="base-card"
    :class="{ 'base-card--clickable': clickable }"
    role="group"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: var(--space-sm);
  color: var(--color-text-dark);

  &--clickable {
    cursor: pointer;
  }
}
</style>
