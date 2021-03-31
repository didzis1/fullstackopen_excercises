import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {

	const blogs = useSelector(state => state.blogs).sort((a, b) => b.likes - a.likes)
	return (
		<div>
			{blogs.map(blog => <Link key={blog.id} to={`/blogs/${blog.id}`}><span
				className="border block border-blue-300 py-4 px-4 my-3 mx-3 w-60"
			>{blog.title} - {blog.author}</span></Link>)}
		</div>
	)
}

export default Blogs