import MainLayout from '@/Layouts/MainLayout'
import { React, useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { svGetBillAll } from '@/services/bill/bill.services';
import ModalAddBill from './components/ModalAddBill';
import { svGetBookAndVol } from '@/services/book/book.services';
import ImageModal from '@/Components/ImageModal/ImageModal';

export default function Bill() {
  const handleShowImage = (image) => {
    ImageModal(image)
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'store_sell', headerName: 'ผู้ขาย', width: 150 },
    { 
      field: 'price', 
      headerName: 'ราคา', 
      width: 100,
      renderCell: (params) => {
        const formattedPrice = Number(params.value)?.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return <p>{formattedPrice}</p>;
      }
    },
    { field: 'quantity', headerName: 'จำนวน', width: 100 },
    { field: 'image_slip', 
      headerName: 'รูปสลิปการโอน', 
      width: 150,
      height: 150,
      renderCell: (params) => (
        <div className="w-full h-full flex justify-center">
          <img 
            onClick={() => handleShowImage('/'+params.row.image_slip)}
            className="h-full" src={`/${params.row.image_slip}`} alt="" 
            />
        </div>
      )
    },
    {
      field: 'created_at',
      headerName: 'วันที่ซื้อ',
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params); // แปลง string เป็น Date
        const day = date.getDate();
        const month = date.getMonth() + 1; // เดือนเริ่มจาก 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`; // จัดรูปแบบวันที่
      },
    },
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
  const [dataBookAll, setDataBookAll] = useState([]);

  useEffect(() => {
    svGetBillAll().then((res) => {
      // console.log(res.bill);
      setBillData(res.bill);
    })
    svGetBookAndVol().then((res) => {
      // console.log(res.book)
      setDataBookAll(res.book);
    })
  }, [])

  const totalPrice = billData.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
  const totalBooks = billData.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MainLayout>
      {/* <h2 className="text-2xl">Bill</h2> */}

      <div className='mb-4 bg-gradient-to-r from-white to-[#e9d5ff] p-4 flex justify-between gap-4 rounded-md shadow-[0_2px_8px_0_#63636333]'>
        <div className='w-[550px] flex gap-4'>
          <div className="text-center flex gap-2 flex-col bg-white rounded-md p-4">
            <p className="text-gray-500 text-xl">ราคาที่ซื้อทั้งหมด</p>
            <p className="text-2xl font-bold">{totalPrice.toLocaleString('en-US')}</p>
            <p className="text-gray-500 text-xl">บาท</p>
          </div>
          <div className="text-center flex gap-2 flex-col bg-white rounded-md p-4">
            <p className="text-gray-500 text-xl">จำนวนหนังสือ</p>
            <p className="text-2xl font-bold">{totalBooks}</p>
            <p className="text-gray-500 text-xl">เล่ม</p>
          </div>
        </div>

        <div className='w-full flex justify-between gap-4'>
          <div>
            
          </div>
          <div className='w-[200px]'>
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
                  dataBookAll={dataBookAll}
                  setBillData={setBillData}
                />
              )
            }
          </div>
        </div>
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
