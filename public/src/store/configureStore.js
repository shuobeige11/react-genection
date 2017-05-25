import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers'

export default function configureStore(history, preloadedState) {
  const store = createStore(
    rootReducer, 
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      )
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
