import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

const Logout = () => {
	const dispatch = useDispatch()

	const handleLogout = (event) => {
		event.preventDefault()
		dispatch(logoutUser())
	}

	return (
		<form onSubmit={handleLogout}>
			<button className='bg-white hover:bg-blue-200 text-gray-800 font-semibold py-1 px-3 border-gray-400 rounded shadow' id="logout-button"
				type="submit">Logout</button>
		</form>
	)
}

export default Logout