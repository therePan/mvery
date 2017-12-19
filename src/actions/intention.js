import transport from '../helper/fetching'
import constants from '../helper/constants'

export const $ = constants('resume', [
  'edit', // 编辑用户信息
])

export const edit = transport({
  url: ':ve.mobile.interface/resume/set_intention',
  type: $.edit,
  done(payload, params, getState) {
    return {
      params,
      payload: payload.data,
    }
  },
})
