import axios from 'axios'
const baseUrl = 'api/contacts'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const remove = id => {  
  return axios.delete(`${baseUrl}/${id}`)
}

const update = newPerson => {
  return axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
}

export default { getAll, create, remove, update }


