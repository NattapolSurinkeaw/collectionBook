import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import { svAddNewVolume } from '@/services/book/book.services';

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

export default function ModalAddVolume({open, handleClose, dataBook, setDataVolume}) {
  const [frontImage, setFrontImage] = useState(null);
  const [spineImage, setSpineImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [titleVol, setTitleVol] = useState("");
  const [description, setDescription] = useState("");
  const [isbnCode, setIsbnCode] = useState("");
  const [linkProduct, setLinkProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [releaseDate, setReleaseDate] = useState(null);

  const handleFileChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // console.log(dataBook)
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('book_id', dataBook.id)
    formData.append('title_volumes', titleVol)
    formData.append('description', description)
    formData.append('isbn_code', isbnCode)
    formData.append('price', price)
    formData.append('link_product', linkProduct)
    formData.append('release_date', releaseDate)

    const frontFile = document.getElementById('input-front').files[0];
    const spineFile = document.getElementById('spine-book').files[0];
    const backFile = document.getElementById('input-back').files[0];
    
    if (frontFile) formData.append('frontImage', frontFile);
    if (spineFile) formData.append('spineImage', spineFile);
    if (backFile) formData.append('backImage', backFile);

    // formData.forEach((value, key) => {
    //   console.log(key, " : ", value);
    // });
    svAddNewVolume(formData).then((res) => {
      if(res.data.status == 'success') {
        console.log(res.data.data)
        setDataVolume(prev => [...prev, res.data.data]);
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
          <p>Add Volume</p>
          <button className="text-[30px] leading-[10px]" onClick={handleClose}>x</button>
        </div>

        <div className="w-full h-[480px] overflow-auto border p-4">
          <div className="border">
            <p>ภาพปก</p>
            <div className='p-3 flex justify-between max-lg:flex-col gap-4'>
              <div>
                <label htmlFor="input-front">
                  <img className="w-[270px] h-[350px]" src={frontImage || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} alt="Front" />
                </label>
                <input type="file" className="hidden" id="input-front" onChange={(e) => handleFileChange(e, setFrontImage)} />
              </div>
              <div>
                <label htmlFor="spine-book">
                  <img className="w-[150px] h-[350px]" src={spineImage || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} alt="Spine" />
                </label>
                <input type="file" className="hidden" id="spine-book" onChange={(e) => handleFileChange(e, setSpineImage)} />
              </div>
              <div>
                <label htmlFor="input-back">
                  <img className="w-[270px] h-[350px]" src={backImage || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} alt="Back" />
                </label>
                <input type="file" className="hidden" id="input-back" onChange={(e) => handleFileChange(e, setBackImage)} />
              </div>
            </div>
          </div>

          <div className='p-4'>
            <div className="flex gap-4">
              <div className="w-full flex  gap-4 mb-4">
                <label htmlFor="" className="w-[130px]">title volume*</label>
                <TextInput 
                  className="w-full" 
                  value={titleVol}
                  onChange={(e) => setTitleVol(e.target.value)}
                />
              </div>
              <div className="w-full flex  gap-4 mb-4">
                <label htmlFor="" className="w-[120px]">isbn_code</label>
                <TextInput 
                  className="w-full"
                  value={isbnCode}
                  onChange={(e) => setIsbnCode(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <label htmlFor="">description</label>
              <textarea 
                name="" id="" 
                className="w-full rounded border-gray-300"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex  gap-4 mb-4">
              <label htmlFor="" className="w-[120px]">Link product</label>
              <TextInput 
                className="w-full" 
                value={linkProduct}
                onChange={(e) => setLinkProduct(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex  gap-4 mb-4">
                <label htmlFor="">price*</label>
                <TextInput 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="flex  gap-4 mb-4">
                <label htmlFor="">Release Date*</label>
                <input 
                  type="date" name="" id="" 
                  className="border-gray-300 rounded" 
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button 
            className="bg-green-600 text-white p-2 rounded-md"
            onClick={handleSubmit}
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
