import React from 'react'
import CommentForm from './CommentForm'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams, useHistory } from 'react-router-dom'


const Blog = ({ user }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const id = useParams().id
	const blog = useSelector(state => state.blogs).find(blog => blog.id === id ? blog : null)
	if (!blog) {
		return null
	}

	const isOwnedByUser = user.username === blog.user.username

	const handleLikesUpdate = () => {
		const blogObject = { ...blog, likes: blog.likes + 1 }
		try {
			dispatch(likeBlog(blogObject))
			dispatch(setNotification({
				message: `A blog called ${blogObject.title} by ${blogObject.author} has been updated.`,
				isError: false
			}))
		} catch (exception) {
			console.log(exception)
		}
	}

	const handleRemove = () => {
		try {
			if (window.confirm(`Remove ${blog.title}?`)) {
				dispatch(deleteBlog(blog))
				dispatch(setNotification({
					message: `A blog called ${blog.title} by ${blog.author} has been removed.`,
					isError: false
				}))
			}
			history.push('/')
		} catch (exception) {
			console.log(exception)
		}
	}

	return (
		<div>
			<div className="w-60 inline-block rounded overflow-hidden shadow-lg mx-4 my-6">
				<h2 className="text-xl font-bold mb-2 px-6 py-2 text-blue-700">{blog.title}</h2>
				<div className="px-6 py-2">
					<p className="text-base pl-3"><a href={blog.url}>{blog.url}</a></p>
					<p className="text-base pl-3">{blog.likes} likes
						<button className="ml-5 bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-2 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={handleLikesUpdate}>like</button></p>
				</div>
				<p className="text-base pl-3">added by {blog.author}</p>
				{isOwnedByUser && <button className="ml-5 bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={handleRemove}>remove</button>}
				<hr  className="mt-4 mb-2"/>
				<ul>
					{blog.comments.map(comment => <li className="ml-3 mb-3" key={comment.id}>{comment.content}</li>)}
				</ul>
			</div>

			<div className="w-60 inline-block rounded overflow-hidden shadow-lg mx-4 my-6">
				<h3 className="text-xl px-2 py-2">Comments</h3>
				<CommentForm id={blog.id}/>
			</div>
		</div>
	)
}


export default Blog
