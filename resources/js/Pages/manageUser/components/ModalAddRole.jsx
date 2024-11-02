import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import { svCreateNewCate } from '@/services/user/user.services';


// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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

export default function ModalAddRole({openModal, handleCloseModal}) {
  const [newRole, setNewRole] = useState();
  const submit = () => {
    svCreateNewCate(newRole).then((res) => {
      console.log(res);
    })
  }
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex justify-between mb-4">
          <p>Create New Role</p>
          {/* <button className="text-[30px] leading-[10px]" onClick={handleCloseModal}>x</button> */}
        </div>

        <TextInput
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="mt-1 block w-full text-center"
        />

        <div className="mt-4 flex justify-end gap-3">
          <button 
            className="bg-green-600 text-white p-2 rounded-md"
            onClick={submit}
          >บันทึก</button>
          <button 
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={handleCloseModal}
          >ยกเลิก</button>
        </div>
      </Box>
    </Modal>
  )
}
