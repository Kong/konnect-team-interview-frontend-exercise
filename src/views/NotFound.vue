<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <div class="not-found">
    <p class="not-found__text">
      Route <strong>{{ route.path }}</strong> is under construction.
    </p>
    <img
      alt="Cute under construction illustration"
      class="under-construction__image"
      src="@/assets/under-construction.png"
    >
    <BaseButton

      @click="router.replace('/')"
    >
      Home
    </BaseButton>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  text-align: center;
  background: var(--color-bg);

  &__text {
    flex:1;
    color: var(--color-text);
    font-size: var(--font-lg);
  }
  img{
    height: 90%;
    width: 60%;
  }
}
</style>
