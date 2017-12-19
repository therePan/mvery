/**
 * Created by huangchao on 2017/10/30.
 */
import {
  GET_USER_STATUS,
  LOGIN_OUT,
  SAVE_USER_CITY_CODE,
} from '../actions/userStatus'
import {
  POSITION_APPLIED,
  POSITION_FAVORITED,
  POSITION_UN_FAVORITED,
} from '../actions/position'
import {
  FLLOW_COMPANY,
  UN_FLLOW_COMPANY,
} from '../actions/company'
import { // 设置简历状态
  SET_RESUME_STATUS,
} from '../actions/Privacy'


const initState = {
  code: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_USER_STATUS:
      return {
        ...state,
        ...action.data,
      }
    case POSITION_APPLIED:
      return {
        ...state,
        deliver_success_num: state.deliver_success_num + 1,
      }
    case POSITION_FAVORITED:
      return {
        ...state,
        favorited_num:state.favorited_num + 1,
      }
    case POSITION_UN_FAVORITED:
      return {
        ...state,
        favorited_num:state.favorited_num - 1,
      }
    case FLLOW_COMPANY:
      return {
        ...state,
        followed_num: state.followed_num + 1,
      }
    case UN_FLLOW_COMPANY:
      return {
        ...state,
        followed_num: state.followed_num - 1,
      }
    case SET_RESUME_STATUS:
      return {
        ...state,
        resume_status: action.args.privacy,
      }
    case SAVE_USER_CITY_CODE:
      return{
        ...state,
        code: action.code.code,
      }
    case LOGIN_OUT:
      return {}
    default:
      return state
  }
}