/**
 * Created by huangchao on 2017/10/24.
 */
import {
  GET_COMPANYDETAIL,
  FLLOW_COMPANY,
  UN_FLLOW_COMPANY,
  GET_COMPANYDETAIL_LIST,
} from '../actions/company'

const initState = {
  list: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_COMPANYDETAIL:
      return {
        ...state,
        ...action.data,
      }
    case GET_COMPANYDETAIL_LIST:
      return {
        ...state,
        list: action.data.list,
      }
    case FLLOW_COMPANY:
      return {
        ...state,
        is_followed: 1,
      }
    case UN_FLLOW_COMPANY:
      return {
        ...state,
        is_followed: 0,
      }
    default:
      return state
  }
}

