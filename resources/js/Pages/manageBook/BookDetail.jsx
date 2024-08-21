import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
import { usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useEffect } from 'react';
import ModalAddVolume from './components/ModalAddVolume';
import { svGetVolumeBook } from '@/services/book/book.services';


export default function BookDetail({dataBook}) {
  // const { props } = usePage();
  // const bookId = props.id;
  const [open, setOpen] = useState(false);
  const [dataVolume, setDataVolume] = useState([]);
  const handleClose = () => setOpen(false);
  const [slcVolume, setSlcVolume] = useState([]);
  const [previewImage, setPreviewImage] = useState();

  useEffect(() => {
    // console.log()
    const param = {
      volume_id : dataBook.volume_book
    }
    // console.log(dataBook.volume_book);
    svGetVolumeBook(param).then((res) => {
      // console.log(res.data.data);
      setDataVolume(res.data.data);
    })
  }, [dataBook.volume_book]);

  const handleVol = (param) => {
    console.log(param);
    setSlcVolume(param)
  }

  const handlePreviewImage = (param) => {
    setPreviewImage(param)
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl">BookDetail {dataBook.title_TH}</h1>
        <PrimaryButton 
          children='Add Volume'
          onClick={() => setOpen(true)}
        />
        {
          open && (
            <ModalAddVolume 
              open={open} 
              handleClose={handleClose} 
              dataBook={dataBook}
            />
          )
        }
      </div>
      <hr />
      <div className="flex gap-4 my-4">
        <div className="flex flex-col gap-3">
          <img className="w-[350px] h-[450px]" src={`/${previewImage}`} alt="" />
          <div className='flex justify-center gap-2'>
            <img 
              className="w-[50px] h-[65px]" 
              src={`/${slcVolume.front_cover}`} alt="" 
              onClick={() => handlePreviewImage(slcVolume.front_cover)}
            />
            <img 
              className="w-[50px] h-[65px]" 
              src={`/${slcVolume.book_spine}`} alt="" 
              onClick={() => handlePreviewImage(slcVolume.book_spine)}
            />
            <img 
              className="w-[50px] h-[65px]" 
              src={`/${slcVolume.back_cover}`} alt="" 
              onClick={() => handlePreviewImage(slcVolume.back_cover)}
            />
          </div>

        </div>
        <div>
          <div className="flex gap-4">
            <p>volume</p>
            <div className="flex gap-4">
              {
                dataVolume.map((vol) => (
                  <button 
                    key={vol.id} className="w-14 bg-red-200"
                    onClick={() => handleVol(vol)}
                  >{vol.title_volumes}</button>
                ))
              }
              {/* <button className="w-10 bg-red-200">1</button>
              <button className="w-10 bg-red-200">1</button>
              <button className="w-10 bg-red-200">1</button>
              <button className="w-10 bg-red-200">1</button> */}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
