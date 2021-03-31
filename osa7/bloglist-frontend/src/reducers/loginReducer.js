import loginService from '../services/login'
import blogService from '../services/blogs'

const getUserFromLocalStorage = () => {
	return JSON.parse(window.localStorage.getItem('loggedBloglistUser') || null)
}

export const logUser = (credentials) => {
	return async dispatch => {
		const user = await loginService.login(credentials)
		window.localStorage.setItem(
			'loggedBloglistUser', JSON.stringify(user)
		)
		blogService.setToken(user.token)
		dispatch({
			type: 'SIGN_IN',
			data: user
		})
	}
}

export const setLoggedUser = (loggedUser) => {
	const user = JSON.parse(loggedUser || null)
	blogService.setToken(user.token)
	return {
		type: 'SET_LOGGED_USER',
		data: user

	}
}

export const logoutUser = () => {
	return async dispatch => {
		window.localStorage.removeItem('loggedBloglistUser')
		dispatch({
			type: 'SIGN_OUT'
		})
	}
}

const loginReducer = (state = getUserFromLocalStorage(), action) => {
	switch(action.type) {
	case 'SIGN_IN':
		return action.data
	case 'SET_LOGGED_USER':
		return action.data
	case 'SIGN_OUT':
		return null
	default:
		return state
	}
}

export default loginReducer