import React from 'react'
import {renderToString} from 'react-dom/server'
import serialize from 'serialize-javascript'

const styles = {
  html: {
    height: '100%',

    fontSize: '62.5%',
    color: 'rgba(0,0,0,.87)'
  },

  body: {
    height: '100%',

    fontSize: '1.6rem'
  },

  root: {
    height: '100%'
  }
}

export default ({assets, store, children}) => (
  <html style={styles.html}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>Kaleo</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css" rel="stylesheet" />
      <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic' rel='stylesheet' type='text/css' />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </head>
    <body style={styles.body}>
      {/* Insert main component */}
      <main
        style={styles.root}
        dangerouslySetInnerHTML={{__html: renderToString(children)}}
        id="root"></main>

      {/* Hydrate store */}
      <script dangerouslySetInnerHTML={{__html: 'window.__INITIAL_STATE__='+serialize(store.getState())}} />

      {/* JavaScripts */}
      {/* One for each Webpack "entry" */}
      {Object.keys(assets.javascript).map((script, i) =>
        <script src={assets.javascript[script]} key={i} />
      )}
    </body>
  </html>
)
