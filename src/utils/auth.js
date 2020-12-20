import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取sessionStorage 存储的值
export function getStorage (key = 'token') {
  let value = localStorage.getItem(key)
  if(value && value != 'undefined'){
  	return JSON.parse(localStorage.getItem(key))
  }else{
  	return ''
  }
}
// 用sessionStorage存储的值
export function setStorage (key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
// 删除某个存储值
export function deleteStorage (key = 'token') {
  if (!key) return
  localStorage.removeItem(key)
}

export function clearStorage () {
  localStorage.clear()
}
