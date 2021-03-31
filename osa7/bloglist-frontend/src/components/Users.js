import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {

	const users = useSelector(state => state.users)
	return (
		<div>
			<h3 className="pl-3 pt-4 text-xl">Users</h3>
			<table className="table-auto">
				<tbody>
					<tr>
						<td></td>
						<th><strong>blogs created</strong></th>
					</tr>
					{
						users.map(user => {
							return (
								<tr key={user.id} className="bg-gray-100">
									<td className="border px-4 py-2"><Link to ={`/users/${user.id}`}>{user.name}</Link></td>
									<td className="border px-4 py-2">{user.blogs.length}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

export default Users