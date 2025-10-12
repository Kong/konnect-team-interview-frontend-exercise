<template>
  <RouterView />
  <ModalContainer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ModalContainer from './components/common/ModalContainer.vue'
</script>

<style lang="scss">
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
  box-sizing: border-box !important;
  margin: 0 auto;
}
</style>
