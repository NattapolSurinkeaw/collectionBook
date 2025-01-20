import React, { useState, useRef } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { svEditPublisher } from '@/services/author_publisher_illust/publisher.service';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
// import Typography from '@mui/material/Typography';
// import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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

export default function ModalEditPublisher({open, handleClose, slcPublisher}) {
  console.log(slcPublisher)
  const ImageRef = useRef([]);
  const [parentId, setParentId] = useState([]);
  const [imagePreview, setImagePreview] = useState('/'+slcPublisher.thumbnail);
  const [title, setTitle] = useState(slcPublisher.name_TH);
  const [another, setAnother] = useState(slcPublisher.name_EN);
  const [priority, setPriority] = useState(1);
  const [statusDisplay, setStatusDisplay] = useState(true);
  const [position, setPosition] = useState(1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  const handleRadioChange = (id, position) => {
    setParentId([id]); // อัปเดต state ให้เป็น array ที่มีค่า selectedValue
    setPosition(position);
  };

  const submit = () => {
    // console.log(ImageRef.current.files[0])
    const formData = new FormData();
    formData.append("name_TH", title);
    formData.append("name_EN", another);
    formData.append("thumbnail", ImageRef.current.files[0]);
    // formData.append("status_display", statusDisplay);

    formData.forEach((value, key) => {
      console.log(key, " : ", value);
    });
  
    svEditPublisher(slcPublisher.id, formData).then((res) => {
      console.log(res)
      if(res.status == 'success') {
        // setPublisher(prevPublish => [...prevPublish, res.publisher]);
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
          <p>Edit Publisher</p>
          <button className="text-[30px] leading-[10px]" onClick={handleClose}>x</button>
        </div>

        <div className="w-full h-[480px] overflow-auto border">
          <div className='p-3'>
            <div className="w-full flex flex-col gap-4">
              <div className="p-4 border rounded-md flex gap-4">
                <div className="w-[150px] h-[122px] border p-1 hover:scale-[0.95] duration-300 cursor-pointer">
                  <label htmlFor="imageCate">
                    <img 
                      className="w-full h-full rounded-sm" 
                      src={imagePreview} 
                      alt=""
                    />
                  </label>
                  <input 
                    id="imageCate" type="file" 
                    className="hidden" 
                    ref={ImageRef}
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <input 
                    className="w-full focus-none rounded-md" 
                    placeholder="Title" type="text" />
                  <input className="w-full focus-none rounded-md" placeholder="alt" type="text" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">ลายละเอียด</label>
                <input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full focus-none rounded-md" 
                  placeholder="name TH" type="text" />
                <input 
                  value={another} 
                  onChange={(e) => setAnother(e.target.value)}
                  className="w-full focus-none rounded-md" 
                  placeholder="name EN" type="text" 
                />
              </div>

              {/* <div>
                <p className="mb-2">ตั้งหมวด category</p>
                <div className="flex gap-4">
                  <div className="w-24 p-1 border flex items-center flex-col gap-2">
                    <label htmlFor="">แสดงผล</label>
                    <Switch
                      onChange={(e) => setStatusDisplay(e.target.checked)}
                      {...label}
                      defaultChecked={statusDisplay}
                    />
                  </div>

                  <div className="w-24 p-1 border flex items-center flex-col gap-2">
                    <label htmlFor="">priority</label>
                    <TextInput 
                      style={{width: '100%'}}
                      type="number" min="0"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    />
                  </div>
                </div>
              </div> */}
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
