import { singleApi } from '../helper/reduxFetch'
export const VISITY_INIT = 'VISITY_INIT'
export const VISITY_REFRESHING = 'VISITY_REFRESHING'
export const REFRESHING_START = 'REFRESHING_START'

const URLPOST = ':ve.mobile.interface/user/resume_viewed_list'

export const getVisityList = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: VISITY_INIT,
      data: json.data,
    }
  },
})

export const VisityRefreshing = singleApi({
  url: URLPOST,
  action: (args, json) => {
    return {
      type: VISITY_REFRESHING,
      data: json.data,
    }
  },
  prelude: (args) => {
    return {
      type: REFRESHING_START,
    }
  },
})