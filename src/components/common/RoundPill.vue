<script setup lang="ts">
const props = defineProps<{
  sentiment?: 'warn' | 'info' | 'success' | 'danger';
}>()
</script>

<template>
  <div
    class="pill"
    :class="`pill-${props.sentiment || 'info'}`"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pill {
  padding: 6px 10px;
  border-radius: 15px;
  font-size: 1.3rem;
}

.pill-info {
  background: $blue-100;
  color: $blue-400;
}

.pill-danger {
  background: $red-100;
  color: $red-400;
}
</style>
