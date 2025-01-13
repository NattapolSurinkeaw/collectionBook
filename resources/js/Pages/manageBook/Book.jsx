import React, { useState, useEffect } from 'react'
import MainLayout from '@/Layouts/MainLayout'
// import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import { svGetBookAll, svGetCategories } from '@/services/book/book.services';
import { svGetIllustrator } from '@/services/author_publisher_illust/illust.service';
import { svGetAuthor } from '@/services/author_publisher_illust/author.service';
import { svGetPublisher } from '@/services/author_publisher_illust/publisher.service';
import PrimaryButton from '@/Components/PrimaryButton';
import ModalAddBook from './components/ModalAddBook';

export default function Book() {
  const [dataBook, setDataBook] = useState([])
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [dataAuthor, setDataAuthor] = useState([]);
  const [dataIllustrator, setDataIllustrator] = useState([]);
  const [dataPublisher, setDataPublisher] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    svGetBookAll().then((res) => {
      // console.log(res)
      setDataBook(res.book)
    })
    svGetIllustrator().then((res) => {
          // console.log(res)
      setDataIllustrator(res.illust)
    })
    svGetAuthor().then((res) => {
      // console.log(res)      
      setDataAuthor(res.author)
    })
    svGetPublisher().then((res) => {
      setDataPublisher(res.publisher)
    })
    svGetCategories().then((res) => {
      // console.log(res)
      setDataCategory(res.data.data)
    })
  }, [])
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl">Book</h1>
        <PrimaryButton 
          children="create" 
          onClick={() => setOpen(true)}
        />
        <ModalAddBook 
          open={open}
          handleClose={handleClose}
          dataAuthor={dataAuthor}
          dataIllustrator={dataIllustrator}
          dataPublisher={dataPublisher}
          dataCategory={dataCategory}
        /> 
      </div>
      <hr />
      <div id="box-container" className="py-4 flex flex-wrap gap-4">
        { dataBook.map((book) => (
          <Link href={`/backoffice/bookdetail/${book.id}`}
            key={book.id} 
            className="p-2 w-[270px] rounded-lg border shadow-md cursor-pointer"
            // onClick={() => handleClick(book.id)}
            >
            <div className="w-[250px] h-[350px] mx-auto bg-red-300">
              <img className="w-full h-full" src={`/${book.frontCover}`} alt="" />
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
