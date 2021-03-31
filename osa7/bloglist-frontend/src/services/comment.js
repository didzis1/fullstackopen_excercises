import axios from 'axios'
const baseUrl = '/api/blogs'


const createComment = async (data) => {
	const response = await axios.post(`${baseUrl}/${data.id}/comments`, data.content)
	return response.data
}

export default createComment