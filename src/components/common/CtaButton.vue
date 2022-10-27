<script lang="ts" setup>
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <button class="cta-button">
    <span
      v-if="slots.icon"
      class="icon"
    >
      <slot
        name="icon"
      />
    </span>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.cta-button {
  color: $white;
  padding: 1.1rem 2rem;
  background: $green-500;
  border-radius: 25px;
  display: inline-flex;
  align-items: center;

  .icon {
    color: $white;
    margin-right: 7px;
  }

  &:hover {
    background: $green-400;
  }
}
</style>
