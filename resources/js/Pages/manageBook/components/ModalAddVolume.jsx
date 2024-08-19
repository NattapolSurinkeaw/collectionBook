import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';

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

export default function ModalAddVolume({open, handleClose}) {

  const handleSubmit = () => {
    const formData = new FormData();
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
          <p>Edit Category</p>
          <button className="text-[30px] leading-[10px]" onClick={handleClose}>x</button>
        </div>

        <div className="w-full h-[480px] overflow-auto border">
          <div className='p-3 flex max-lg:flex-col gap-4 '>
            <div className="border w-[250px] p-2 rounded-md">
              <h3 className="mb-4">All Category</h3>
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
