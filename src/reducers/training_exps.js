import { $ as re$ } from '../actions/resume'
import { $ } from '../actions/trainings'

const initialState = {
  list: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case re$.get_all_info:
      return {
        ...state,
        list: action.payload.get_training_exps,
      }
    // case $.edit:
    //   return {
    //     ...state,
    //     ...action.payload,
    //   }
    case $.remove:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.params.id),
      }
      
    default:
      return state
  }
}
