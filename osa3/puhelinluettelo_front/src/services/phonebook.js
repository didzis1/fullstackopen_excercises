import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPersonObj => {
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(response => response.data)
}

const remove = id => {
    return axios.delete(baseUrl + '/' + id)
}

const update = (newObj) => {
    const request = axios.put(`${baseUrl}/${newObj.id}`, newObj)
    return request.then(response => response.data)

}

const exportedObject = {
    getAll,
    create,
    remove,
    update
}

export default exportedObject