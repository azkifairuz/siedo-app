import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import BaseLayout from '@/views/BaseLayout.vue'
import ProfileView from '@/views/ProfileView.vue'
import ActivityView from '@/views/ActivityView.vue'
import PresensiView from '@/views/presensi/PresensiView.vue'
import PresensiStart from '@/views/presensi/StepOne.vue'
import PresensiEnd from '@/views/presensi/StepTwo.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'base',
      redirect: 'home',
      component: BaseLayout,
      children:[
        {
          path:'/home',
          name: 'home',
          component: HomeView,
        },
        {
          path:'/activity',
          name: 'activity',
          component: ActivityView
        },
        {
          path:'/profile',
          name: 'profile',
          component: ProfileView
        },
      ]
    },
    {
      path: '/presensi',
      name: 'presensi',
      component: PresensiView,
      redirect: {
        name:'presensi-start'
      },
      children:[
        {
          path: '/presensi/start',
          name: 'presensi-start',
          component: PresensiStart
        },
        {
          path: '/presensi/end',
          name: 'presensi-end',
          component: PresensiEnd
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
