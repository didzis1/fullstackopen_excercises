import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ onToggleVisibility }) => {

	const dispatch = useDispatch()

	const title = useField('text')
	const author = useField('text')
	const url = useField('text')

	const handleCreateBlog = (event) => {
		event.preventDefault()
		const newBlog = {
			title: title.input.value,
			author: author.input.value,
			url: url.input.value
		}
		try {
			onToggleVisibility.current.toggleVisibility() // Close form
			dispatch(createBlog(newBlog)) // Create the blog
			// Notification
			dispatch(setNotification({
				message: `A new blog called ${newBlog.title} by ${newBlog.author} has been added.`,
				isError: false
			}))
		} catch (exception) {
			dispatch(setNotification({
				message: 'Error while creating the blog',
				isError: true
			}))
		}
		title.reset()
		author.reset()
		url.reset()
	}

	return (
		<form onSubmit={handleCreateBlog} className="mt-5 ml-6">
			<div className=''>
				<label className="block">Title</label>
				<input
					className="w-30 h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border border-blue-300 rounded-lg focus:shadow-outline"
					name="Title"
					id="title"
					{...title.input}
				/>
			</div>
			<div>
				<label className="block">Author</label>
				<input
					className="w-30 h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border border-blue-300 rounded-lg focus:shadow-outline"
					name="Author"
					id="author"
					{...author.input}
				/>
			</div>
			<div>
				<label className="block">Url</label>
				<input
					className="w-30 h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border border-blue-300 rounded-lg focus:shadow-outline"
					name="Url"
					id="url"
					{...url.input}
				/>
			</div>
			<button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 my-3 mx-3 border-b-4 border-green-700 hover:border-green-500 rounded" type="submit" id="create-blog-button">create</button>
		</form>
	)
}

BlogForm.propTypes = {
	onToggleVisibility: PropTypes.object.isRequired
}

export default BlogForm