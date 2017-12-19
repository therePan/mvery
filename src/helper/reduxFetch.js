/**
 * Created by huangchao on 2017/10/19.
 */
import {
  singleFetch,
  multiFetch,
} from './autoFetch'

export function singleApi(...args) {
  const { url, action, prelude, should } = getArgs(args)
  return (args = {}) => (dispatch, getState) => {
    const state = getState()
    if (!should || should(args, state)) {
      prelude && dispatch(prelude())
      return singleFetch(url, args)
        .then(json => dispatch(action(args, json)))
        .catch(err => {return err})
    }
  }
}

export function multiApi(...args) {
  const { url, action, prelude, should } = getArgs(args)

  return (args = {}) => (dispatch, getState) => {
    const state = getState()
    if (!should || should(args, state)) {
      prelude && dispatch(prelude())
      return multiFetch(url, args)
        .then(json => {
          dispatch(action(args, json))
          return json
        })
        .catch(err => {
          if (err.errCode === 5004) {
            state.history.replace('/login')
          }
          throw err
        })
    }
  }
}

function getArgs(args) {
  if (args[0] instanceof Object) {
    return args[0]
  } else {
    return {
      url: args[0],
      action: args[1],
    }
  }
}