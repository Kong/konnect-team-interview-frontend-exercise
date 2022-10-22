<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import DefaultHeader from '@/components/layout/DefaultHeader.vue'
</script>

<template>
  <DefaultHeader />
  <main>
    <router-view />
  </main>
</template>
