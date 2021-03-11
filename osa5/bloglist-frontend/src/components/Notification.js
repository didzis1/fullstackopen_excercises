import React from 'react'

const Notification = ({ message }) => {
	if (message) {
		const messageStyle = {
			backgroundColor: message.isError ? 'red' : 'green',
			fontStyle: 'bold',
			fontSize: 30,
			border: '3px solid',
		}

		return (
			<h2 id="message" style={messageStyle} >{message.message}</h2>
		)
	} else {
		return null
	}
}

export default Notification