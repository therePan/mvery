/**
 * Created by huangchao on 2017/11/1.
 */
import { singleApi } from '../helper/reduxFetch'
export const GET_DELIVERY_ALL = 'GET_DELIVERY_ALL' // 全部
export const DELIVERY_HAS_LOOK = 'DELIVERY_HAS_LOOK' // 已查看
export const DELIVERY_INTERVIEW = 'DELIVERY_INTERVIEW' // 面试邀约
export const DELIVERY_INAPPROPRIATE= 'DELIVERY_INAPPROPRIATE' // 不合适
export const DELETE_DELIVERY = 'DELETE_DELIVERY' // 删除投递记录
export const DELIVERY_REMIND_HR = 'DELIVERY_REMIND_HR' // 提醒企业

const URLPOST = ':ve.mobile.interface/user/delivery'
const DELETE = ':ve.mobile.interface/user/deliveryDel'
const hr = ':ve.mobile.interface/resume/remindhr'
const read = ':ve.mobile.interface/user/ReadResume' // 已读信息接口

export const readResume = singleApi({
  url: read,
  action: (args, json) => {
    return {
      args,
      data: json.data,
    }
  },
})

export const getDeliveryAll = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: GET_DELIVERY_ALL,
      data: json.data,
    }
  },
})

export const getDeliveryLook = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: DELIVERY_HAS_LOOK,
      data: json.data,
    }
  },
})

export const getDeliveryInterview = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: DELIVERY_INTERVIEW,
      data: json.data,
    }
  },
})

export const getDeliveryInappropriate = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: DELIVERY_INAPPROPRIATE,
      data: json.data,
    }
  },
})

export const DeletetDelivery = singleApi({
  url: DELETE,
  action: (args, json) => {
    return {
      args,
      type: DELETE_DELIVERY,
      data: json.data,
    }
  },
})

export const remindHr = singleApi({
  url: hr,
  action: (args, json) => {
    return {
      args,
      type: DELIVERY_REMIND_HR,
      data: json.data,
    }
  },
})


