import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};

export default function ModalEditUser({open, handleClose, roleData, userSelect}) {
  console.log("openModal")

  const [formData, setFormData] = useState({
    name: userSelect[0].name,
    email: userSelect[0].email,
    password: '',
    role_id: userSelect[0].role_id,
    profileImage: null, // เพิ่มฟิลด์สำหรับเก็บรูปภาพ
  });

  const [imagePreview, setImagePreview] = useState('/image/emptyProfile.jpg'); // สร้าง state สำหรับรูป preview

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value,
      });
  };

  const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          // เก็บไฟล์รูปภาพลงใน formData
          setFormData({
              ...formData,
              profileImage: file,
          });

          // สร้าง URL เพื่อแสดง preview รูป
          const imageUrl = URL.createObjectURL(file);
          setImagePreview(imageUrl);
      }
  };

  const submit = () => {
    console.log(formData)
    // const formData = new FormData();
    // formData.append("profile_img", )
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
          <p>แก้ไขข้อมูลผู้ใช้</p>
          <button className="text-[30px] leading-[10px]" onClick={handleClose}>x</button>
        </div>

        <div className="w-full flex flex-col gap-4 h-[480px] overflow-auto border">
          <div className='p-3 flex max-lg:flex-col gap-4 '>
            <div className="mx-auto">
              <label htmlFor="inputProfile">
                <img 
                  className="w-40 h-40 rounded-full border p-1"
                  alt=""
                  src={imagePreview} // ใช้รูป preview แสดงแทน
                />
              </label>
              <input 
                className="hidden" type="file" 
                name="inputProfile" 
                id="inputProfile" 
                accept="image/*" // รับเฉพาะไฟล์รูปภาพ
                onChange={handleImageChange} // เรียก handleImageChange เมื่อเลือกไฟล
              />
            </div>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="">
              <label htmlFor="">ชื่อ</label>
              <TextInput 
                className="w-full" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>
            <div className="">
              <label htmlFor="">อีเมล</label>
              <TextInput 
                className="w-full" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>
            <div className="">
              <label htmlFor="">รหัสผ่าน</label>
              <TextInput 
                className="w-full"
                name="password" 
                value={formData.password} 
                onChange={handleChange}   
              />
            </div>
            <div className="">
              <label htmlFor="">ระดับผู้ใช้</label>
              <select 
                className="w-full rounded-md" 
                name="role_id" 
                value={formData.role_id}
                onChange={handleChange}
              >
                {
                  roleData.map((role) => (
                    <option 
                    key={role.id} 
                    value={role.id}>
                      {role.role_name}
                    </option>
                  ))
                }
              </select>
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
