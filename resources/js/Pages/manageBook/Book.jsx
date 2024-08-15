import React, { useState } from 'react'
import MainLayout from '@/Layouts/MainLayout'
// import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';


export default function Book() {
  const [dataBook, setDataBook] = useState([
    {
      "id" : 1,
      "title_TH" : "คุณชายวิปริตกับเมดสาวรอบจัด คุณชายวิปริตกับเมดสาวรอบจัด",
      "title_EN" : "Shinigami Bocchan to Kuro Maid",
      "title_Another" : "fdf",
      "thumbnail" : "https://pbs.twimg.com/media/E5MJQ2TVcAENAnw.jpg",
    },
    {
      "id" : 2,
      "title_TH" : "คุณชายวิปริตกับเมดสาวรอบจัด คุณชายวิปริตกับเมดสาวรอบจัด",
      "title_EN" : "Shinigami Bocchan to Kuro Maid",
      "title_Another" : "",
      "thumbnail" : "https://pbs.twimg.com/media/E5MJQ2TVcAENAnw.jpg",
    },
  ])

  const handleClick = (bookId) => {
    Inertia.visit(`/backoffice/bookdetail`);
  };

  return (
    <MainLayout>
      <h1>Book</h1>
      <hr />
      <div id="box-container" className="py-4 flex flex-wrap gap-4">
        { dataBook.map((book) => (
          <Link href={`/backoffice/bookdetail/${book.id}`}
            key={book.id} 
            className="p-2 w-[270px] rounded-lg border shadow-md cursor-pointer"
            // onClick={() => handleClick(book.id)}
            >
            <div className="w-[250px] h-[350px] mx-auto bg-red-300">
              <img className="w-full h-full" src={book.thumbnail} alt="" />
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
