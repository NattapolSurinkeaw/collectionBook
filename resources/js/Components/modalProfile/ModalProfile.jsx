import React from 'react'
import { Link } from '@inertiajs/react'
import { handleLogOut } from '@/services/profile/profile.services'

export default function ModalProfile({modalProfile, auth}) {
  const logOut = () => {
    handleLogOut()
  }
  return (
    <>
      <div className={`bg-white absolute top-[50px] right-0 w-[250px] h-auto border rounded-md p-4 ${modalProfile ? 'scale-1' : 'scale-0'} duration-300`}>
        <p>emale : {auth?.user.name}</p>
        
        <p className="w-24 p-1 bg-blue-500 text-white text-center rounded-md">{auth?.user.role_name}</p>
        <div className="flex gap-4 mt-2">
          <Link href={"/backoffice/profile"} className="bg-blue-500 text-white p-1 rounded-md">ตั้งค่าโปรไฟล์</Link>
          <button 
            className="bg-red-500 text-white p-1 rounded-md"
            onClick={() => logOut()}
          >ออกจากระบบ</button>
        </div>
      </div>
    </>
  )
}

