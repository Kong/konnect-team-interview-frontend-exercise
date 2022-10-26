<script setup lang="ts">
import { ref } from 'vue'
import useServices from '@/composables/useServices'
import ServiceSidebar from '@/components/service/ServiceSidebar.vue'
import ServiceDetails from '@/components/service/ServiceDetails.vue'
import { IServiceDetails } from '@/interfaces/service-details.interface'

const { services, loading } = useServices()

const searchQuery = ref('')
const currentService: IServiceDetails | null = ref(null)

const showServiceDetails = (service: IServiceDetails) => {
  currentService.value = service
}
</script>

<template>
  <div class="service-catalog-wrapper">
    <ServiceSidebar
      :service="currentService"
      @closed="currentService = null"
    />
    <div class="service-catalog-container">
      <div class="header">
        <div>
          <h1>Service Hub</h1>
          <p>
            Organize services, manage and track versioning and API service
            documentation. <a href="#">Learn more</a>
          </p>
        </div>
        <div>
          <input
            v-model="searchQuery"
            class="search-input"
            placeholder="Search services"
          >
        </div>
      </div>
      <div
        ref="catalog"
        class="catalog"
      >
        <div
          v-for="service in services"
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.service-catalog-container {
  margin: 3em 0;
  padding: 0 1em;

  .header {
    display: flex;
    justify-content: space-between;
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
}

input {
  padding: 8px 4px;
}
</style>
