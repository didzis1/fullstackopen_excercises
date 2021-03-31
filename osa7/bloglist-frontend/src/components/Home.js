import React, { useRef } from 'react'
import Togglable from '../components/Togglable'
import Blogs from '../components/Blogs'
import BlogForm from '../components/BlogForm'

const Home = () => {
	const blogFormRef = useRef()
	return (
		<div>
			<Togglable buttonLabel='Show blog form' ref={blogFormRef}>
				<BlogForm onToggleVisibility={blogFormRef}/>
			</Togglable>
			<h3 className="text-3xl mx-5 my-4">All blogs</h3>
			<Blogs />
		</div>
	)
}

export default Home