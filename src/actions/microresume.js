import { singleApi } from '../helper/reduxFetch'
export const MICRODONW = 'MICRODONW' //上传微简历

const URL= ':ve.mobile.interface/resume/set_micro_resume'

export const microDone = singleApi({
  url: URL,
  action: (args, json) => {
    return {
      type: MICRODONW,
      data: json.data,
    }
  },
}) 

