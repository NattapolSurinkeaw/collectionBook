import React, { useState, useEffect } from 'react'
import MainLayout from '@/Layouts/MainLayout'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ModalAddCateBook from './components/ModalAddCateBook';
import ModalEditCateBook from './components/ModalEditCateBook';
import { svGetCategories, svDeleteCateBook } from '@/services/author_publisher_illust/categorybook.service';
import ImageModal from '@/Components/ImageModal/ImageModal';

export default function CategoryBook() {
  const [cateBook, setCateBook] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [slcCateBook, setSlcCateBook] = useState([]);

  const handleClose = () => setOpenAddModal(false);
  const handleCloseEdit = () => setOpenEditModal(false);

  useEffect(() => {
    svGetCategories().then((res) => {
      console.log(res);
      setCateBook(res.catebook)
    })
  }, [])

  const handleEditModal = (cate) => {
    setSlcCateBook(cate);
    setOpenEditModal(true);
  }

  const handleDelete = (id) => {
    svDeleteCateBook(id).then((res) => {
      if(res.status == 'success') {
        alert('ลบสำเร็จ');
      }
    })
  }

  return (
    <MainLayout>
      <div className="flex justify-between">
        <h1 className="text-xl mb-4">CategoryBook</h1>
        <button className="p-2 bg-blue-500 text-white rounded-md" onClick={() => setOpenAddModal(!openAddModal)}>create</button>
      </div>

      <div className="border-b-2 flex justify-between">
        <ul className="flex">
          <li className="bg-gray-200 p-2 rounded-tl-md" onClick={() => setFillter(1)}>menu</li>
          <li className="bg-gray-200 p-2 rounded-tr-md" onClick={() => setFillter(2)}>menu</li>
        </ul>
      </div>
      <div className="p-4 border h-[85%] overflow-auto grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 gap-4">
        {cateBook.map((cate) => (
          <div key={cate.id} className="flex flex-col justify-between h-[320px] p-4 border bg-[#f8f9fa] rounded-sm">
            <div className="flex flex-col gap-2 mb-4">
              <div className='w-full flex justify-center'>
                <figure className="w-[150px] h-[122px] border p-1 hover:scale-[0.95] duration-300 cursor-pointer">
                  <img 
                    className="w-full h-full rounded-sm" 
                    src={`${(cate.thumbnail) ? '/'+cate.thumbnail : '/image/no-image.png'}`} 
                    alt="" 
                    onClick={() => ImageModal(`${(cate.thumbnail) ? '/'+cate.thumbnail : '/image/no-image.png'}`)}
                  />
                </figure>
              </div>
              <div>
                <p className='text-xl'>
                  <span className="text-red-500">[{cate.id}]</span>
                  <span> {cate.title_cate}</span>
                </p>
                {
                  cate.description_cate && (
                    <p>{cate.description_cate}</p>
                  )
                }
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
            <div className="flex justify-center gap-6">
              <button 
                className="w-[70px] bg-yellow-500 text-white p-2 rounded-lg"
                onClick={() => handleEditModal(cate)}
              >แก้ไข</button>
              <button 
                className="w-[70px] bg-red-500 text-white p-2 rounded-lg"
                onClick={() => handleDelete(cate.id)}
              >ลบ</button>
            </div>
          </div>
        ))}
      </div>

      {
        openAddModal && (
          <ModalAddCateBook
            open={openAddModal}
            handleClose={handleClose}
            setCateBook={setCateBook}
          />
        )
      }

      {
        openEditModal && (
          <ModalEditCateBook
            open={openEditModal}
            handleClose={handleCloseEdit}
            slcCateBook={slcCateBook}
          /> 
        )
      }
    </MainLayout>
  )
}
