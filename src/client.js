// 清酒稻香
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './style/theme.less'
import './style/style.less'
import routes from './routes'

import * as supersLocation from './actions/supers/location'

import * as LocalReducers from './reducers'
import * as option from './actions/option'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
const store = createStore(
  combineReducers({
    // ...teddyReducers,
    ...LocalReducers,
  }),
  window && window.initailState ? window.initailState : {},
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose)(
    applyMiddleware(
      thunkMiddleware,
    ),
  ),
)

let cityCode
function _optIndex(sublist, city) {
  (sublist || []).forEach(item => {
    if (new RegExp(item.value).test(city)) {
      cityCode = item.code
    }
    _optIndex(item.sublist, city)
  })
}

// 项目初始化前先加载配置文件
store.dispatch(option.load()).then(option => {
  supersLocation.getCoords().then(payload => {
    _optIndex(option.data.areas, payload.address.city)
    store.dispatch({
      type: supersLocation.$.location_load,
      payload: {
        ...payload,
        address: {
          ...payload.address,
          code: cityCode,
        },
      },
    })
  })

  ReactDOM.render(
    <Router>
      <Provider store={store}>
        {routes}
      </Provider>
    </Router>,
    document.getElementById('root')
  )
})
