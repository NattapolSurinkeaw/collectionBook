import React, { useState, useEffect } from 'react'
import MainLayout from '@/Layouts/MainLayout'
import { menuData } from '@/services/menu/menu.services'
// import Modal from '@/Components/modalGlobal/Modal';
import ModalAddCate from './components/ModalAddCate';
import ModalEditCate from './components/ModalEditCate';
import { svGetCate, svDeleteCate } from '@/services/menu/menu.services';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function CategoryPage() {
  const [fillter, setFillter] = useState(1);
  const [handlemodal, setHandleModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [cateData, setCateData] = useState([]);
  const [slcEdit, setSlcEdit] = useState(null);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  useEffect(() => {
    svGetCate().then((res) => {
      setCateData(res.data.data)
    })
  }, []);

  const handleDeleteCate = (id) => {
    svDeleteCate(id).then((res) => {
      console.log(res)
      setCateData(prevCateData => prevCateData.filter(cate => cate.id !== id));
    })
  }

  const handleEditModal = (id) => {
    setOpenEdit(!openEdit)
    setSlcEdit(id)
  }

  return (
    <MainLayout>
      <h1 className="mb-4">Category {fillter}</h1>
      <div className="border-b-2 flex justify-between">
        <ul className="flex">
          <li className="bg-white p-2 border-t-2 border-x-2 rounded-tl-md" onClick={() => setFillter(1)}>ทั้งหมด</li>
          <li className="bg-white p-2 border-t-2 border-x-2" onClick={() => setFillter(2)}>เมนูย่อย</li>
          <li className="bg-white p-2 border-t-2 border-x-2 rounded-tr-md" onClick={() => setFillter(3)}>ปิดใช้งาน</li>
        </ul>
        <button className="p-2 bg-blue-500 text-white rounded-md" onClick={() => setOpen(!open)}>create</button>
      </div>
      <div className="p-4 border h-[85%] overflow-auto flex flex-col gap-4">
        {cateData.map((cate) => (
          <div key={cate.id} className="p-4 border bg-[#f8f9fa] rounded-sm flex justify-between">
            <div className="flex gap-4">
              <div className="w-[150px] h-[122px] border p-1 hover:scale-[0.95] duration-300 cursor-pointer">
                <img className="w-full h-full rounded-sm" src={`${(cate.cate_thumbnail) ? cate.cate_thumbnail : '/image/no-image.png'}`} alt="" />
              </div>
              <div>
                <p className="text-red-500">[{cate.id}]</p>
                <p>
                  <span>{cate.id}</span>
                  <span> {cate.cate_title}</span>
                </p>
                <p className="text-slate-400 text-sm">priority {cate.cate_priority}</p>
                <p>
                  {
                    cate.status_display ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )
                  }
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button 
                className="bg-yellow-500 text-white p-2 rounded-lg"
                onClick={() => handleEditModal(cate.id)}
              >แก้ไข</button>
              <button 
                className="bg-red-500 text-white p-2 rounded-lg"
                onClick={() => handleDeleteCate(cate.id)}
              >ลบ</button>
            </div>
          </div>
        ))}
      </div>

      {
        open && (
          <ModalAddCate 
            open={open} 
            handleOpen={handleOpen}
            handleClose={handleClose}
            cateData={cateData}
            setCateData={setCateData}
          />
        )
      }
      {
        openEdit && (
          <ModalEditCate 
            open={openEdit} 
            handleOpen={handleOpenEdit}
            handleClose={handleCloseEdit}
            cateData={cateData}
            setCateData={setCateData}
            slcEdit={slcEdit}
          />
        )
      }
    </MainLayout>
  )
}

