import React, {useState, useEffect} from 'react'
import MainLayout from '@/Layouts/MainLayout'
import { svGetAuthor, svDeleteAuthor } from '@/services/author_publisher_illust/author.service';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ModalAddAuthor from './components/ModalAddAuthor';
import ModalEditAuthor from './components/ModalEditAuthor';

export default function AuthorPage() {
  const [authorData, setAuthorData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [slcAuthorId, setSlcAuthorId] = useState();

  useEffect(()=> {
    svGetAuthor().then((res) => {
      setAuthorData(res.author)
    })
  }, [])

  const handleClose = () => setOpenModal(false);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleEditModal = (author) => {
    setSlcAuthorId(author);
    setOpenEdit(!openEdit);
  }

  const handleDeleteCate = (id) => {
    svDeleteAuthor(id).then((res) => {
      if(res.status == 'success') {
        alert("ลบสำเร็จ");
      }
    })
  }
  return (
    <MainLayout>
      <div className="flex justify-between">
        <h1 className="text-xl mb-4">AuthorPage</h1>
        <button className="p-2 bg-blue-500 text-white rounded-md" onClick={() => setOpenModal(!openModal)}>create</button>
      </div>

      <div className="border-b-2 flex justify-between">
        <ul className="flex">
          <li className="bg-gray-200 p-2 rounded-tl-md" onClick={() => setFillter(1)}>menu</li>
          <li className="bg-gray-200 p-2 rounded-tr-md" onClick={() => setFillter(2)}>menu</li>
        </ul>
      </div>
      <div className="p-4 border h-[85%] overflow-auto grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 gap-4">
        {authorData.map((author) => (
          <div key={author.id} className="flex flex-col justify-between h-[320px] p-4 border bg-[#f8f9fa] rounded-sm">
            <div className="flex flex-col gap-2 mb-4">
              <div className='w-full flex justify-center'>
                <figure className="w-[150px] h-[122px] border p-1 hover:scale-[0.95] duration-300 cursor-pointer">
                  <img className="w-full h-full rounded-sm" src={`${(author.cate_thumbnail) ? author.cate_thumbnail : '/image/no-image.png'}`} alt="" />
                </figure>
              </div>
              <div>
                <p className='text-xl'>
                  <span className="text-red-500">[{author.id}]</span>
                  <span> {author.author_name}</span>
                </p>
                {
                  author.another_name && (
                    <p>{author.another_name}</p>
                  )
                }
                <p className="text-slate-400 text-sm">priority {author.cate_priority}</p>
                <p>
                  {
                    author.status_display ? (
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
                onClick={() => handleEditModal(author)}
              >แก้ไข</button>
              <button 
                className="w-[70px] bg-red-500 text-white p-2 rounded-lg"
                onClick={() => handleDeleteCate(author.id)}
              >ลบ</button>
            </div>
          </div>
        ))}
      </div>

      {
        openModal && (
          <ModalAddAuthor 
            open={openModal} 
            handleClose={handleClose}
            setAuthorData={setAuthorData}
          />
        )
      }
      {
        openEdit && (
          <ModalEditAuthor 
            open={openEdit} 
            handleClose={handleCloseEdit}
            authorData={slcAuthorId}
          />
        )
      }
    </MainLayout>
  )
}
