import axios from "axios";

export const editProfile = (param) => {
  return axios.post('/editprofile', param).then((res) => res).catch((err) => err)
}

export const handleLogOut = () => {
  return axios.post('/logout').then((res) => {
    console.log(res.status)
    if(res.status) {
      location.reload()
    }
  }).catch((err) => {
    console.log(err);
  })
}