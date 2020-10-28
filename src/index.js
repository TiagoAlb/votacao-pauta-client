import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#548c5c'
    },
    secondary: {
      main: '#FFFFFF'
    },
    background: {
      default: "#f5f5f5"
    }
  },
  fontFamily: 'Roboto',
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
