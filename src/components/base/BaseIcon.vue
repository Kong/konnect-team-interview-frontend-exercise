<script setup lang="ts">
const props = defineProps<{
  name: string
  size?: number | string
  alt?: string
}>()

const iconUrl = new URL(`../../assets/icons/${props.name}.svg`, import.meta.url).href
</script>

<template>
  <img
    :alt="props.alt || props.name"
    v-bind="props.size ? { width: props.size, height: props.size } : {}"
    class="base-icon"
    loading="lazy"
    :src="iconUrl"
  >
</template>

<style scoped lang="scss">
.base-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
