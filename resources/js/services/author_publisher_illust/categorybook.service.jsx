import axios from "axios";


export const svGetCategories = () => {
  return axios.get('/api/categories-book').then((res) => {
    return { stautus: res.data.status, catebook: res.data.data}
  }).catch((err) => err)
}

export const svCreateCateBook = (params) => {
  return axios.post('/api/category-book', params).then((res) => {
    return { status: res.data.status, catebook : res.data.data}
  })
}

export const svEditCateBook = (id, params) => {
  return axios.post(`/api/category-book/${id}`, params).then((res) => {
    return { status: res.data.status, catebook: res.data.data}
  })
}

export const svDeleteCateBook = (id) => {
  return axios.delete(`/api/category-book/${id}`).then((res) => {
    return { status: res.data.status, message: res.data.message }
  })
}

