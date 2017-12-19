import store from 'store'

export default function storageSync(key, reducer) {
  const initialState = store.get(key)

  return (prevState, ...args) => {
    const state = reducer(prevState || initialState, ...args)
    store.set(key, state)
    return state
  }
}