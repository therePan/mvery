/**
 * Created by huangchao on 2017/10/23.
 */
import {
  HOME_POST_INIT,
  HOME_POST_STARING,
  HOME_POST_ISLODING,
  HOME_POST_REF,
  HOME_POST_ADD,
} from '../actions/home'

const initState = {
  refreshing: false,
  isLoading: false,
  list: [],
  pager: {},
}

export default (state = initState, action = {}) => {
  switch (action.type) {
    case HOME_POST_INIT:
      return {
        ...state,
        list: action.data && [...action.data.list.data],
        pager: {...action.data.list.pager},
      }
    case HOME_POST_STARING:
      return {
        ...state,
        refreshing: true,
      }
    case HOME_POST_ISLODING:
      return {
        ...state,
        isLoading: true,
      }
    case HOME_POST_REF:
      return {
        ...state,
        list: [...action.data.list.data],
        pager: {...action.data.list.pager},
        refreshing: false,
      }
    case HOME_POST_ADD:
      return {
        ...state,
        isLoading: false,
        list: [
          ...state.list,
          ...action.data.list.data,
        ],
        pager: {
          ...state.pager,
          cur: action.args.page,
        },
      }
    default:
      return state
  }
}
