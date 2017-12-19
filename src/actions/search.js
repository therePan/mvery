/**
 * Created by huangchao on 2017/10/20.
 */
import { singleApi } from '../helper/reduxFetch'
export const SEARCH_HOT = 'SEARCH_HOT' // 获取热门搜索
export const SEARCH_TIPS = 'SEARCH_TIPS' // 获取搜索分类
export const SEARCH_LIST_INIT = 'SEARCH_LIST_INIT' // 搜索结果
export const SEARCH_LIST_ADD = 'SEARCH_LIST_ADD' // 添加搜索结果
export const SEARCH_LIST_ISLODING = 'SEARCH_LIST_ISLODING' // isloding

const URLHOT = ':ve.mobile.interface/job/hotword'
const URLTIP = ':ve.mobile.interface/job/searchtips'
const URLEND = ':ve.mobile.interface/job/search'

export const getSearchHot = singleApi({
  url: URLHOT,
  action: (args, json) => {
    return {
      type: SEARCH_HOT,
      data: json.data,
    }
  },
})

export const getSearchTips = singleApi({
  url:URLTIP,
  action: (args, json) => {
    return {
      args,
      type: SEARCH_TIPS,
      data: json.data,
    }
  },
})

export const getSearchListInit = singleApi({
  url:URLEND,
  action: (args, json) => {
    return{
      args,
      type: SEARCH_LIST_INIT,
      data: json.data,
    }
  },
})

export const getSearchListadd = singleApi({
  url:URLEND,
  action: (args, json) => {
    return{
      args,
      type: SEARCH_LIST_ADD,
      data: json.data,
    }
  },
  prelude: () => {
    return {
      type: SEARCH_LIST_ISLODING,
    }
  },
})
