import axios from "axios";

export const svGetIllustrator = () => {
  return axios.get('/api/illustrators').then((res) => {
    return { status: res.data.status, illust: res.data.data}
  })
}

export const svCreateIllustrator = (params) => {
  return axios.post('/api/illustrator', params).then((res) => {
    return { status: res.data.status, illust: res.data.data}
  })
}

export const svEditIllustrator = (id, params) => {
  return axios.post(`/api/illust/${id}`, params).then((res) => {
    return { status: res.data.status, illust: res.data.data}
  })
}

export const svDeleteIllustrator = (id) => {
  return axios.delete(`/api/illustrator/${id}`).then((res) => {
    return { status: res.data.status }
  })
}