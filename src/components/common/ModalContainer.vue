<script setup lang="ts">
import { useModalStore } from '@/stores/modal'
import BaseModal from '../base/BaseModal.vue'
const modal = useModalStore()
</script>

<template>
  <Teleport to="body">
    <BaseModal
      v-if="modal.modalComponent"
      @close="modal.close"
    >
      <component
        :is="modal.modalComponent"
        v-bind="modal.modalProps"
      />
    </BaseModal>
  </Teleport>
</template>