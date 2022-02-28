import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/pages/Index'),
      redirect: '/pages/login',
      children: [
        {
          component: () => import('@/views/Login'),
          name: 'Login',
          path: '/pages/login',
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/pages/Index'),
      redirect: '/pages/recuperar',
      children: [
        {
          component: () => import('@/views/Recuperar'),
          name: 'Recuperar',
          path: '/pages/recuperar',
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/pages/Index'),
      redirect: '/pages/recuperar_senha/:token',
      children: [
        {
          component: () => import('@/views/NovaSenha'),
          name: 'NovaSenha',
          path: '/pages/recuperar_senha/:token',
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      redirect: '/dashboard',
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '/dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
          beforeEnter: (to, from, next) => {
            if (store.state.authentication.idToken) {
              const tk = store.state.authentication.idToken
              console.log('token: ', tk)
              next()
            } else {
              next('/pages/login')
            }
          },
        },
        {
          name: 'Gerente',
          path: '/gerente',
          component: () => import('@/views/gerente/Gerente'),
          beforeEnter: (to, from, next) => {
            if (store.state.authentication.idToken) {
              const tk = store.state.authentication.idToken
              console.log('token: ', tk)
              next()
            } else {
              next('/pages/login')
            }
          },
        },
        {
          name: 'Charts',
          path: 'charts',
          component: () => import('@/views/dashboard/Charts'),
        },
        {
          name: 'Calendar',
          path: 'calendar',
          component: () => import('@/views/dashboard/Calendar'),
        },
        {
          name: 'Validation Forms',
          path: 'forms/validation',
          component: () => import('@/views/dashboard/forms/ValidationForms'),
        },
        {
          name: 'Wizard',
          path: 'forms/wizard',
          component: () => import('@/views/dashboard/forms/Wizard'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        {
          name: 'Extended Tables',
          path: 'tables/extended-tables',
          component: () => import('@/views/dashboard/tables/ExtendedTables'),
        },
        {
          name: 'Data Tabels',
          path: 'tables/data-tables',
          component: () => import('@/views/dashboard/tables/DataTables'),
        },
        // Root level
        {
          name: 'Widgets',
          path: 'widgets',
          component: () => import('@/views/dashboard/Widgets'),
        },
      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },
  ],
})
