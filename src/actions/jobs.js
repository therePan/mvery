/**
 * 职位列表
 */

import transport, { pipeline } from '../helper/fetching'
import constants from '../helper/constants'
import Standard from '../helper/standard'

export const standard = new Standard()

export const $ = constants('jobs', [
  'load', // 获取用户信息
  'edit', // 编辑用户信息
])

const URL_LOAD = ':ve.mobile.interface/resume/get_edu_exps'
const URL_EDIT = ':ve.mobile.interface/resume/set_edu_exp'

export const load = transport({
  url: URL_LOAD,
  type: $.load,
  done(payload, params, getState) {
    return {
      params,
      payload: payload.data,
    }
  },
})

export const edit = transport({
  url: URL_EDIT,
  type: $.edit,
  done(payload, params, getState) {
    return {
      params,
      payload: params,
    }
  },
})

export const add = (params) => {
  return pipeline(URL_EDIT, params)
}
