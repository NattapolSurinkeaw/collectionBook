import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
import PrimaryButton from '@/Components/PrimaryButton'

export default function UserPage({auth}) {
  return (
    <MainLayout auth={auth}>
      <h1 className="mb-4">Manage Users</h1>
      <div className="bg-gray-100 rounded-md shadow-md">
        <div className="p-2">
          <PrimaryButton children="fetch" />
        </div>
        <hr />
        <div className="py-2 px-10 flex gap-4">
          <ul className="border-r-4 px-4">
            <li className="p-4">All</li>
            <li className="p-4">Superadmin</li>
            <li className="p-4">admin</li>
            <li className="p-4">user</li>
          </ul>
          <div className="w-full bg-pink-100 flex flex-wrap gap-4 h-[600px] overflow-auto p-4">
            <div className="bg-green-200 w-[240px] h-[300px] rounded-md p-2">
              <div className="flex justify-center">
                <img src="/upload/profile/2024/07/26/1721965220.jpg" className="rounded-full w-20 h-20" alt="" />
              </div>
              <div className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit saepe cupiditate adipisci praesentium, nesciunt quis consequuntur? Nostrum doloribus fugit nisi velit quibusdam fugiat quas harum deserunt, nesciunt sint quos porro.
              </div>
            </div>
            <div className="bg-green-200 w-[240px] h-[300px] rounded-md">
              2
            </div>
            <div className="bg-green-200 w-[240px] h-[300px] rounded-md">
              2
            </div>
            <div className="bg-green-200 w-[240px] h-[300px] rounded-md">
              2
            </div>
            <div className="bg-green-200 w-[240px] h-[300px] rounded-md">
              2
            </div>
            <div className="bg-green-200 w-[240px] h-[300px] rounded-md">
              2
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
