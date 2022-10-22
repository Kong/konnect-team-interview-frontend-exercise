<script setup lang="ts">
</script>

<template>
  <header>
    <div class="nav">
      <router-link to="/">
        Home
      </router-link>
    </div>
  </header>
</template>

<style lang="scss">
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
