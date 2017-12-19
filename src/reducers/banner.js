/**
 * Created by huangchao on 2017/10/19.
 */
import {
  BANNER_GET,
} from '../actions/banner'

const initState = {
}

export default (state = initState, action) => {
  switch (action.type) {
    case BANNER_GET:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}
