import axios from "axios";

export const svGetPublisher = () => {
  return axios.get('/api/publishers').then((res) => {
    return {status: res.data.status, publisher: res.data.data}
  }).catch((err) => err)
}
 