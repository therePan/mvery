import {VISITY_INIT} from '../actions/visity'
import {VISITY_REFRESHING} from '../actions/visity'
import {REFRESHING_START} from '../actions/visity'

const initState = {
  list: [],
  page: null,
  refreshing: false,
}

export default (state = initState, action) => {
  switch(action.type) {
    case VISITY_INIT:
      return {
        ...state,
        refreshing: false,
        list: [...action.data.list],
      }
    case VISITY_REFRESHING: 
      return {
        ...state,
        refreshing: false,
        list: [...action.data.list],
      }
    case REFRESHING_START: 
      return {
        refreshing: true,
      }
    default: 
      return state
  }
}