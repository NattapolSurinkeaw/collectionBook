import MainLayout from '@/Layouts/MainLayout'
import React, { useState } from 'react'
import { Link } from '@inertiajs/react';

export default function BillDetail(data) {
  const [bill, setBill] = useState((data.data)? data.data : null)
  const [showDisplay, setShowDisplay] = useState(true);
  const [dataBook, setDataBook] = useState([
    {
      "id": 1,
      "title_TH": "กกกก",
      "title_EN": null,
      "title_Another": null,
      "description": null,
      "lc_release_date": "2024-10-29",
      "thumbnail": null,
      "cate_id": "1",
      "writer_id": 1,
      "ilust_id": 1,
      "publish_id": 1,
      "volume_book": ",1,2,3",
      "created_at": "2024-10-29T03:26:54.000000Z",
      "updated_at": "2024-10-29T07:16:54.000000Z",
      "frontCover": "upload/2024/10/29/front_1730186214.png"
    },
    {
      "id": 2,
      "title_TH": "กกกก",
      "title_EN": null,
      "title_Another": null,
      "description": null,
      "lc_release_date": "2024-10-29",
      "thumbnail": null,
      "cate_id": "1",
      "writer_id": 1,
      "ilust_id": 1,
      "publish_id": 1,
      "volume_book": ",1,2,3",
      "created_at": "2024-10-29T03:26:54.000000Z",
      "updated_at": "2024-10-29T07:16:54.000000Z",
      "frontCover": "upload/2024/10/29/front_1730186214.png"
    }
  ])
  return (
    <MainLayout>
      <h2 className="text-2xl">BillDetail {bill.id}</h2>
      <div className="w-full mt-4 border">
        {/* <div className="flex gap-4">
          <button
          onClick={() => setShowDisplay(true)}
          className="bg-red-500 w-20 p-1 rounded-md text-[18px]"
          >
            bill
          </button>
          <button
          onClick={() => setShowDisplay(false)}
          className="bg-green-500 w-20 p-1 rounded-md text-[18px]"
          >
            manga
          </button>
        </div> */}
        { showDisplay ? (
          <>
            <div>
              <div className="p-4">
                <p>ข้อมูล bill</p>
                <div className="flex gap-4">
                  <div>
                    <p>รูปสลิป</p>
                    <img className="w-[250px] h-[300px]" src={`/${bill.image_slip}`} alt="" />
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
                      <p>ผู้ขาย</p>
                      <p>{bill.store_sell}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='border border-2'></div>
              <div className="p-4">
                <p>ข้อมูล manga</p>
                <div className="flex flex-wrap gap-4 p-4">
                  { dataBook.map((book) => (
                    <div
                      key={book.id} 
                      className="p-2 w-[270px] rounded-lg border shadow-md cursor-pointer"
                      // onClick={() => handleClick(book.id)}
                      >
                      <div className="w-[250px] h-[350px] mx-auto bg-red-300 relative">
                        <img className="w-full h-full" src={`/${book.frontCover}`} alt="" />
                        <div className='w-full absolute bottom-0 bg-gray-200'>
                          <p>nameTH : {book.title_TH}</p>
                          <p>nameEN : {book.title_EN}</p>
                          <p>nameAT : {book.title_Another}</p>
                        </div>
                      </div>
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
