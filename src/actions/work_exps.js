import transport from '../helper/fetching'
import constants from '../helper/constants'
import Standard from '../helper/standard'

export const standard = new Standard()

export const $ = constants('work_exps', [
  'load', // 获取用户信息
  'edit', // 编辑用户信息
  'add',
  'remove',
])

const URL_LOAD = ':ve.mobile.interface/resume/get_work_exps'
const URL_EDIT = ':ve.mobile.interface/resume/set_work_exp'
const URL_REMOVE = ':ve.mobile.interface/resume/delete_work_exp'

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

export const add = transport({
  url: URL_EDIT,
  type: $.add,
  done(payload, params, getState) {
    return {
      params,
      payload: params,
    }
  },
})

export const remove = transport({
  url: URL_REMOVE,
  type: $.remove,
  done(payload, params, getState) {
    return {
      params: {
        ...params,
        id: params.work_exp_id,
      },
      payload: payload.data,
    }
  },
})
