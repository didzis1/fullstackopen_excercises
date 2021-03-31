import React from 'react'
import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ id }) => {
	const comment = useField('text')
	const dispatch = useDispatch()
	const handleComment = (event) => {
		event.preventDefault()
		const data = {
			id: id,
			comment: comment.input.value
		}
		dispatch(addComment(data))
	}
	return (
		<form onSubmit={handleComment} className="mx-3">
			<label>Add comment:</label>
			<input className="w-30 h-8 px-2 mb-2 text-base text-gray-700 placeholder-gray-600 border border-blue-300 rounded-lg focus:shadow-outline" {...comment.input} />
			<button className="mx-auto bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 my-3 border-blue-700 hover:border-blue-500 rounded" type='submit'>add comment</button>
		</form>
	)
}

export default CommentForm