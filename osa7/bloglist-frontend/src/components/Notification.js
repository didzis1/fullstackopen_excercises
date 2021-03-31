import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notification)

	if (notification.message) {
		const messageStyle = {
			backgroundColor: notification.isError ? 'red' : 'green',
			fontStyle: 'bold',
			fontSize: 30,
			border: '3px solid',
		}

		return (
			<h2 id="message" style={messageStyle} >{notification.message}</h2>
		)
	} else {
		return null
	}
}

export default Notification