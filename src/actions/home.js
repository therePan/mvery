/**
 * Created by huangchao on 2017/10/23.
 */
import { singleApi } from '../helper/reduxFetch'
export const HOME_POST_INIT = 'HOME_POST_INIT' // 获取首页推荐职位
export const HOME_POST_REF = 'HOME_POST_REF' // 刷新职位
export const HOME_POST_ADD = 'HOME_POST_ADD' // 下拉加载职位
export const HOME_POST_STARING = 'HOME_POST_STARING' // 请求开始
export const HOME_POST_ISLODING = 'HOME_POST_ISLODING' // isloding

const URLPOST = ':ve.mobile.interface/user/recommended_jobs'

export const getPostInit = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: HOME_POST_INIT,
      data: json.data,
    }
  },
})

export const refReshPost = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: HOME_POST_REF,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type:HOME_POST_STARING,
    }
  },
})

export const addPost = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: HOME_POST_ADD,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type: HOME_POST_ISLODING,
    }
  },
  
})