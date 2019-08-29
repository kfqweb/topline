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
        },
        {
          name: 'comment',
          path: '/comment',
          component: () => import('@/views/comment')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404')
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   // 路由导航前，开启进度条
//   nprogress.start()
//   const users = getUser()

//   // 如果不是去 login
//   if (to.path !== '/login') {
//     // 如果没有 token 登录
//     if (!users) {
//       if (from.path === '/login') {
//         nprogress.done()
//       }
//       return next({ name: 'login' })
//     }
//     next()
//   } else {
//     if (users) {
//       // 不进行跳转
//       // return next(false)
//       next({ name: 'home' })
//       window.location.reload()
//     } else {
//       next()
//     }
//   }
// })
// router.afterEach((to, from) => {
//   nprogress.done()
// })

/**
 * 全局前置守卫
 * 当你访问路由页面的时候，会先进入这里
 * to 要去哪里的相关数据
 * from 来自哪里的相关数据
 * next 允许通过的方法
 */
router.beforeEach((to, from, next) => {
  // 路由导航前，开启进度条
  nprogress.start()
  // const userInfo = window.localStorage.getItem('user_info')
  const userInfo = getUser()
  if (to.path !== '/login') {
    // 非登录页面
    //   没有登录，跳转到登录页
    if (!userInfo) {
      // 如果是来自登录页的页面，是不会重新进行页面导航的，也就不会触发后面的 afterEach 钩子
      // 所以在这里手动结束动画，防止出现在登录页访问其他页面顶部一直 loading 的问题。
      if (from.path === '/login') {
        nprogress.done()
      }
      next({ name: 'login' })
      // next('/login')
      // next({ path: '/login' })
    } else {
      //   登录了，允许通过
      next()
    }
  } else {
    // 登录页面
    //   没有登录，允许通过
    if (!userInfo) {
      next()
    } else {
      //   登录了，不允许通过
      // next(false) // 中断当前导航
      // next()
      // next({ name: 'home' })
      // window.location.href = '/#/'
      next({ name: 'home' })
      // window.location.reload()
    }
  }
})

router.afterEach((to, from) => {
  // 路由导航完成，结束进度条
  nprogress.done()
})

export default router
