import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
import { usePage } from '@inertiajs/react';

export default function BookDetail({id}) {
  // const { props } = usePage();
  // const bookId = props.id;
  return (
    <MainLayout>
      BookDetail {id}
    </MainLayout>
  )
}
