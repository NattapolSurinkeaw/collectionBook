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
  const [inputSearch, setInputSearch] = useState("");
  const [dataBook, setDataBook] = useState(dataBookAll);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // สร้าง URL ของไฟล์ที่เลือก
      setSlipFile(file);
      setPreview(imageUrl); // อัปเดต state เพื่อใช้แสดงพรีวิว
    }
  };

  const addSlcBook = (book) => {
    setSlcBook((prevBooks) => {
      const isDuplicate = prevBooks.some((b) => b.vol_id === book.vol_id);
  
      if (!isDuplicate) {
        return [...prevBooks, book];
      }
  
      return prevBooks;
    });
  };

  useEffect(() => {
    console.log(slcBook)
  })

  const filteredData = inputSearch
  ? dataBook.filter((book) => {
      return (
        book.title_TH?.toLowerCase().includes(inputSearch.toLowerCase()) ||
        book.title_EN?.toLowerCase().includes(inputSearch.toLowerCase()) ||
        book.title_Another?.toLowerCase().includes(inputSearch.toLowerCase())
      );
    })
  : dataBook; // แสดงข้อมูลทั้งหมดหากไม่มีคำค้นหา

  // useEffect(() => {
  //   console.log(filteredData)
  // }, [filteredData])


  // console.log(dataBookAll)
  const submit = () => {

    const volIds = slcBook.map((book) => book.vol_id);

    const formData = new FormData();
    formData.append("image_slip", slipfile)
    formData.append("store_sell", storeBuy)
    formData.append("price", buyPrice)
    formData.append("transport", transport)
    formData.append("parcel_number", parcelNumber)
    formData.append("vol_ids", JSON.stringify(volIds));

    // formData.forEach((value, key) => {
    //   console.log(key, " : ", value);
    // });
    // return false;

    svCreateBill(formData).then((res) => {
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
                    <input type="number" className="w-full"
                      value={(buyPrice) ? buyPrice : ""}
                      onChange={(e) => setBuyPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="" className="w-20">ร้านที่ซื้อ</label>
                    <input type="text" className="w-full" 
                      value={(storeBuy) ? storeBuy : ""}
                      onChange={(e) => setStoreBuy(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="" className="w-20">ขนส่ง</label>
                    <input type="text" className="w-full" 
                      value={(transport) ? transport : ""}
                      onChange={(e) => setTransport(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="" className="w-20">เลขพัสดุ</label>
                    <input type="text" className="w-full" 
                      value={(parcelNumber)? parcelNumber : ""}
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
                  value={(inputSearch)? inputSearch : ""}  
                  onChange={(e) => setInputSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-4 py-4 overflow-x-auto">
                {filteredData.map((book) => (
                  <div
                    key={book.vol_id}
                    className="shrink-0 w-[130px] h-[180px] cursor-pointer relative"
                    onClick={() => addSlcBook(book)}
                  >
                    <img
                      className="w-full h-full"
                      src={`/${book.front_cover}`}
                      alt={book.title_vol}
                    />
                    <div className="absolute bottom-0 bg-white opacity-80 w-full">
                      <p>{book.title_vol}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border p-4">
                <p>เล่มที่ซื้อ</p>
                <div className="">
                  {
                    slcBook.map((book) => (
                      
                    <div key={book.vol_id} className="w-full h-[300px] mb-4 border">
                      <img className="w-[200px] h-full" src={`/${book.front_cover}`} alt="" />
                    </div>
                    ))
                  }
                </div>
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
