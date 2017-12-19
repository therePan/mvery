/**
 * Created by huangchao on 2017/10/23.
 */
import {
  GET_POSTDETAIL,
  POSITION_APPLIED,
  POSITION_FAVORITED,
  POSITION_UN_FAVORITED,
  POSIITION_DELETE_INFO,
} from '../actions/position'

const initState = {
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_POSTDETAIL:
      return {
        ...state,
        ...action.data,
      }
    case POSITION_APPLIED:
      return {
        ...state,
        is_applied: 1,
      }
    case POSITION_FAVORITED:
      return {
        ...state,
        is_favorited: 1,
      }
    case POSITION_UN_FAVORITED:
      return {
        ...state,
        is_favorited: 0,
      }
    case POSIITION_DELETE_INFO:
      return {}
    default:
      return state
  }
}
