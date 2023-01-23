<template>
  <div class="nav-header">
    <div class="branding-container">
      <img class="branding-icon" src="../../public/favicon.ico" alt="">
      <h1 class="branding">Konnect</h1>
    </div>
    <div class="link-container">
      <a class="nav-link" href="" aria-label="Takes you back to your organizations summary page.">Organization</a>
      <a class="nav-link" href="" aria-label="Takes you back to your organizations summary page.">Settings</a>
      <a class="nav-link profile-link" href="" aria-label="Takes you back to your organizations summary page.">Katherine
        Ellis</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useServices from '@/composables/useServices'

export default defineComponent({
  name: 'NavHeader',
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
<style lang="scss">
.nav-header {
  background: linear-gradient(#09224F, #073382);
  color: #FFFFFF;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .branding-container {
    display: flex;

    .branding {
      font-size: 24px;
    }

    .branding-icon {
      width: 28px;
      height: 28px;
      margin: 12px 12px 12px 20px;
    }
  }


  .link-container {
    display: flex;
    align-items: center;

    .nav-link {
      color: #FFFFFF;
      font-weight: 600px;
      font-size: 15px;
      display: block;
      margin: 20px;
      text-decoration: none;
    }
  }


  a {
    font-weight: 700;
    color: blue;

    &.router-link-exact-active {
      color: green;
    }
  }
}
</style>