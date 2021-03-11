import React from 'react'
import PropTypes from 'prop-types'

const logout = ({ setUser }) => {

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBloglistUser')
		setUser(null)
	}

	return (
		<form onSubmit={handleLogout}>
			<button id="logout-button" type="submit">Logout</button>
		</form>
	)
}

logout.propTypes = {
	setUser: PropTypes.func.isRequired
}

export default logout