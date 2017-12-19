import { $ } from '../actions/resume'

export default (state = {}, action) => {
  switch (action.type) {
    case $.get_all_info:
      return {
        ...action.payload.get_base,
      }

    case $.edit:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
