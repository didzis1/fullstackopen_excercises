import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const handleTitle = (event) => {
		setNewTitle(event.target.value)
	}

	const handleAuthor = (event) => {
		setNewAuthor(event.target.value)
	}

	const handleUrl = (event) => {
		setNewUrl(event.target.value)
	}

	const handleCreateBlog = (event) => {
		event.preventDefault()
		const newBlog = {
			title: newTitle,
			author: newAuthor,
			url: newUrl
		}
		createBlog(newBlog)
		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')
	}

	return (
		<form onSubmit={handleCreateBlog}>
			<div>
                title: <input
					type="text"
					value={newTitle}
					name="Title"
					id="title"
					onChange={handleTitle}
				/>
			</div>
			<div>
                author: <input
					type="text"
					value={newAuthor}
					name="Author"
					id="author"
					onChange={handleAuthor}
				/>
			</div>
			<div>
                url: <input
					type="text"
					value={newUrl}
					name="Url"
					id="url"
					onChange={handleUrl}
				/>
			</div>
			<button type="submit" id="create-blog-button">create</button>
		</form>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
}

export default BlogForm