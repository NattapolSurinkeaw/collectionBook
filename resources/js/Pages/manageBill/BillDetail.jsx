import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
import { useState } from 'react'

export default function BillDetail(data) {

  const [bill, setBill] = useState((data.data)? data.data : null)
  const [showDisplay, setShowDisplay] = useState(true);
  console.log(bill)
  return (
    <MainLayout>
      <h2 className="text-2xl">BillDetail {bill.id}</h2>
      <div className="w-full mt-4 border">
        <button
        onClick={() => setShowDisplay(true)}
        className="bg-red-500"
        >
          bill
        </button>
        <button
        onClick={() => setShowDisplay(false)}
        className="bg-green-500"
        >
          manga
        </button>
        {
          showDisplay ? (
            <>
            <div>
          ข้อมูล bill
        </div>
            </>
          ) : 
          (
            <div>
            ข้อมูล manga
          </div>
          )
        }
        
      </div>
    </MainLayout>
  )
}
