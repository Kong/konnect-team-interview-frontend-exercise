<template>
  <header>
    <NavHeader />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
//Custom Component Imports
import NavHeader from './components/NavHeader.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavHeader
  }
})
</script>

<style lang="scss">
html {
  margin: 0;
  padding: 0;
  font-size: 10px;
}

body {
  font-family: Arial, sans-serif;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.2;
  margin: 0 auto;
}
</style>
