import { $, standard } from '../actions/users'

export default (state = standard.initialState, action) => {
  switch (action.type) {
    case $.load:
      return standard.assign(state, action.payload, action.params)

    case $.edit:
      return standard.update(state, action.payload, action.params)

    default:
      return state
  }
}
