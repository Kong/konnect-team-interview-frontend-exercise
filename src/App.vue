<template>
  <header>
    <div class="nav">
      <router-link to="/">
        Home
      </router-link>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style lang="scss" scoped>
.nav {
  border-bottom: 1px solid #333;
  margin-bottom: 4rem;
  padding: 16px;

  a {
    color: blue;
    font-weight: 700;

    &.router-link-exact-active {
      color: green;
    }
  }
}
</style>

<style lang="scss">
// Unscoped styles for html and body
html {
  font-size: 10px;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
}
</style>
