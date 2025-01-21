import React, {useState, useEffect} from 'react'
import MainLayout from '@/Layouts/MainLayout'
import { Input } from '@mui/material';
import PrimaryButton from '@/Components/PrimaryButton';
import ModalAddBook from '../manageBook/components/ModalAddBook';
import { Link } from '@inertiajs/react';



export default function FavoritePage() {
  const [open, setOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  const handleClose = () => setOpen(false);
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl">Book</h1>
        
        <div>
          <Input
            onChange={(e) => setInputSearch(e.target.value)}
            className="mr-4"
            placeholder="ค้นหาชื่อเรื่อง"
            variant="soft"
            sx={{
              '--Input-radius': '0px',
              borderBottom: '2px solid',
              borderColor: 'neutral.outlinedBorder',
              '&:hover': {
                borderColor: 'neutral.outlinedHoverBorder',
              },
              '&::before': {
                border: '1px solid var(--Input-focusedHighlight)',
                transform: 'scaleX(0)',
                left: 0,
                right: 0,
                bottom: '-2px',
                top: 'unset',
                transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                borderRadius: 0,
              },
              '&:focus-within::before': {
                transform: 'scaleX(1)',
              },
            }}
          />
          {/* <PrimaryButton 
            children="create" 
            onClick={() => setOpen(true)}
          />
          {
            open && (
              <ModalAddBook 
                open={open}
                handleClose={handleClose}
                dataAuthor={dataAuthor}
                dataIllustrator={dataIllustrator}
                dataPublisher={dataPublisher}
                dataCategory={dataCategory}
                setDataBook={setDataBook}
              /> 
            )
          } */}
        </div>
      </div>
      <hr />
      <div id="box-container" className="py-4 flex flex-wrap gap-4">
          <Link href={`/backoffice/bookdetail/1`}
            // key="1"
            className="p-2 w-[270px] rounded-lg border shadow-md cursor-pointer"
            >
            <div className="w-[250px] h-[350px] mx-auto bg-red-300">
              <img className="w-full h-full" src={`/image/no-image.png`} alt="" />
            </div>
            <div>
              <p>nameTH : tess</p>
              <p>nameEN : tess</p>
              <p>nameAT : tess</p>
            </div>
          </Link>
      </div>
    </MainLayout>
  )
}
