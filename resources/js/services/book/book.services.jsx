import axios from "axios";

export const svGetBookAll = () => {
  return axios.get('/api/bookall').then((res) => {
    return { status: res.data.status, book: res.data.data}
  })
  .catch((err) => err)
}

export const svGetWriters = () => {
  return axios.get('/api/writers').then((res) => res).catch((err) => err)
}

export const svGetIllustrator = () => {
  return axios.get('/api/illustrators').then((res) => res).catch((err) => err)
}

export const svGetPublisher = () => {
  return axios.get('/api/publishers').then((res) => res).catch((err) => err)
}

export const svGetCategories = () => {
  return axios.get('/api/categories-book').then((res) => res).catch((err) => err)
}


export const svAddNewBook = (params) => {
  return axios.post('/api/addnewbook', params).then((res) => res).catch((err) => err)
}

export const svGetVolumeBook = (params) => {
  return axios.post(`/api/volume-book`, params).then((res) => res).catch((err) => err)
}

export const svAddNewVolume = (params) => {
  return axios.post('/api/addnewvolume', params).then((res) => res).catch((err) => err)
}

// search books for a volume
export const svSearchVolBookByName = (param) => {
  return axios.get('/api/searchVolumeBook', param),then((res) => {
    return { status: res.status}
  })
}