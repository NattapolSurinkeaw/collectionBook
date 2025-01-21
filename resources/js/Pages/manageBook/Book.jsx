import React, { useState, useEffect } from 'react'
import MainLayout from '@/Layouts/MainLayout'
import { Link } from '@inertiajs/react';
import { svGetBookAll } from '@/services/book/book.services';
import { svGetCategories } from '@/services/author_publisher_illust/categorybook.service';
import { svGetIllustrator } from '@/services/author_publisher_illust/illust.service';
import { svGetAuthor } from '@/services/author_publisher_illust/author.service';
import { svGetPublisher } from '@/services/author_publisher_illust/publisher.service';
import PrimaryButton from '@/Components/PrimaryButton';
import ModalAddBook from './components/ModalAddBook';
import { Input } from '@mui/material';

export default function Book() {
  const [dataBook, setDataBook] = useState([])
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [dataAuthor, setDataAuthor] = useState([]);
  const [dataIllustrator, setDataIllustrator] = useState([]);
  const [dataPublisher, setDataPublisher] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    svGetBookAll().then((res) => {
      setDataBook(res.book)
    })
    svGetIllustrator().then((res) => {
      setDataIllustrator(res.illust)
    })
    svGetAuthor().then((res) => {
      setDataAuthor(res.author)
    })
    svGetPublisher().then((res) => {
      setDataPublisher(res.publisher)
    })
    svGetCategories().then((res) => {
      setDataCategory(res.catebook)
    })
  }, [])

  // useEffect(() => {
  //   console.log(dataBook)
  // }, [dataBook])

  const filteredBooks = dataBook.filter(
    (book) =>
      (book.title_TH?.toLowerCase() || "").includes(inputSearch.toLowerCase()) ||
      (book.title_EN?.toLowerCase() || "").includes(inputSearch.toLowerCase()) ||
      (book.title_Another?.toLowerCase() || "").includes(inputSearch.toLowerCase())
  );
  
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
          <PrimaryButton 
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
          }
        </div>
      </div>
      <hr />
      <div id="box-container" className="py-4 flex flex-wrap gap-4">
        { filteredBooks.map((book) => (
          <Link href={`/backoffice/bookdetail/${book.id}`}
            key={book.id} 
            className="p-2 w-[270px] rounded-lg border shadow-md cursor-pointer"
            >
            <div className="w-[250px] h-[350px] mx-auto bg-red-300">
              <img className="w-full h-full" src={`/${(book.thumbnail) ? book.thumbnail : 'image/no-image.png'}`} alt="" />
            </div>
            <div>
              <p>nameTH : {book.title_TH}</p>
              <p>nameEN : {book.title_EN}</p>
              <p>nameAT : {book.title_Another}</p>
            </div>
          </Link>
        ))}
      </div>
    </MainLayout>
  )
}
