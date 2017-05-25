import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext,  match, createMemoryHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from '../public/src/store/configureStore';
import Html from '../public/src/containers/Html';
import route from '../public/src/router'

function fetchComponentData(dispatch, components, params) {
  const needs = components.reduce( (prev, current) => {

    return current ? (current.needs || []).concat(prev) : prev;
  }, []);

  const promises = needs.map(need => dispatch(need(params)));

  return Promise.all(promises);
}

function routers (req, res, SREVER_RENDER) {
    const routes = route()
    const memoryHistory = createMemoryHistory(req.url)
    const store = configureStore(memoryHistory)
    const history = syncHistoryWithStore(memoryHistory, store)

    function renderView(renderProps) {
        const component = ( 
            <Provider store={store}>
                <div>
                    <RouterContext {...renderProps} />
                </div>
            </Provider>
        )
        const html = ReactDOMServer.renderToString( 
                <Html  assets = { webpack_isomorphic_tools.assets() } store = { store } component={ component } />)
        res.status(200).send('<!doctype html>\n' + html)   
    }

    function renderNotView() {
        const frame = ReactDOMServer.renderToString( 
                <Html assets = { webpack_isomorphic_tools.assets() } store = { store } />)
            
        res.status(200).send('<!doctype html>\n' + frame) 
    }


    if(!SREVER_RENDER) {
      renderNotView()
      return
    }

    match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
        
        if (error) {
            res.render('error', { message: '服务器错误' })
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
            .then(() => renderView(renderProps))
            .catch(err => res.render('error',{ message: err.message }));    
        } else {
            res.render('error', { message: 'Not Found' })
        }
    })
}


// 从 store 中获得初始 state

export default routers