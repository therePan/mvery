/**
 * Created by huangchao on 2017/10/19.
 */
import { Toast } from 'antd-mobile'
import { pipeline } from '../helper/fetching'

export const singleFetch = (uri, args = {}) => {
  return pipeline(uri, args)
    .then(json => {
      if (!json.status) {
        throw json
      }
      return json
    })
    .catch(err => {
      if (err.errCode !== 2002) {
        Toast.info(err.errMsg || '后端的code monkey又开小差了!', 1)
      }
      throw err
    })
}

const authError = {
  status: 0,
  errCode: 5004,
  errMsg: '用户凭证不正确',
}
export const multiFetch = (uri, args = {}) => {
  const userInfo = JSON.parse(localStorage['pinber:user'] || '{}')
  if (userInfo.user_id && userInfo.user_ticket) {
    return singleFetch(uri, {
      ...args,
      user_id: userInfo.user_id,
      user_ticket: userInfo.user_ticket,
    })
  } else {
    return Promise.reject(authError)
  }
}