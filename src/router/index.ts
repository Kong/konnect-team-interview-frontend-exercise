import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '',
          name: 'home',
          component: () => import('@/views/PageHome.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: DefaultLayout,
      children: [{
        path: '',
        name: 'notFound',
        component: () => import('@/views/NotFound.vue'),
      }],

    },
  ],
})

export default router