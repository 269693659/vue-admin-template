import request from '@/utils/request'

export function gologin(data) {
  return request({
    url: '/bhfair/wap/login',
    method: 'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/kmjs/api/memberLogin/logout.do',
    method: 'get'
  })
}
