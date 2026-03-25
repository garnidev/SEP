import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/components/layout/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home/HomePage.vue'),
        },
        {
          path: 'panaderias',
          name: 'bakeries',
          component: () => import('@/views/BakeryDirectory/BakeryDirectoryPage.vue'),
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('@/views/BlogManager/BlogManagerPage.vue'),
        },
      ],
    },
  ],
})

export default router
