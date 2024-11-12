import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import { svAddNewBook } from '@/services/book/book.services';
import CKcomponent from '@/Components/CKcomponent/CKcomponent';

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

export default function ModalAddBook({open, handleClose, dataWriter, dataIllustrator, dataPublisher, dataCategory}) {
  const [nameTH, setNameTH] = useState("");
  const [nameEN, setNameEN] = useState("");
  const [nameAT, setNameAT] = useState("");
  const [description, setDescription] = useState("");
  const [lcDate, setlcDate] = useState("");
  const [slcWriter, setSlcWriter] = useState(1);
  const [slcIllust, setSlcIllust] = useState(1);
  const [slcPublish, setSlcPublish] = useState(1);
  const [slcCategories, setSlcCategories] = useState([]);
  const [content, setContent] = useState('');


  const handleCheckboxChange = (id) => {
    setSlcCategories(prevSelectedIds => {
        if (prevSelectedIds.includes(id)) {
            return prevSelectedIds.filter(item => item !== id);
        } else {
            return [...prevSelectedIds, id];
        }
    });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("nameTH", nameTH);
    formData.append("nameEN", nameEN);
    formData.append("nameAT", nameAT);
    formData.append("description", description);
    formData.append("lcDate", lcDate);
    formData.append("slcPublish", slcPublish);
    formData.append("slcWriter", slcWriter);
    formData.append("slcIllust", slcIllust);
    formData.append("slcCategories", slcCategories);

    // console.log(slcCategories)

    formData.forEach((value, key) => {
      console.log(key, " : ", value);
    });
    svAddNewBook(formData).then((res) => {
      console.log(res)
      if(res.data.status == "success") {
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
          <p>Add Book</p>
          <button className="text-[30px] leading-[10px]" onClick={handleClose}>x</button>
        </div>
        
        <div className="w-full h-[480px] overflow-auto border">
          <div className='p-3 flex max-lg:flex-col gap-4 '>
            <label htmlFor="">nameTH</label>
            <TextInput 
              className="w-full" 
              value={nameTH}
              onChange={(e) => setNameTH(e.target.value)}
            />
          </div>
          <div className='p-3 flex max-lg:flex-col gap-4 '>
            <label htmlFor="">nameEN</label>
            <TextInput 
              className="w-full" 
              value={nameEN}
              onChange={(e) => setNameEN(e.target.value)}
            />
          </div>
          <div className='p-3 flex max-lg:flex-col gap-4 '>
            <label htmlFor="">nameAT</label>
            <TextInput 
              className="w-full" 
              value={nameAT}
              onChange={(e) => setNameAT(e.target.value)}
            />
          </div>
          <div className='p-3 flex max-lg:flex-col gap-4 '>
            <label htmlFor="">Description</label>
            <textarea 
              name="" className="w-full rounded-md border-gray-300" id=""
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description}
            ></textarea>
          </div>
          {/* <CKcomponent value={content} onChange={setContent} /> */}
          <div className='p-3 flex max-lg:flex-col gap-4 '>
            <div className="flex flex-col gap-2">
              <label htmlFor="">LC Release Date</label>
              <input 
                type="date" 
                className="rounded-md border-gray-300" name="" id="" 
                value={lcDate}
                onChange={(e) => setlcDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Publisher</label>
              <select 
                name="" id="" 
                className="rounded-md border-gray-300"
                value={slcPublish}
                onChange={(e) => setSlcPublish(e.target.value)}
              >
                {
                  dataPublisher.map((publish) => (
                    <option key={publish.id} value={publish.id}>{publish.name_TH}</option>
                  ))
                }
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Writer</label>
              <select 
                name="" id="" 
                className="rounded-md border-gray-300"
                value={slcWriter}
                onChange={(e) => setSlcWriter(e.target.value)}
              >
                {
                  dataWriter.map((writer) => (
                    <option key={writer.id} value={writer.id}>{writer.writer_name}</option>
                  ))
                }
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Illustrator</label>
              <select 
                name="" id="" 
                className="rounded-md border-gray-300"
                value={slcIllust}
                onChange={(e) => setSlcIllust(e.target.value)}
              >
                {
                  dataIllustrator.map((illust) => (
                    <option key={illust.id} value={illust.id}>{illust.illust_name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <hr />
          <div className="pt-3 px-3">
            <label htmlFor="">Category</label>
          </div>
          <div className='p-3 flex max-lg:flex-col gap-4 '>
            {
              dataCategory.map((cate) => (
                <div key={cate.id} className='flex items-center gap-1'>
                  <input 
                    type="checkbox"
                    className="rounded" 
                    checked={slcCategories.includes(cate.id)} 
                    onChange={() => handleCheckboxChange(cate.id)} 
                  />
                  <label htmlFor="">{cate.title_cate}</label>
                </div>
              ))
            }
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
