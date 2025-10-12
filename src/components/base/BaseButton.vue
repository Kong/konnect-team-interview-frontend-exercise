<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary'
    disabled?: boolean
  }>(),
  {
    size: 'md',
    variant: 'primary',
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  if (!props.disabled) emit('click', event)
}
</script>

<template>
  <button
    class="base-button"
    :class="[
      `base-button--${props.variant}`,
      `base-button--${props.size}`,
      { 'is-disabled': props.disabled },
    ]"
    :disabled="props.disabled"
    @click.stop="handleClick"
  >
    <slot name="icon-left" />
    <slot>{{ props.label }}</slot>
    <slot name="icon-right" />
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  --border-radius: 3rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: 1px solid transparent;
  border-radius: var(--border-radius);
  font-weight: var(--weight-semibold);
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:disabled,
  &.is-disabled {
    opacity: 0.99999;
    cursor: not-allowed;
  }
  &--sm {
    padding: var(--space-xs) var(--space-md);
    font-size: var(--font-xs);
  }

  &--md {
    padding: var(--space-xs) var(--space-md);
  }

  &--primary {
    color: var(--color-white);
    background-color: var(--color-primary);
  }

  &--secondary {
    color: var(--color-secondary);
    background-color: var(--color-secondary-light);
  }
}
</style>
