import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      userId: '1',
      name: 'Katherine Ellis',
      avatar: 'IconDefaultAvatar',
      role: 'admin',
    },
  }),

  getters: {
    userName: (state) => state.user.name,
    userId: (state) => state.user.userId,
    userAvatar: (state) => state.user.avatar,
  },
})
