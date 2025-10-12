<template>
  <div class="search-input">
    <BaseIcon
      alt="Search"
      class="search-input__icon"
      name="IconSearch"
      :size="16"
    />
    <input
      v-model="localQuery"
      class="search-input__field"
      placeholder="Search"
      type="text"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseIcon from '../base/BaseIcon.vue'
import useSearchRouteState from '@/composables/common/useSearchRouteState'
import { debounce } from '@/utils/common'
const searchRoute = useSearchRouteState()

const localQuery = ref(searchRoute.value)

const debouncedFn = debounce(() => {
  searchRoute.value = localQuery.value
}, 300)

watch(localQuery, () => {
  debouncedFn()
})
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border-radius: 3px;
  background-color: var(--color-surface);
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--border-color);

  &__icon {
    flex-shrink: 0;
  }

  &__field {
    font-size: var(--font-sm);
    border: 0;
    outline: none;
    flex: 1;
    background: transparent;
  }
}
</style>
