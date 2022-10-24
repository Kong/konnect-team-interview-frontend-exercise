import { defineStore } from 'pinia'

interface User {
  name: string,
  email: string,
  avatar: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    authenticated: (state) => !!state.user,
  },
  actions: {
    login() {
      // normally here we would call api to get user data
      const userData = { name: 'Katherine Ellis', email: 'katherine.ellis@konghq.com', avatar: '' }
      this.user = userData
    },
  },
  persist: true,
})
