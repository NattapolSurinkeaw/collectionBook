import React from 'react'
import MainLayout from '@/Layouts/MainLayout'

export default function UserPage({auth}) {
  return (
    <MainLayout auth={auth}>
      <h1 className="mb-4">Manage Users</h1>
    </MainLayout>
  )
}
