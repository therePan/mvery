import md5 from 'md5'

const initialState = {
  list: {},
  hash: {},
  loading: false,
}

export default class Standard {
  constructor(id = 'id') {
    this.__id__ = id
    this.initialState = initialState
  }

  assign(state, payload = [], params = {}) {
    // console.log(payload, params)
    const nextList = {}
    payload.forEach(item => {
      this.__review__(item)
      const id = item[this.__id__]
      const pervItem = state.list[id]
      nextList[id] = pervItem ? { ...pervItem, ...item } : item
    })
    return {
      ...state,
      list: {
        ...state.list,
        ...nextList,
      },
      hash: {
        ...state.hash,
        [indexKey(params)]: payload.map(item => {
          return item[this.__id__]
        }),
      },
    }
  }

  assignOne(state, item = {}, params) {
    return this.assign(state, [item], params)
  }

  find(state, params) {
    const ids = state.hash[indexKey(params)]
    return ids && ids.map(key => state.list[key])
  }

  findById(state, id) {
    return state.list[id]
  }

  // remove(state, params) {
  // }

  // removeById() {
  // }

  update(state, item = {}) {
    this.__review__(item)
    const id = item[this.__id__]
    return {
      ...state,
      list: {
        ...state.list,
        [id]: {
          ...state.list[id],
          ...item,
        },
      },
    }
  }
  
  cached(state, params) {
    return !state.hash[indexKey(params)]
  }

  __review__(item) {
    if (!item[this.__id__]) {
      throw new Error(`数据没有有效的id item => ${JSON.stringify(item)}`)
    }
  }
}

export function indexKey(params = {}) {
  return md5(JSON.stringify(keySort(params)))
}

export function keySort(data) {
  if (typeString(data) === 'object') {
    let next = {}
    Object.keys(data).sort((a, b) => a > b).forEach(key => {
      next[key] = keySort(data[key])
    })
    return next
  }
  if (typeString(data) === 'array') {
    return data.sort((a, b) => a > b)
  }
  return data
}

export function typeString(data) {
  return Object.prototype.toString.call(data).match(/\[object (\w+)\]/)[1].toLowerCase()
}

window.Standard = Standard
