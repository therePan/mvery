import { $ } from '../actions/option'
import storageSync from '../helper/storage-sync'

const initialState = {}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case $.load:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export default storageSync('m:option', reducers)
