/**
 * Created by huangchao on 2017/11/2.
 */
import {
  GET_BLACK_LIST,
  SEARCH_BLACK_LIST,
  DELETE_BLACK_LIST,
} from '../actions/Privacy'

const initState = {
  BlackList: [],
  SearchList: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_BLACK_LIST:
      return {
        ...state,
        BlackList: [...action.data.list],
      }
    case SEARCH_BLACK_LIST:
      return {
        ...state,
        SearchList: [...action.data],
      }
    case DELETE_BLACK_LIST:
      return {
        ...state,
        BlackList: state.BlackList.filter(data => {
          return data.c_userid !== action.args.id
        }),
      }
    default:
      return state
  }
}