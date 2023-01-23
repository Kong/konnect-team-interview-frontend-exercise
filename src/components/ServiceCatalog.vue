<template>
  <div class="service-hub">
    <div class="service-hub-header">
      <div class="heading-container">
        <h1>Service Hub</h1>
        <p>Organize services, manage and track cersioning and API service documentation. <a href="">Learn more</a></p>
      </div>
      <div class="functional">
        <input v-model="searchQuery" class="search-input" placeholder="Search services">
        <button class="create-service-button">Service Package</button>
      </div>
    </div>
    <ul class="catalog">
      <li v-for="service in services" :key="service.id" class="service">
        <ServiceCard :service="service" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useServices from '@/composables/useServices'
//Custom Component Imports
import ServiceCard from './ServiceCard.vue'

export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    ServiceCard
  },
  setup() {
    // Import services from the composable
    const { services, loading } = useServices()

    // Set the search string to a Vue ref
    const searchQuery = ref('')

    return {
      services,
      loading,
      searchQuery,
    }
  },
})
</script>

<style lang="scss" scoped>
.service-hub {
  max-width: 1366px;
  margin: 2rem auto;
  padding: 0 20px;

  .service-hub-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .heading-container {
      flex-grow: 1
    }

    .functional {
      display: flex;
      align-items: center;
      width: 30%;

      .create-service-button {
        margin-left: 20px;
      }
    }
  }
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 0 0;
  list-style: none;
}
</style>
