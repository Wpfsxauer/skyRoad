import { request } from '@/utils/request'

const api = {
  login: `/login`,
  routes: `/routes`
}

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export function login (data) {
  return request({
    url: api.login,
    method: 'post',
    data
  })
}

export function getRoutesConfig () {
  return request({
    url: api.routes,
    method: 'get'
    // params: parameter
  })
}

/**
 * 退出登录
 */
export function logout () {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
}

export default {
  login,
  logout,
  getRoutesConfig
}
