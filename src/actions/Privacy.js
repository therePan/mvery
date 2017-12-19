/**
 * Created by huangchao on 2017/11/2.
 */
import { singleApi } from '../helper/reduxFetch'
export const GET_BLACK_LIST = 'GET_BLACK_LIST' // 获取屏蔽的企业
export const SEARCH_BLACK_LIST = 'SEARCH_BLACK_LIST' // 搜索黑名单
export const ADD_BLACK_LIST = 'ADD_BLACK_LIST' // 添加黑名单
export const DELETE_BLACK_LIST = 'DELETE_BLACK_LIST' // 删除黑名单
export const SET_RESUME_STATUS = 'SET_RESUME_STATUS' // 设置简历状态

const URL = ':ve.mobile.interface/user/black_list' // user_ticket
const URLSEAR = ':ve.mobile.interface/user/CompanyListByKeyWord' // name user_ticket
const ADDLIST = ':ve.mobile.interface/user/AddToBlacklist' // id user_ticket
const DELETE = ':ve.mobile.interface/user/Remove_from_blacklist' // id user_ticket
const STATUS = ':ve.mobile.interface/resume/set_base'
// privacy	int	是	1	1：对所有企业公开(默认)；2：黑名单企业不可见；3：只有收到建立的企业才可见；

export const getBlackList = singleApi({
  url: URL,
  action: (args, json) => {
    return {
      type: GET_BLACK_LIST,
      data: json.data,
    }
  },
})

export const searchBlackList = singleApi({
  url: URLSEAR,
  action: (args, json) => {
    return {
      type: SEARCH_BLACK_LIST,
      data: json.data,
    }
  },
})

export const addBlackLIst = singleApi({
  url: ADDLIST,
  action: (args, json) => {
    return {
      type: ADD_BLACK_LIST,
      data: json.data,
    }
  },
})

export const deleteBlackLIst = singleApi({
  url: DELETE,
  action: (args, json) => {
    return {
      args,
      type: DELETE_BLACK_LIST,
      data: json.data,
    }
  },
})

export const setResumeStatus = singleApi({
  url: STATUS,
  action: (args, json) => {
    return {
      args,
      type: SET_RESUME_STATUS,
      data: json.data,
    }
  },
})
