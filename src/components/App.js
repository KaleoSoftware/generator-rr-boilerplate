import React, {Component} from 'react'
import * as Colors from 'material-ui/lib/styles/colors'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'

import Theme from '../theme'
import Header from '../containers/Header'
import Nav from '../containers/Nav'
import SearchBox from '../containers/SearchBox'

var styles = {
  app: {
    display: 'flex',
    minHeight: '100%',
    boxSizing: 'border-box',

    flexDirection: 'column',

    backgroundColor: Colors.brown50
  },

  main: {
    width: '100%',
    maxWidth: '90rem',
    padding: '0 1.5rem',
    margin: '9rem auto 2rem',
    boxSizing: 'border-box'
  }
}

@ThemeDecorator(ThemeManager.getMuiTheme(Theme))
export default class App extends Component {
  render() {
    return <div style={styles.app}>
        <main style={styles.main}>
          <h1>Hello world!</h1>
          {this.props.children}
        </main>
      </div>
  }
}
