import React, { useState } from 'react'
const Blog = ({ blog, updateBlog, removeBlog, user }) => {
	const [isFullyVisible, setIsFullyVisible] = useState(false)
	const [showButton, setShowButton] = useState(false)

	const blogStyle = {
		border: '2px solid purple',
		padding: '8px 10px',
		width: '30%',
		margin: '5px'
	}

	const showFullyVisible = { display: isFullyVisible ? '' : 'none' }
	const showRemoveButton = { display: showButton ? '' : 'none' }

	const handleVisibility = () => {
		setIsFullyVisible(!isFullyVisible)
		handleRemoveButton()
	}

	const handleRemoveButton = () => {
		if (user.username === blog.user.username) {
			setShowButton(true)
		} else {
			setShowButton(false)
		}
	}

	const handleSubmit = () => {
		const blogObject = {
			id: blog.id,
			user: blog.user.id,
			likes: blog.likes + 1,
			author: blog.author,
			title: blog.title,
			url: blog.url
		}
		updateBlog(blogObject)
	}

	const handleRemove = () => {
		removeBlog(blog)
	}

	return (
		<div style={blogStyle} className='blog'>
			<div>
				{blog.title} - {blog.author}
				<button onClick={handleVisibility} className='showMore'>show {isFullyVisible ? 'less' : 'more'}</button>
			</div>
			<div style={showFullyVisible}>
				<p>{blog.url}</p>
				<p id="blog-likes">{blog.likes} likes <button className='likeButton' onClick={handleSubmit}>like</button></p>
				<p>{blog.author}</p>
				<div style={showRemoveButton}>
					<button onClick={handleRemove} id="removeButton" style={{ color: 'red' }}>remove</button>
				</div>
			</div>
		</div>
	)
}


export default Blog
