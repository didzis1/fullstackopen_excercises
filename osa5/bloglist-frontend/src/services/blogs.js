import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
	token = `bearer ${userToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (newBlog) => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const update = async (blogObject) => {
	const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
	return response.data
}

const remove = async (blogObject) => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.delete(`${baseUrl}/${blogObject.id}`, config)
	return response.data
}

export default { getAll, create, update, remove, setToken }