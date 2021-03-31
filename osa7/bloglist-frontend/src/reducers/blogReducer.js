import blogService from '../services/blogs'

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs
		})
	}
}

export const createBlog = (content) => {

	return async dispatch => {
		// Add the blog to the database
		const newBlog = await blogService.create(content)
		dispatch({
			type: 'ADD_BLOG',
			data: newBlog
		})
	}
}

export const likeBlog = (content) => {
	return async dispatch => {
		const updatedBlog = await blogService.update(content)
		dispatch({
			type: 'LIKE_BLOG',
			data: updatedBlog
		})
	}
}

export const addComment = (data) => {
	return async dispatch => {
		const response = await blogService.addComment(data)
		const allBlogs = await blogService.getAll()
		const blogToComment = allBlogs.find(blog => blog.id === response.blog)
		blogToComment.comments.concat(response)
		dispatch({
			type: 'ADD_COMMENT',
			data: blogToComment
		})
	}
}

export const deleteBlog = (content) => {
	return async dispatch => {
		await blogService.remove(content)
		dispatch({
			type: 'DELETE_BLOG',
			data: content
		})
	}
}

const blogReducer = (state = [], action) => {
	// console.log(state, action)
	switch(action.type) {
	case 'ADD_BLOG':
		return [...state, action.data]
	case 'INIT_BLOGS':
		return action.data
	case 'LIKE_BLOG':
		return state.map(blog => blog.id === action.data.id ? action.data : blog)
	case 'DELETE_BLOG':
		return state.filter(blog => blog.id !== action.data.id)
	case 'ADD_COMMENT':
		return state.map(blog => blog.id === action.data.id ? action.data : blog)
	default:
		return state
	}
}


export default blogReducer