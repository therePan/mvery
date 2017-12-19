import transport from '../helper/fetching'
import constants from '../helper/constants'
import Standard from '../helper/standard'

export const standard = new Standard()

export const $ = constants('users', [
  'load', // 获取用户信息
  'edit', // 编辑用户信息
])

export const load = transport({
  url: '/users.json',
  type: $.load,
  should(params, getState) {
    return standard.cached(getState().users, params)
  },
  // begin(params, getState) {},
  // error(err, params, getState) {},
  done(payload, params, getState) {
    return {
      params,
      payload,
    }
  },
})
