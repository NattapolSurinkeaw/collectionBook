import axios from "axios";

export const svGetPublisher = () => {
  return axios.get('/api/publishers').then((res) => {
    return {status: res.data.status, publisher: res.data.data}
  }).catch((err) => err)
}
 
export const svCreatePublisher = (params) => {
  return axios.post('/api/publish', params).then((res) => {
    return {status: res.data.status, publisher: res.data.data}
  })
} 

export const svEditPublisher = (id, params) => {
  return axios.post(`/api/publish/${id}`, params).then((res) => {
    return {status: res.data.status, publisher: res.data.data}
  })
}

export const svDeletePublisher = (id) => {
  return axios.delete(`/api/publish/${id}`).then((res) => {
    return {status: res.data.data}
  })
}