import axios from "axios";

export const svGetBookAll = () => {
  return axios.get('/api/bookall').then((res) => {
    return { status: res.data.status, book: res.data.data}
  })
  .catch((err) => err)
}

export const svAddNewBook = (params) => {
  return axios.post('/api/addnewbook', params).then((res) => {
    return {status: res.data.status, book: res.data.data}
  }).catch((err) => err)
}

export const svGetVolumeBook = (params) => {
  return axios.post(`/api/volume-book`, params).then((res) => {
    return { status: res.data.status, 
              book: res.data.data, 
              volumes : res.data.data.volumes 
            }
  }).catch((err) => err)
}

export const svAddNewVolume = (params) => {
  return axios.post('/api/addnewvolume', params).then((res) => res).catch((err) => err)
}

// search books for a volume
export const svGetBookAndVol = (param) => {
  return axios.get('/api/get-bookandvolume', param).then((res) => {
    return { status: res.status, book: res.data.data}
  })
}


export const svGetFavoriteBook = () => {
  return axios.get('/api/get-favorites').then((res) => {
    return { status: res.data.status, favorites: res.data.data}
  }).catch((err) => err)
}