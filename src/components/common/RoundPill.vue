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
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 13px;
  line-height: 15.73px;
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
