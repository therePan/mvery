/**
 * Created by huangchao on 2017/11/2.
 */

import {
  GET_SYSTEMMESSAEG_INIT,
  GET_SYSTEMMESSAEG_DETAIL,
} from '../actions/SystemMessage'

const initState = {
  list: [],
  detail: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_SYSTEMMESSAEG_INIT:
      return {
        ...state,
        list: [...action.data.list],
      }
    case GET_SYSTEMMESSAEG_DETAIL:
      return {
        ...state,
        detail: action.data,
      }
    default:
      return state
  }
}

