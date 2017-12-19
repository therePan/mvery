/**
 * Created by huangchao on 2017/10/19.
 */
import { singleApi } from '../helper/reduxFetch'
export const BANNER_GET = 'BANNER_GET' // 获取首页广告位及list

const URL = ':ve.mobile.interface/index/indexdata'
export const getBanner = singleApi({
  url: URL,
  action: (args, json) => {
    return {
      type: BANNER_GET,
      data: json.data,
    }
  },
})
