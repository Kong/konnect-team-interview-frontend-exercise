<script setup lang="ts">
import { ref } from 'vue'
import useServices from '@/composables/useServices'
import ServiceSidebar from '@/components/service/ServiceSidebar.vue'

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
    <div
      class="service-catalog-container"
    >
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
      <ul
        ref="catalog"
        class="catalog"
      >
        <li
          v-for="service in services"
          :key="service.id"
          class="service"
          @click="toggleSidebar"
        >
          <div>
            <p>
              {{ service.name }}
            </p>
            <p>{{ service.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.service-catalog-wrapper {
  position: relative;
}

.service-catalog-container {
  margin: 3em 0;
  padding: 0 1em;
  transition: width 0.5s ease-in-out;

  header {
    display: flex;
    justify-content: space-between;
  }

  .catalog {
    width: 100%;

    &.sidebar-open {
      @media (min-width: $lg) {
        width: calc(100% - 350px);
      }
    }
  }
}

.service-catalog-container .catalog {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 0 0;
  list-style: none;
  padding: 0;
}

.service {
  width: 200px;
  margin: 6px;
  border: 1px solid #999;
  border-radius: 10px;
  padding: 8px 16px;

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
