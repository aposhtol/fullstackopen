import axios from "axios"
const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(r => r.data)
}

const countries = { getAll }

export default countries