import axios from "axios";

export const svGetAuthor = () => {
  return axios.get('/api/authors').then((res) => {
    return { status: res.status, author: res.data.data}
  });
}

export const svCreateAuthor = (params) => {
  return axios.post('/api/create-author', params).then((res) => {
    return { status: res.data.status, author: res.data.data}
  })
}

export const svEditAuthor = (id, params) => {
  return axios.post(`/api/edit-author/${id}`, params).then((res) => {
    return { status: res.data.status, author: res.data.data}
  })
}

export const svDeleteAuthor = (id) => {
  return axios.delete(`/api/delete-author/${id}`).then((res) => {
    return { status: res.data.status}
  })
}