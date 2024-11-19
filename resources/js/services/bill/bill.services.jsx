import axios from "axios";

export const svGetBillAll = () => {
  return axios.get('/api/bill')
  .then((res) => 
    {
      return { status: res.data.status, bill: res.data.data}
    }
  ).catch((err) => err)
} 

export const svCreateBill = (formData) => {
  return axios.post('/api/createBill', formData)
  .then((res) => {
    return { status: res.data.status, bill: res.data.data}
  })
}