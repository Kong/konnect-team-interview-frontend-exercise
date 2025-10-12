<script  setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="layout-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--color-bg);
    color: var(--color-text-dark);
}
.layout-main {
  flex: 1;
  overflow-y: auto;
  padding: var(--pad-y) var(--pad-x);
}
</style>