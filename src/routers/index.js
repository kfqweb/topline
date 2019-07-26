import Vue from 'vue'
import Router from 'vue-router'
import { getUser } from '@/utils/auth'
import nprogress from 'nprogress'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '', // 父路由的默认内容
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        {
          name: 'publish-edit',
          path: '/publish/:id',
          component: () => import('@/views/publish')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 路由导航前，开启进度条
  nprogress.start()
  const users = getUser()

  // 如果不是去 login
  if (to.path !== '/login') {
    // 如果没有 token 登录
    if (!users) {
      if (from.path === '/login') {
        nprogress.done()
      }
      return next({ name: 'login' })
    }
    next()
  } else {
    if (users) {
      // 不进行跳转
      // return next(false)
      next({ name: 'home' })
      window.location.reload()
    } else {
      next()
    }
  }
})
router.afterEach((to, from) => {
  nprogress.done()
})

export default router
