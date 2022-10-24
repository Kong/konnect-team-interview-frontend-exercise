<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="popover-container">
    <button @click="open = !open">
      <slot />
    </button>

    <transition name="popover">
      <div
        v-if="open"
        class="popover-content"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.popover-container {
  position: relative;

  .popover-content {
    position: absolute;
    right: 0;
    margin-top: 15px;
    z-index: 10;
    background: $white;
    padding: 0.8em 1em;
    border-radius: 10px;
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04));

    .popover-item {
      color: $grey-900;
      font-weight: 600;
      padding: 0.3em 1em;
      border-radius: 5px;
      width: 80%;

      &:hover {
        background: $grey-100;
        color: $grey-900;
      }
    }
  }
}
</style>
