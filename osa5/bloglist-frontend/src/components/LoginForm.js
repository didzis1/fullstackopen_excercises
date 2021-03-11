import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ password, setPassword, username, setUsername, setUser, setMessage }) => {

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})
			window.localStorage.setItem(
				'loggedBloglistUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setMessage({ message: 'Wrong username or password', isError: true })
			setTimeout(() => {
				setMessage(null)
			}, 3000)
		}


	}
	return (
		<div>
			<h2>Login to Bloglist</h2>
			<form onSubmit={handleLogin}>
				<div>
                    username
					<input
						onChange={({ target }) => setUsername(target.value)}
						type="text"
						value={username}
						id="username"
						name="Username"/>
				</div>
				<div>
                    password
					<input
						onChange={({ target }) => setPassword(target.value)}
						type="password"
						value={password}
						id="password"
						name="Password"/>
				</div>
				<button type="submit" id="login-submit-btn">Login</button>
			</form>
		</div>
	)
}

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	setUsername: PropTypes.func.isRequired,
	password: PropTypes.string.isRequired,
	setPassword: PropTypes.func.isRequired,
	setUser: PropTypes.func.isRequired,
	setMessage: PropTypes.func.isRequired
}

export default LoginForm