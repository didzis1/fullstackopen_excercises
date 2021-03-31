import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/index'
import { logUser } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const username = useField('text')
	const password = useField('password')

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			await dispatch(logUser({
				username: username.input.value,
				password: password.input.value
			}))
			history.push('/')
		} catch (exception) {
			dispatch(setNotification({ message: 'Wrong username or password', isError: true }))
		}
	}
	return (
		<div className="ml-5 mt-5">
			<h2 className="font-semibold">Login to Bloglist</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label className="block">Username</label>
					<input
						className="w-30 h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border border-blue-300 rounded-lg focus:shadow-outline"
						{...username.input}
						id="username"
						name="Username"/>
				</div>
				<div>
					<label className="block">Password</label>
					<input
						className="w-30 h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border border-blue-300 rounded-lg focus:shadow-outline"
						{...password.input}
						id="password"
						name="Password"/>
				</div>
				<button type="submit" id="login-submit-btn"  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 my-3 mx-3 border-b-4 border-green-700 hover:border-green-500 rounded">Login</button>
			</form>
		</div>
	)
}

export default LoginForm