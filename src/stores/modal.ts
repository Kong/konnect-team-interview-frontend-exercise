import { defineStore } from 'pinia'
import { shallowRef, type Component } from 'vue'

interface ModalOptions {
  component: Component
  props?: Record<string, any>
}

export const useModalStore = defineStore('modal', {
  state: () => ({
    activeModal: shallowRef<ModalOptions | null>(null),
  }),

  getters: {
    modalComponent: (state) => state.activeModal?.component ?? null,
    modalProps: (state) => state.activeModal?.props ?? {},
  },

  actions: {
    open(component: Component, props?: Record<string, any>) {
      this.activeModal = { component, props }
    },
    close() {
      this.activeModal = null
    },
  },
})
