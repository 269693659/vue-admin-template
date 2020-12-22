/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 验证11位号码正则格式
export function isMobile (mobile) {
  if (!mobile) return
  
  if (mobile.length !== 11) {
    return false
  }
  const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  if (!reg.test(mobile)) {
    return false
  }
  return true
}

// 验证邮箱正则格式
export function isEmail (obj) {
  if (!obj) return
  let emailreg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$') // 正则表达式
  if (!emailreg.test(obj)) { // 正则验证不通过，格式不对
    return false
  }
  return true
}