import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserBlogs = () => {
	const id = useParams().id
	const user = useSelector(state => state.users).find(user => user.id === id ? user : null)
	console.log(user)
	if (!user) {
		return null
	}
	console.log(user.blogs)
	return (
		<div className="pl-4 pt-4">
			<h2 className="text-2xl">{user.name}</h2>
			<h4 className="text-xl">added blogs</h4>
			<ul className="list-inside bg-gray-200">
				{user.blogs.map(blog =>
					<li key={blog.id}>{blog.title}</li>
				)}
			</ul>
		</div>
	)
}

export default UserBlogs