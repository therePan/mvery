/**
 * Created by huangchao on 2017/10/31.
 */
import {
  GET_COLLECTCOMPANY_INIT,
  GET_COLLECTCOMPANY_ISLODING,
  GET_COLLECTCOMPANY_ADD,
  DELETE_COMPANY,
} from '../actions/CollectCompany'

const initState = {
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
    case GET_COLLECTCOMPANY_ISLODING:
      return {
        ...state,
        isLoading: true,
      }
    case GET_COLLECTCOMPANY_INIT:
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
    case DELETE_COMPANY:
      return {
        ...state,
        list: state.list.filter(v => {
          return v.company_id !== action.args.company_id
        }),
      }
    case GET_COLLECTCOMPANY_ADD:
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