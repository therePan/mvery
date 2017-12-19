import { MICRODONW } from '../actions/microresume'

const initState = {

}

export default (state = initState, action) => {
  switch (action.type) {
    case MICRODONW:
      return {
        ...state,
        ...action.data,
      }
    default: 
      return state
  }
}
