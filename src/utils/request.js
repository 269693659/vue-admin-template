import Vue from 'vue'
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import Qs from 'qs'

import { getToken ,getStorage, clearStorage} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  timeout: 60000 ,// request timeout
  headers: { 'X-Requested-With': 'XMLHttpRequest', channel: 3 }
})

// request interceptor
service.interceptors.request.use(
  config => {

    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
      config.headers['authorization'] = store.getters.token
    }
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = Qs.stringify(config.data)
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(res=>{
  let {msg,code}=res.data || res
  if(code == 1100){
      Message.error('token失效,请重新登录')
      store.commit('setToken','')
      store.commit('setUserInfo',null)
      router.replace({
          path:'/login',
          query:{
              replace:router.currentRoute.fullPath
          }
      })
      return;
  }else if(code!=0&&code!=200){
      if(code==999){
        store.commit('setToken','')
        store.commit('setUserInfo',null)
          router.replace({
              path:'/login',
              query:{
                  replace:router.currentRoute.fullPath
              }
          })
        }
      Message.error('code:'+code,msg)
  }else{
      return res;
  }

}, (err) =>{
  // 对返回的错误进行一些处理
if (err && err.response) {
  let { status, data } = err.response
  if(data.code=='1001'){
    store.commit('setToken','')
    store.commit('setUserInfo',null)
    router.replace({
      path: '/login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
    Message({
      message: '请登录',
      type: 'error'
    })
  }
  switch (status) {
    case 400:
      err.message = '请求错误'
      break
    case 40000:
      err.message = '未授权，请登录'
      break
    case 403:
      err.message = '拒绝访问'
      break
    case 404:
      err.message = `请求地址出错: ${err.response.config.url}`
      break
    case 408:
      err.message = '请求超时'
      break
    case 500:
      err.message = '服务器内部错误'
      break
    case 501:
      err.message = '服务未实现'
      break
    case 502:
      err.message = '网关错误'
      break
    case 503:
      err.message = '服务不可用'
      break
    case 504:
      err.message = '网关超时'
      break
    case 505:
      err.message = 'HTTP版本不受支持'
      break
    default:
  }
}
return Promise.reject(err)
  }
)
const handle =async (option)=>{
  let res = await service({
      method: option.method,
      url: option.url,
      data: option.data || {},
      params:option.params ||{},
      headers: option.headers || {}
  })
  return res && res.data ? res.data : res
}
Vue.prototype.$get=async option=>{
  option.method='get'
  let res = await handle(option)
  return res
}
Vue.prototype.$post=async option=>{
  option.method='post'
  let res = await handle(option)
  return res
}
