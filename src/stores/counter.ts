import { defineStore } from 'pinia'

// Example Pinia store: https://pinia.vuejs.org/
// This code is not utilized in the take-home exercise starter template.

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
