const initialNotification = {
	message: '',
	isError: false
}

let notificationTimeout

export const setNotification = (data) => {

	return async dispatch => {
		dispatch({
			type: 'SET_NOTIFICATION',
			data
		})

		if (notificationTimeout) {
			clearTimeout(notificationTimeout)
		}

		notificationTimeout = setTimeout(() => {
			dispatch({
				type: 'REMOVE_NOTIFICATION'
			})
		}, 3000)
	}
}

export const removeNotification = () => {
	return {
		type: 'REMOVE_NOTIFICATION'
	}
}

const notificationReducer = (state = initialNotification, action) => {
	switch(action.type) {
	case 'SET_NOTIFICATION':
		return action.data
	case 'REMOVE_NOTIFICATION':
		return initialNotification
	default:
		return state
	}
}

export default notificationReducer