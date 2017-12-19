import { singleApi } from '../helper/reduxFetch'
export const ORDER_ADD= "ORDER_ADD"
export const ORDER_DEIT= "ORDER_DEIT"
export const ORDER_LIST= "ORDER_LIST"

// const LISTURL = 'http://my.veryeast.cn/user/subscribe/index'

export const addOrder = singleApi({
  action: (args, json) => {
    return {
      type: ORDER_LIST,
      data: json.data,
    }
  },
})