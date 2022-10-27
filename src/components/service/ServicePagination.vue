<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  services: any[];
  currentOffset: number;
}>()

const emit = defineEmits(['next', 'previous'])

const currentRange = computed(() => {
  return `${props.currentOffset + 1} to ${
    props.currentOffset + 9 > props.services.length
      ? props.services.length
      : props.currentOffset + 9
  }`
})

const canGoToPrevious = computed(() => {
  if (props.currentOffset === 0) return false
  return true
})

const canGoToNext = computed(() => {
  if (props.currentOffset + 9 >= props.services.length) return false
  return true
})
</script>

<template>
  <div class="pagination">
    <button
      :class="{ disabled: !canGoToPrevious }"
      @click="emit('previous')"
    >
      &#8592;
    </button>
    <p>
      <span class="highlight">{{ currentRange }}</span> of
      {{ services.length }} services
    </p>
    <button
      :class="{ disabled: !canGoToNext }"
      @click="emit('next')"
    >
      &#8594;
    </button>
  </div>
</template>

<style lang="scss">
.pagination {
  margin-top: 3rem;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0 3rem;
    width: 45px;
    height: 45px;
    padding: 1rem;
    color: $blue-500;
    border: 2px solid;
    border-color: $blue-300;
    border-radius: 100%;
    display: inline-flex;
    justify-content: center;
  }

  button.disabled {
    border-color: $grey-200;
    color: $grey-400;
    pointer-events: none;
  }

  .highlight {
    font-weight: 600;
  }

  p {
    color: $grey-700;
    margin: 0;
  }
}
</style>
