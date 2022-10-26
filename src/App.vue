<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import DefaultHeader from '@/components/layout/DefaultHeader.vue'
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/auth'

const { login } = useAuthStore()

// hardcode login here
onBeforeMount((): void => {
  login()
})
</script>

<template>
  <DefaultHeader />
  <main>
    <router-view />
  </main>
</template>
