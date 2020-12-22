
// 路由守卫
import router from './router'
import store from './store'
import { Message } from 'element-ui'


const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  const hasToken = store.getters.token

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        next()
        // 获取getInfo
        // try {
        //   await store.dispatch('user/getInfo')
        //   next()
        // } catch (error) {
        //   // remove token and go to login page to re-login
        //   await store.dispatch('user/resetToken')
        //   Message.error(error || 'Has Error')
        //   next(`/login?redirect=${to.path}`)
        // }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title
})
