<script setup lang="ts">
import BaseIcon from '../base/BaseIcon.vue'

const props = defineProps<{
  start: number
  end: number
  total: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  previousPage: () => void
  nextPage: () => void
}>()
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__btn pagination__btn--prev"
      :disabled="!props.hasPreviousPage"
      @click="props.previousPage"
    >
      <BaseIcon
        alt="Previous"
        class="arrow-left"
        name="IconArrow"
        :size="16"
      />
    </button>

    <span class="pagination__info">
      <strong>{{ props.start }}</strong>
      &nbsp;to&nbsp;
      <strong>{{ props.end }}</strong>
      of {{ props.total }} services
    </span>

    <button
      class="pagination__btn pagination__btn--next"
      :disabled="!props.hasNextPage"
      @click="props.nextPage"
    >
      <BaseIcon
        alt="Next"
        name="IconArrow"
        :size="16"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  &__btn {
    & > .arrow-left{
        transform: rotate(180deg)
    }
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid var(--color-secondary);
    cursor: pointer;
    &:disabled {
      opacity: 0.4;
       border: 1px solid var(--color-text-muted);
      cursor: not-allowed;
    }
  }

}
</style>
