import { $ as location$ } from '../../actions/supers/location'

export * from './location'

export default (state = {}, action) => {
  switch(action.type) {
    case location$.location_load:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}