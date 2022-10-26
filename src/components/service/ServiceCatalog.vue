<script setup lang="ts">
import { ref } from 'vue'
import useServices from '@/composables/useServices'
import ServiceSidebar from '@/components/service/ServiceSidebar.vue'
import ServiceDetails from '@/components/service/ServiceDetails.vue'

const { services, loading } = useServices()

const searchQuery = ref('')
const sidebarOpen = ref(false)
const catalog = ref(null)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  catalog.value.classList.toggle('sidebar-open')
}
</script>

<template>
  <div class="service-catalog-wrapper">
    <ServiceSidebar :is-open="sidebarOpen" />
    <div class="service-catalog-container">
      <header>
        <div>
          <h1>Service Hub</h1>
          <p>
            Organize services, manage and track versioning and API service
            documentation. Learn more
          </p>
        </div>
        <div>
          <input
            v-model="searchQuery"
            class="search-input"
            placeholder="Search services"
          >
        </div>
      </header>
      <div
        ref="catalog"
        class="catalog"
      >
        <div
          v-for="service in services"
          :key="service.id"
          class="service-card"
          @click="toggleSidebar"
        >
          <ServiceDetails :service="service" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.service-catalog-container {
  margin: 3em 0;
  padding: 0 1em;

  header {
    display: flex;
    justify-content: space-between;
  }

  .catalog {
    margin-top: 15px;
    width: 100%;
    display: grid;
    gap: 3rem;

    grid-template-columns: repeat(1, minmax(0, 1fr));
    @media (min-width: $md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: $lg) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .service-card {
      background: $white;
      padding: 2.2rem 2.2rem;
    }

    &.sidebar-open {
      transition: width 0.5s linear;
      @media (min-width: $lg) {
        width: calc(100% - 350px);
      }
    }
  }
}

input {
  padding: 8px 4px;
}
</style>
