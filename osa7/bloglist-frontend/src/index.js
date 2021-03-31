import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

console.log(store.getState())

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<App/>
		</Provider>
	</Router>,
	document.getElementById('root'))