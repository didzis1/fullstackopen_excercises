import React from 'react'
import Logout from '../components/Logout'
import { Link } from 'react-router-dom'


const NavBar = ({ login }) => {


	return (
		<nav className='bg-gray-800 py-2'>
			<Link to='/'><p className='inline-block px-2 text-gray-300 hover:text-white'>blogs</p></Link>
			<Link to='/users'><p className='inline-block px-2 text-gray-300 hover:text-white'>users</p></Link>
			{login ? (
				<div className='inline-block'>
					<p className='inline-block px-2 text-blue-200'>{login.name} logged in</p>
					<div className='inline-block px-2'>
						<Logout />
					</div>
				</div>
			) : null }
		</nav>


	)
}

export default NavBar