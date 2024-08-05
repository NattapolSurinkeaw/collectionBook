import axios from "axios"

export const svGetUsers = () => {
  return axios.get('/api/getuser').then((res) => res).catch((err) => err)
}

export const svGetCateBackOffice = () => {
  return axios.get('/api/getcatebackoffice').then((res) => res).catch((err) => err)
}