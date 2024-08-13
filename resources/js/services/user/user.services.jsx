import axios from "axios"

export const svGetUsers = () => {
  return axios.get('/api/getuser').then((res) => res).catch((err) => err)
}

export const svGetCateBackOffice = () => {
  return axios.get('/api/getcatebackoffice').then((res) => res).catch((err) => err)
}

export const svSaveChangeCate = (params) => {
  return axios.post('/api/savechangecate', params).then((res) => res).catch((err) => err)
}

export const svUpdateUser = (params) => {
  return axios.post('/api/updateuser', params).then((res) => res).catch((err) => err)
}