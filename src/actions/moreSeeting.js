/**
 * Created by huangchao on 2017/11/3.
 */
import { singleApi } from '../helper/reduxFetch'
export const BIND_EMAIL = 'BIND_EMAIL' // 绑定邮箱
export const BIND_PHONE = 'BIND_PHONE' // 绑定手机
export const FEED_BACK = 'FEED_BACK' // 意见反馈
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD' // 重制密码


const URL = ':ve.sso/user/email_authenticate' // 绑定邮箱
const PASS = ':ve.sso/user/reset_password' // 重制密码 new_password old_password
const FEED = ':ve.mobile.interface/util/feedback' // 意见反馈
const mobile = ':ve.my.veryeast.cn/client-service/api/mobile' // 绑定手机

export const bindEmail = singleApi({
  url: URL,
  action: (args, json) => {
    return {
      args,
      type: BIND_EMAIL,
      data: json.data,
    }
  },
})

export const bindMobile = singleApi({
  url: mobile,
  action: (args, json) => {
    return {
      args,
      type: BIND_PHONE,
      data: json.data,
    }
  },
})

export const changePassword = singleApi({
  url: PASS,
  action: (args, json) => {
    return {
      args,
      type: CHANGE_PASSWORD,
      data: json.data,
    }
  },
})


export const feedbackOpinion = singleApi({
  url: FEED,
  action: (args, json) => {
    return {
      args,
      data: json.data,
      type: FEED_BACK,
    }
  },
})

