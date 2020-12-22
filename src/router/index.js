import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routes from './routers'
import { Message } from 'element-ui'

/* Layout */
Vue.use(Router)
const router = new Router({
  routes,
  mode: 'hash'
})
const whiteList = ['/login'] // 白名单
router.beforeEach(async (to, from, next) => {
  const hasToken = store.getters.token
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        next()
        // 获取初始信息
        // try {
        //   await store.dispatch('user/getInfo')
        //   next() 
        // } catch (error) {
        //   await store.dispatch('user/resetToken')
        //   Message.error(error || 'token已过期，请重新登录')
        //   next(`/login?redirect=${to.path}`)
        // }
      }
    }
  } else {
    //没有token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(to => {
  document.title = to.meta.title
  window.scrollTo(0, 0)
})

export default router
