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
    const param = {
      volume_id : dataBook.volume_book
    }

    svGetVolumeBook(param).then((res) => {
      // console.log(res.data.data[0].front_cover);
      setDataVolume(res.data.data);
      setSlcVolume(res.data.data[0])
      setPreviewImage(res.data.data[0].front_cover)
    })
  }, [dataBook.volume_book]);

  // useEffect(() => {
  //   console.log(dataVolume)
  // }, [dataVolume])

  const handleSlcVolume = (param) => {
    // console.log(param);
    setSlcVolume(param)
    setPreviewImage(param.front_cover)
  }

  const handlePreviewImage = (param) => {
    setPreviewImage(param)
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl">BookDetail {dataBook.id}</h1>
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
              setDataVolume={setDataVolume}
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
          <div className="flex gap-2 mb-4">
            <p>volume : </p>
            <div className="flex gap-4">
              {
                dataVolume.map((vol) => (
                  <div key={vol.id} 
                    className='relative border'
                    onClick={() => handleSlcVolume(vol)}
                  >
                    <img 
                      src={`/${vol.front_cover}`} 
                      className="w-20 h-24" 
                    />
                    <div className="absolute bottom-0 bg-gray-200 w-full">
                      <p className='text-center'>{vol.title_volumes}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <p>title_TH : </p>
            <div className="flex gap-4">
              {dataBook.title_TH}
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <p>title_TH : </p>
            <div className="flex gap-4">
              {dataBook.title_EN}
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <p>title_TH : </p>
            <div className="flex gap-4">
              {dataBook.title_Another}
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <p>Description : </p>
            <div className="flex gap-4">
              {dataBook.description}
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <p>ilustrator : </p>
            <div className="flex gap-4">
              {dataBook.ilust_id}
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <p>publisher : </p>
            <div className="flex gap-4">
              {dataBook.publis_id}
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <p>Category : </p>
            <div className="flex gap-4">
              {dataBook.cate_id}
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <p>Publish_LC_Release : </p>
            <div className="flex gap-4">
              {dataBook.lc_release_date}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
