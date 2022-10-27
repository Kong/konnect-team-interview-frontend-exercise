<script setup lang="ts">
import { ref, watch } from 'vue'
import useServices from '@/composables/useServices'
import ServiceSidebar from '@/components/service/ServiceSidebar.vue'
import ServiceDetails from '@/components/service/ServiceDetails.vue'
import { IServiceDetails } from '@/interfaces/service-details.interface'
import CtaBitton from '@/components/common/CtaBitton.vue'
import Plus from '@/assets/icons/plus.svg?component'
import Search from '@/assets/icons/search.svg?component'
import useDebounce from '@/composables/useDebounce'
import LoadingAnimation from '@/components/common/LoadingAnimation.vue'
import usePagination from '@/composables/usePagination'
import ServicePagination from '@/components/service/ServicePagination.vue'

const { loading, services, getServices } = useServices()
const { debounce } = useDebounce()
const { paginatedServices, paginateResult, setPagination, paginationOffset } = usePagination()

const searchQuery = ref('')
const currentService: IServiceDetails | null = ref(null)

const showServiceDetails = (service: IServiceDetails) => {
  currentService.value = service
}

watch(searchQuery, debounce(() => {
  if (searchQuery.value.trim().length > 2) {
    getServices(searchQuery.value.trim())
  }
  if (!searchQuery.value.length) {
    getServices()
  }
}))

watch(services, () => {
  paginateResult(services.value)
})
</script>

<template>
  <div class="service-catalog-wrapper">
    <ServiceSidebar
      :service="currentService"
      @closed="currentService = null"
    />
    <div class="service-catalog-container">
      <div class="header">
        <div class="view-title">
          <h1>Service Hub</h1>
          <p>
            Organize services, manage and track versioning and API service
            documentation. <a href="#">Learn more</a>
          </p>
        </div>
        <div class="action-panel">
          <div class="search-input">
            <Search class="search-icon" />
            <input
              v-model="searchQuery"
              placeholder="Search"
            >
          </div>
          <CtaBitton>
            <template #icon>
              <Plus class="fill-current" />
            </template>
            Service <span class="button-text">&nbsp;Package</span>
          </CtaBitton>
        </div>
      </div>
      <div
        v-if="!loading"
        class="non-loading"
      >
        <div
          v-if="paginatedServices.length"
          class="catalog"
        >
          <div
            v-for="service in paginatedServices"
            :key="service.id"
            :aria-label="service.name"
            class="service-card"
            tabindex="0"
            @click="showServiceDetails(service)"
          >
            <ServiceDetails
              is-card
              :service="service"
            />
          </div>
        </div>
        <div
          v-else
          class="not-found"
        >
          <img
            alt=""
            src="@/assets/static/basecamp_is_fine.png"
            width="300"
          >
          <h3>Nothing Found</h3>
        </div>
      </div>
      <div
        v-else
        class="loading"
      >
        <LoadingAnimation />
      </div>
      <ServicePagination
        v-if="!loading && paginatedServices.length"
        :current-offset="paginationOffset"
        :services="services"
        @next="setPagination('next')"
        @previous="setPagination('previous')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.service-catalog-container {
  margin: 3em 0;
  padding: 0 1em;

  .header {
    width: 100%;

    .view-title {
      @media (min-width: $lg) {
        max-width: 50%;
      }
    }

    .action-panel {
      display: flex;
      align-items: center;

      .search-input {
        position: relative;

        input {
          padding: 1.3rem 1.5rem;
          padding-left: 35px;
          margin-right: 1.5rem;
          font-size: 1.5rem;
          border: $grey-200 solid 1px;
          border-radius: 5px;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: calc(50% - 10px);
        }
      }

      .button-text {
        display: none;

        @media (min-width: $md) {
          display: inline-block;
        }
      }
    }

    display: flex;
    flex-direction: column;
    @media (min-width: $lg) {
      display: inline-flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: row;
    }
  }

  .catalog {
    margin-top: 15px;
    width: 100%;
    display: grid;
    gap: 3rem;

    grid-template-columns: repeat(1, minmax(0, 1fr));
    @media (min-width: $lg) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: $xl) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .service-card {
      background: $white;
      padding: 2.2rem 2.2rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
    }
  }

  .not-found {
    padding-top: 10rem;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    img {
      margin-bottom: 3rem;
    }
  }

  .non-loading {
    min-height: 80vh;
  }

  .loading {
    margin-top: 10rem;
    width: 100%;
    display: inline-flex;
    justify-content: center;
  }
}
</style>
