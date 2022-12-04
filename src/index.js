import './index.css'
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import configureCustomStore from './store/configureStore'

const root = ReactDOM.createRoot(document.getElementById('root'))
const store = configureCustomStore()


//For development purposes, I removed React.Strict because of it rendering the DOM twice. In a production environment I would reenable <React.Strict></React.Strict>

root.render(
    <Provider store={store}>
      <App />
    </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
