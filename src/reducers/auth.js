import store from 'store'
import {LOGIN_OUT} from '../actions/userStatus'
import storageSync from '../helper/storage-sync'

const initialState = {}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_OUT: {
      return {}
    }
    default:
      return store.get('m:auth') || {}
  }
}

export default storageSync('m:auth', reducers)
