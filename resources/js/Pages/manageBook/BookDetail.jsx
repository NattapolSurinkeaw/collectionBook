import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useEffect } from 'react';
import ModalAddVolume from './components/ModalAddVolume';
import { svGetVolumeBook } from '@/services/book/book.services';
import ImageModal from '@/Components/ImageModal/ImageModal';

export default function BookDetail({dataBook, userVolume}) {
  const [open, setOpen] = useState(false);
  const [dataVolume, setDataVolume] = useState([]);
  const handleClose = () => setOpen(false);
  const [slcVolume, setSlcVolume] = useState(null);
  const [previewImage, setPreviewImage] = useState();
  useEffect(() => {
    const param = {
      book_id : dataBook.id
    }

    svGetVolumeBook(param).then((res) => {
      if(res.status == 'success') {
        setDataVolume(res.volumes);
        setSlcVolume(res.volumes[0])
        setPreviewImage((res.volumes[0]) ? res.volumes[0].front_cover : 'image/no-image.png')
      }
    })
  }, []);

  const handleSlcVolume = (param) => {
    // console.log(param);
    setSlcVolume(param)
    setPreviewImage(param.front_cover)
  }

  const handlePreviewImage = (param) => {
    setPreviewImage(param)
  }

  const isOwned = (vol) => {
    return userVolume.some((uv) => uv.book_vol_id === vol.id)
  };

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
          <img 
            className="w-[350px] h-[450px]"
            src={`/${(previewImage) ? previewImage : ""}`} alt="" 
            onClick={() => ImageModal(`/${previewImage}`)}
          />
          <div className="flex justify-center gap-2">
            <img
              className="w-[50px] h-[65px] cursor-pointer"
              src={
                slcVolume?.front_cover
                  ? `/${slcVolume.front_cover}`
                  : '/image/no-image.png'
              }
              onClick={() =>
                handlePreviewImage(
                  slcVolume?.front_cover
                    ? `${slcVolume.front_cover}`
                    : 'image/no-image.png'
                )
              }
            />
            <img
              className="w-[50px] h-[65px] cursor-pointer"
              src={
                slcVolume?.book_spine
                  ? `/${slcVolume.book_spine}`
                  : '/image/no-image.png'
              }
              onClick={() =>
                handlePreviewImage(
                  slcVolume?.book_spine
                    ? `${slcVolume.book_spine}`
                    : 'image/no-image.png'
                )
              }
            />
            <img
              className="w-[50px] h-[65px] cursor-pointer"
              src={
                slcVolume?.back_cover
                  ? `/${slcVolume.back_cover}`
                  : '/image/no-image.png'
              }
              onClick={() =>
                handlePreviewImage(
                  slcVolume?.back_cover
                    ? `${slcVolume.back_cover}`
                    : 'image/no-image.png'
                )
              }
            />
          </div>
        </div>
        <div>
        <div>
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

          <div className="flex gap-2 mb-4">
            <p>volume : </p>
            <div className="flex gap-4">
              {
                dataVolume.map((vol) => (
                  <div key={vol.id} 
                    className={`relative ${isOwned(vol) ? 'border-4 border-green-500' : 'border'}`}
                    onClick={() => handleSlcVolume(vol)}
                  >
                    <img 
                      src={`/${vol.front_cover}`} 
                      className="w-28 h-40" 
                    />
                    <div className="absolute bottom-0 bg-gray-200 w-full opacity-70">
                      <p className='text-center'>{vol.title_volumes}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
