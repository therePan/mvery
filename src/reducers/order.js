import {ORDER_ADD} from '../actions/order'

const initState = {
  funtype: '1115',
  jobarea: '',
  salary: '',
  work_mode: '',
  rations_quarters: '',
}

export default (state = initState, action) => {
  switch(action.type) {
    case ORDER_ADD:
      return {
        ...state,
        ...action.data,
      }
      default:
      return state
  }
}

