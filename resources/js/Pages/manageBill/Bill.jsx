import MainLayout from '@/Layouts/MainLayout'
import { React, useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { svGetBillAll } from '@/services/bill/bill.services';
import ModalAddBill from './components/ModalAddBill';

export default function Bill() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'store_sell', headerName: 'ผู้ขาย', width: 150 },
    { field: 'price', headerName: 'ราคา', width: 100 },
    { field: 'quantity', headerName: 'จำนวน', width: 100 },
    { field: 'transport', headerName: 'ขนส่ง', width: 100 },
    { field: 'parcel_number', headerName: 'หมายเลขพัสดุ', width: 150 },
    { field: 'created_at', headerName: 'วันที่ซื้อ', width: 150 },
    {
      field: 'details',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Link
          href={`/backoffice/billdetail/${params.row.id}`}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            margin: '5px 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: "40px",
            cursor: 'pointer',
            borderRadius: '5px'
          }}
        >
          ดูรายละเอียด
        </Link>
      ),
    },
  ];

  const [billData, setBillData] = useState([])
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    svGetBillAll().then((res) => {
      // console.log(res.bill);
      setBillData(res.bill);
    })
  }, [])

  const totalPrice = billData.reduce((sum, item) => sum + item.price, 0);
  const totalBooks = billData.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MainLayout>
      <h2 className="text-2xl">Bill</h2>

      <div className='mb-4 bg-gradient-to-r from-white to-[#e9d5ff] p-4 flex justify-around rounded-md shadow-[0_2px_8px_0_#63636333]'>
        <div className="text-center flex gap-2 flex-col bg-white rounded-md p-4">
          <p className="text-gray-500 text-xl">ราคาที่ซื้อทั้งหมด</p>
          <p className="text-2xl font-bold">{totalPrice}</p>
          <p className="text-gray-500 text-xl">บาท</p>
        </div>
        <div className="text-center flex gap-2 flex-col bg-white rounded-md p-4">
          <p className="text-gray-500 text-xl">จำนวนหนังสือ</p>
          <p className="text-2xl font-bold">{totalBooks}</p>
          <p className="text-gray-500 text-xl">เล่ม</p>
        </div>
      </div>
      {/* filter /วันที่/ปี/สำนักพิม/ */}
      <div className="p-4 flex justify-between gap-4">
        <div>
          filter
        </div>

        <div 
          className="bg-green-500 text-white p-1 rounded cursor-pointer"
          onClick={() => setOpen(true)}
        >
          create
        </div>
        {
          open && (
            <ModalAddBill 
              open={open}  
              handleClose={handleClose}
            />
          )
        }
      </div>

      {/* data grid */}
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={billData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
        />
      </div>
    </MainLayout>
  )
}
