/**
 * Created by huangchao on 2017/10/20.
 */
import {
  SEARCH_HOT,
  SEARCH_TIPS,
  SEARCH_LIST_INIT,
  SEARCH_LIST_ISLODING,
  SEARCH_LIST_ADD,
} from '../actions/search'

const initState = {
  hot: [],
  tips: {},
  refreshing: false,
  isLoading: false,
  list: [],
  pager: {
    cur:1,
    count: '',
    allPage: '',
    size: 15,
  },

}

export default (state = initState, action) => {
  switch (action.type) {
    case SEARCH_HOT:
      return {
        ...state,
        hot: [...action.data],
      }
    case SEARCH_TIPS:
      return {
        ...state,
        tips: {...action.data},
      }
    case SEARCH_LIST_ISLODING:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_LIST_INIT:
      return {
        ...state,
        list: [...action.data.list],
        pager: {
          ...state.pager,
          cur: 1,
          count: action.data.count,
          allPage: Math.ceil(action.data.count / 15),
        },
      }
    case SEARCH_LIST_ADD:
      return {
        ...state,
        isLoading: false,
        list: [
          ...state.list,
          ...action.data.list,
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