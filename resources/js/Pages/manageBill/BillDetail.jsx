import MainLayout from '@/Layouts/MainLayout'
import React, { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react';
import ImageModal from '@/Components/ImageModal/ImageModal';

export default function BillDetail(data) {
  console.log(data)
  const [bill, setBill] = useState([])
  const [showDisplay, setShowDisplay] = useState(true);
  const [dataBook, setDataBook] = useState([])
  useEffect(() => {
    setBill((data.bill)? data.bill : null);
    setDataBook((data.bookItem)? data.bookItem : null);
  }, [])
  return (
    <MainLayout>
      <h2 className="text-2xl">BillDetail {bill.id}</h2>
      <div className="w-full mt-4 border">
        { showDisplay ? (
          <>
            <div>
              <div className="p-4">
                <p>ข้อมูล bill</p>
                <div className="flex gap-4 mt-4">
                  <div>
                    <p>รูปสลิป</p>
                    <img 
                      className="w-[250px] h-[300px]" src={`/${bill.image_slip}`} alt="" 
                      onClick={() => ImageModal('/' + bill.image_slip)}
                    />
                  </div>
                  <div>
                    <div className="flex gap-4">
                      <p>วันที่ซื้อ</p>
                      <p>{bill.created_at}</p>
                    </div>
                    <div className="flex gap-4">
                      <p>ผู้ขาย</p>
                      <p>{bill.store_sell}</p>
                    </div>
                    <div className="flex gap-4">
                      <p>ราคารวม : </p>
                      <p>{bill.price}</p>
                    </div>
                    {
                      bill.transport && (
                        <div className="">
                          <div>
                            <span className='mr-4'>ขนส่ง</span>
                            <span>{bill.transport}</span>
                          </div>
                          <div>
                            <span className='mr-4'>เลขพัสดุ</span>
                            <span>{bill.parcel_number}</span>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>

              <div className='border border-2'></div>
              <div className="p-4">
                <p>เล่มที่ซื้อ</p>
                <div className="flex flex-wrap gap-4 p-4">
                  { dataBook.map((book) => (
                    <div
                      key={book.id} 
                      className="p-2 w-[250px] rounded-lg border shadow-md cursor-pointer"
                      >
                      <a href={`/backoffice/bookdetail/${book.book_id}`} target='_blank'>
                        <div className="w-[230px] h-[330px] mx-auto bg-red-300 relative">
                          <img className="w-full h-full" src={`/${book.front_cover}`} alt="" />
                          <div className='w-full absolute bottom-0 bg-gray-200 opacity-80'>
                            <p>nameTH : {book.title_TH}</p>
                            <p>{book.title_volumes}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
          ) : 
          (
            <div>
              
            </div>
          )
        }
        
      </div>
    </MainLayout>
  )
}
