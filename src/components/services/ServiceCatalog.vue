<script setup lang="ts">
import { RouterLink } from 'vue-router'
import useServices from '@/composables/services/useServices'

import ServiceCard from './ServiceCard.vue'
import SearchInput from '../common/SearchInput.vue'
import BaseButton from '../base/BaseButton.vue'
import BaseIcon from '../base/BaseIcon.vue'
import { useModalStore } from '@/stores/modal'
import ServiceVersionListing from './ServiceVersionListing.vue'
import PaginationControls from '../common/PaginationControls.vue'
const { isPending, isError, paginatedData } = useServices()


const modal = useModalStore()
function handleClick(id: string | number) {
  alert(id)
}
</script>

<template>
  <div class="service-catalog">
    <header class="service-catalog__header">
      <div class="service-catalog__header-text">
        <h1 class="service-catalog__title">
          Service Hub
        </h1>
        <p class="service-catalog__description">
          Organize services, manage and track versioning and API service documentation.
          <RouterLink
            class="service-catalog__learn-link"
            to="/learn"
          >
            <span>Learn more</span>
          </RouterLink>
        </p>
      </div>

      <div class="service-catalog__actions">
        <SearchInput />
        <BaseButton
          size="md"
          variant="primary"
          @click="handleClick('Create New')"
        >
          <template #icon-left>
            <BaseIcon name="IconAdd" />
          </template>
          <template #default>
            Create Service
          </template>
        </BaseButton>
      </div>
    </header>
    <section class="service-catalog__main">
      <div
        v-if="isPending"
        class="service-catalog__no-results"
        data-testid="no-results"
      >
        Loading...
      </div>
      <div
        v-else-if="isError"
        class="service-catalog__no-results"
        data-testid="no-results"
      >
        Oops Something went
      </div>
      <div
        v-else-if="paginatedData.paginatedItems?.value.length"
        class="service-catalog__list"
      >
        <ServiceCard
          v-for="service in paginatedData.paginatedItems.value"
          :key="service.id"
          :service="service"
          @click="() => modal.open(ServiceCard, { 'service': service })"
          @click:version="() => modal.open(ServiceVersionListing, { 'versions': service.versions })"
        />
      </div>

      <div
        v-else
        class="service-catalog__no-results"
        data-testid="no-results"
      >
        No services
      </div>
    </section>

    <section
      v-if="!isPending && !isError && paginatedData.paginatedItems.value.length"
      class="service-catalog__footer"
    >
      <PaginationControls
        v-if="paginatedData.paginatedItems.value.length"
        :end="paginatedData.endOffset.value"
        :has-next-page="paginatedData.hasNextPage.value"
        :has-previous-page="paginatedData.hasPreviousPage.value"
        :next-page="paginatedData.nextPage"
        :previous-page="paginatedData.previousPage"
        :start="paginatedData.startOffset.value"
        :total="paginatedData.totalItems.value?.length ?? 0"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.service-catalog {
  display: flex;
  flex-direction: column;
  flex: 1;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;

    &-text {
      flex: 1;

      .service-catalog__title {
        font-size: var(--font-xl);
        margin: 0;
      }

      .service-catalog__description {
        font-size: var(--font-sm);
        color: var(--color-text-muted);
      }

      .service-catalog__learn-link {
        color: var(--color-secondary);
        text-decoration: none;
      }
    }

    .service-catalog__actions {
      display: flex;
      flex: 0.8;
      justify-content: flex-end;
      gap: 1.5rem;
    }
  }

  &__main {
    flex: 1;

    & > .service-catalog__list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(390px, 1fr));
      gap: 24px;
      padding: 0;
      list-style: none;
    }

    & > .service-catalog__no-results {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--color-text-muted, #707888);
      font-size: var(--font-xl);
      min-height: 40vh;
    }
  }

  &__footer {
    padding: var(--pad-y) 0;
  }
}
</style>
