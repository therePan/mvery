/**
 * Created by huangchao on 2017/11/1.
 */
import {
  GET_DELIVERY_ALL,
  DELIVERY_HAS_LOOK,
  DELIVERY_INTERVIEW,
  DELIVERY_INAPPROPRIATE,
  DELETE_DELIVERY,
  DELIVERY_REMIND_HR,
} from '../actions/DeliveryRecord'

const initState = {
  list1: [],
  list2: [],
  list3: [],
  list4: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_DELIVERY_ALL:
      return {
        ...state,
        list1: [...action.data],
      }
    case DELIVERY_HAS_LOOK:
      return {
        ...state,
        list2: [...action.data],
      }
    case DELIVERY_INTERVIEW:
      return {
        ...state,
        list3: [...action.data],
      }
    case DELIVERY_INAPPROPRIATE:
      return {
        ...state,
        list4: [...action.data],
      }
    case DELETE_DELIVERY:
      return {
        ...state,
        list1: state.list1.filter(d => {
          return d.job_id !== action.args.job_id
        }),
        list2: state.list2.filter(d => {
          return d.job_id !== action.args.job_id
        }),
        list3: state.list3.filter(d => {
          return d.job_id !== action.args.job_id
        }),
        list4: state.list4.filter(d => {
          return d.job_id !== action.args.job_id
        }),
      }
    case DELIVERY_REMIND_HR:
      return {
        ...state,
        list1: state.list1.map((data) => {
          if(data.company_id === action.args.company_id) {
            data.clickable = 0
          }
          return data
        }),
      }
    default:
      return state
  }
}

//clickable