/**
 * Created by huangchao on 2017/10/25.
 */
import {
  JOB_SEARCH_INIT,
  JOB_SEARCH_ADD,
  JOB_SEARCH_ISLODING,
  JOB_SEARCH_LODING,
  JOB_SEARCH_REF,
} from '../actions/jobPage'

const initState = {
  refreshing: false,
  isLoading: false,
  list: [],
  pager: {
    cur:1,
    count: '',
    allPage: '',
    size: 20,
  },
}

export default (state = initState, action) => {
  switch (action.type) {
    case JOB_SEARCH_ISLODING:
      return {
        ...state,
        isLoading: true,
      }
    case JOB_SEARCH_LODING:
      return {
        ...state,
        refreshing: true,
      }
    case JOB_SEARCH_INIT:
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
    case JOB_SEARCH_REF:
      return {
        ...state,
        refreshing: false,
        list: [...action.data.list],
        pager: {
          ...state.pager,
          cur: 1,
          count: action.data.count,
          allPage: Math.ceil(action.data.count / 15),
        },
      }
    case JOB_SEARCH_ADD:
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
