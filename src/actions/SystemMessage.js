/**
 * Created by huangchao on 2017/11/2.
 */
import { singleApi } from '../helper/reduxFetch'
export const GET_SYSTEMMESSAEG_INIT = 'GET_SYSTEMMESSAEG_INIT' // 获取消息列表
export const GET_SYSTEMMESSAEG_DETAIL = 'GET_SYSTEMMESSAEG_DETAIL' // 获取消息详情

const URLPOST = ':ve.mobile.interface/user/messages'
const detail = ':ve.mobile.interface/user/message_detail'

export const getSyatemMessageInit = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: GET_SYSTEMMESSAEG_INIT,
      data: json.data,
    }
  },
})

export const messageDetail = singleApi({
  url: detail,
  action: (args, json) => {
    return {
      args,
      type: GET_SYSTEMMESSAEG_DETAIL,
      data: json.data,
    }
  },
})
