import transport from '../helper/fetching'
import constants from '../helper/constants'

export const $ = constants('resume', [
  'get_all_info', // 获取用户信息
  'edit', // 编辑用户信息
  'avatar',
])

export const getAllInfo = transport({
  url: ':ve.mobile.interface/resume/get_all_info',
  type: $.get_all_info,
  done(payload, params, getState) {
    return {
      params,
      payload: payload.data,
    }
  },
})

export const edit = transport({
  url: ':ve.mobile.interface/resume/set_base',
  type: $.edit,
  done(payload, params, getState) {
    return {
      params,
      payload: payload.data,
    }
  },
})

export const avatar = transport({
  url: ':ve.mobile.interface/resume/upload_avatar',
  type: $.avatar,
  done(payload, params, getState) {
    return {
      params,
      payload: payload.data,
    }
  },
})
