import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(r => r.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(r => r.data)
}

const remove = id => {
    axios.delete(`${baseUrl}/${id}`)
    
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(r => r.data)
}

const phonebook = { getAll, create, update, remove }

export default phonebook
