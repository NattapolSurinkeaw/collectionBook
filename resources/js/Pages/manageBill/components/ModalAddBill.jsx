import React from 'react'
import { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { svCreateBill } from '@/services/bill/bill.services';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};


export default function ModalAddBill({open, handleClose, dataBookAll}) {
  const [preview, setPreview] = useState(null);
  const [slcBook, setSlcBook] = useState([]);
  const [storeBuy, setStoreBuy] = useState(null);
  const [buyPrice, setBuyPrice] = useState(null);
  const [transport, setTransport] = useState(null);
  const [parcelNumber, setParcelNumber] = useState(null);
  const [slipfile, setSlipFile] = useState(null);
  const [inputSearch, setInputSearch] = useState(null);
  const [searchBook, setSearchBook] = useState(dataBookAll);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // สร้าง URL ของไฟล์ที่เลือก
      setSlipFile(file);
      setPreview(imageUrl); // อัปเดต state เพื่อใช้แสดงพรีวิว
    }
  };

  // console.log(dataBookAll)
  const submit = () => {
    const formData = new FormData();
    formData.append("image_slip", slipfile)
    formData.append("store_sell", storeBuy)
    formData.append("price", buyPrice)
    formData.append("transport", transport)
    formData.append("parcel_number", parcelNumber)

    formData.forEach((value, key) => {
      console.log(key, " : ", value);
    });

    svCreateBill(formData).then((res) => {
      console.log(res)
      console.log(res.status)
      if(res.status === "success") {
        handleClose()
      }
    })
  }
  
  return (
    <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex justify-between mb-4">
          <p>Add Bill</p>
          <button className="text-[30px] leading-[10px]" onClick={handleClose}>x</button>
        </div>

        <div className="w-full h-[480px] overflow-auto border">
          <div className='p-3 flex flex-col gap-4 '>
            <div className="border w-[250px] p-2 rounded-md w-full">
              <h3 className="mb-4">รูปสลิปการจ่ายเงิน</h3>
              <div className="flex gap-4">
                <div>
                  <label htmlFor="payslip">
                    <img
                      className="w-[200px] h-[250px] object-cover"
                      src={preview || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"}
                      alt="Payslip Preview"
                      id="payslip-preview"
                    />
                  </label>
                  <input
                    type="file"
                    className='hidden'
                    id="payslip"
                    onChange={handleFileChange} // เรียกใช้งานเมื่อไฟล์ถูกเลือก
                    accept="image/*" // จำกัดให้เลือกเฉพาะไฟล์รูปภาพ
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex gap-2">
                    <label htmlFor="" className="w-20">ราคา
                      <span className="text-red-600">*</span>
                    </label>
                    <input type="text" className="w-full"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="" className="w-20">ร้านที่ซื้อ</label>
                    <input type="text" className="w-full" 
                      value={storeBuy}
                      onChange={(e) => setStoreBuy(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="" className="w-20">ขนส่ง</label>
                    <input type="text" className="w-full" 
                      value={transport}
                      onChange={(e) => setTransport(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="" className="w-20">เลขพัสดุ</label>
                    <input type="text" className="w-full" 
                      value={parcelNumber}
                      onChange={(e) => setParcelNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border w-[250px] p-2 rounded-md w-full">
              <div className="">
                <label htmlFor="" className="w-20">ค้นหาหนังสือ</label>
                <input type="text" className="w-full"
                  value={inputSearch} 
                  onChange={(e) => setInputSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-4 py-4 overflow-auto">
                {
                  searchBook.map((book) => (
                  <div key={book.id} className="w-[200px] h-[300px]">
                    <img src={`/${book.frontCover}`} alt="" />
                  </div>
                  ))
                }
              </div>

              <div className="flex flex-wrap gap-4 py-4">
                {
                  slcBook.map((book) => (
                  <div key={book.id} className="w-[200px] h-[300px]">
                    <img src={book.image} alt="" />
                  </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button 
            className="bg-green-600 text-white p-2 rounded-md"
            onClick={submit}
          >บันทึก</button>
          <button 
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={handleClose}
          >ยกเลิก</button>
        </div>
      </Box>
    </Modal>
    </>
  )
}
