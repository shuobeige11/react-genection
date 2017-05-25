import React, { Component, PropTypes } from 'react';
import serialize from 'serialize-javascript';
import ReactDOMServer from 'react-dom/server';

export default class Html extends Component{

  render(){
    const { assets, store, component } = this.props
    const container = !component ? '' : ReactDOMServer.renderToString(component)

    return(
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>xHamster</title>
          { Object.keys(assets.styles).map((style, i) =>
            <link href={assets.styles[style]} key={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>)}
        </head>

        <body>
         
          <div id="root" dangerouslySetInnerHTML={{ __html: container }}/>
          <script id="initialState" type="text/json" dangerouslySetInnerHTML={{__html: JSON.stringify(store.getState())}} />
           {
            Object.keys(assets.javascript).map((script, i) =>
              <script type="text/javascript" src={ assets.javascript[script] } key={i}/>
          )}
        </body>
      </html>
    )

  }
}

Html.propTypes={
  assets: PropTypes.Object,
  component: PropTypes.node,
  store: PropTypes.Object
}