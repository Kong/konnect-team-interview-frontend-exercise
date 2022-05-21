<template>
  <header>
    <div class="nav">
      <router-link to="/">
        Home
      </router-link>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: { RouterView },
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

.nav {
  padding: 16px;
  margin-bottom: 4rem;
  border-bottom: 1px solid #333;

  a {
    font-weight: 700;
    color: blue;

    &.router-link-exact-active {
      color: green;
    }
  }
}
</style>
