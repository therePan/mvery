/**
 * Created by huangchao on 2017/10/23.
 */
import { singleApi } from '../helper/reduxFetch'
export const GET_POSTDETAIL = 'GET_POSTDETAIL' // 获取职位详情
export const POSITION_APPLIED = 'POSITION_APPLIED' // 应聘职位
export const POSITION_FAVORITED = 'POSITION_FAVORITED' // 收藏职位
export const POSITION_UN_FAVORITED = 'POSITION_UN_FAVORITED' // 取消收藏职位
export const POSIITION_DELETE_INFO = 'POSIITION_DELETE_INFO' // 清空职位信息

const URLPOST = ':ve.mobile.interface/job/detail'
const URL_COLLECT = ':ve.mobile.interface/user/add_favorite_job' // 收藏职位
const URL_UN_COLLECT = ':ve.mobile.interface/user/delete_favorite_job' // 取消收藏职位
const URL_APPLY = ':ve.mobile.interface/user/apply' // 应聘职位

export const positiondetail = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: GET_POSTDETAIL,
      data: json.data,
    }
  },
})

export const positionCollect = singleApi({
  url: URL_COLLECT,
  action: (args, json) => {
    return {
      type: POSITION_FAVORITED,
      data: json.data,
    }
  },
})

export const positionUnColiect = singleApi({
  url: URL_UN_COLLECT,
  action: (args, json) => {
    return {
      type: POSITION_UN_FAVORITED,
      data: json.data,
    }
  },
})

export const positionApply = singleApi({
  url: URL_APPLY,
  action: (args, json) => {
    return {
      type: POSITION_APPLIED,
      data: json.data,
    }
  },
})

export const emptyInfo = {
  type: POSIITION_DELETE_INFO,
}
