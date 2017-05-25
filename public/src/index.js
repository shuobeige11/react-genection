import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import route from './router'
import configureStore from './store/configureStore'
require( './common/common.css')

const initIalState = JSON.parse(document.getElementById('initialState').innerHTML)
const store = configureStore(history, initIalState)
const history = syncHistoryWithStore(browserHistory, store)
const routes = route()
const { pathname, search, hash } = window.location
const  location = `${pathname}${search}${hash}`

match({routes, location}, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <div>
        <Router history={history} {...renderProps}/>
      </div>
    </Provider>,
    document.getElementById('root')
  )
})