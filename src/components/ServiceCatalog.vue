<template>
  <div class="service-catalog">
    <h1>Service Catalog</h1>
    <input
      v-model="searchQuery"
      class="search-input"
      data-testid="search-input"
      placeholder="Search services"
    >
    <ul
      v-if="services.length"
      class="catalog"
    >
      <li
        v-for="service in services"
        :key="service.id"
        class="service"
      >
        <div>
          <p>
            {{ service.name }}
          </p>
          <p>{{ service.description }}</p>
        </div>
      </li>
    </ul>
    <div
      v-else
      data-testid="no-results"
    >
      No services
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useServices from '@/composables/useServices'

export default defineComponent({
  name: 'ServiceCatalog',
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
.service-catalog {
  margin: 2rem auto;
  max-width: 1366px;
  padding: 0 20px;
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 20px 0 0 0;
}

.service {
  border: 1px solid #999;
  border-radius: 10px;
  margin: 6px;
  padding: 8px 16px;
  width: 200px;

  p:first-of-type {
    color: #333;
    font-weight: 700;
  }

  p {
    color: #666;
  }
}

input {
  padding: 8px 4px;
}
</style>
