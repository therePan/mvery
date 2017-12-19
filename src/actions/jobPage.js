/**
 * Created by huangchao on 2017/10/25.
 */
import { singleApi } from '../helper/reduxFetch'
export const JOB_SEARCH_INIT = 'JOB_SEARCH_INIT' // 搜索数据初始化
export const JOB_SEARCH_ADD = 'JOB_SEARCH_ADD' // 工作添加
export const JOB_SEARCH_REF = 'JOB_SEARCH_REF' // 刷新
export const JOB_SEARCH_ISLODING = 'JOB_SEARCH_ISLODING' // isloding
export const JOB_SEARCH_LODING  = 'JOB_SEARCH_LODING' // loding

const URLPOST = ':ve.mobile.interface/job/search'

export const getSearchInit = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: JOB_SEARCH_INIT,
      data: json.data,
    }
  },
})
export const getSearchListref = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      args,
      type: JOB_SEARCH_REF,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type: JOB_SEARCH_LODING,
    }
  },
})
export const getSearchListadd = singleApi({
  url:URLPOST,
  action: (args, json) => {
    return{
      args,
      type: JOB_SEARCH_ADD,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type: JOB_SEARCH_ISLODING,
    }
  },
})
