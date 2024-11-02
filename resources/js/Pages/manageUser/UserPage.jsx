import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { useState, useEffect, useMemo } from 'react'
import { svGetUsers } from '@/services/user/user.services'
import ModalEditUser from './components/ModalEditUser'

export default function UserPage({auth}) {
  const [filterRole, setFilterRole] = useState(0);
  const [role, setRole] = useState([]);
  const [users, setUser] = useState([]);
  const [usersFilter, setUserFilter] = useState([]); 
  const [userSelect, setUserSelect] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleRoleChange = (id) => {
    setFilterRole(id);
  };

  useEffect(() => {
    svGetUsers().then((res) => {
      setUser(res.user)
      setUserFilter(res.user)
      setRole(res.roles)
    })
  }, [])

  useEffect(() => {
    if (filterRole === 0) {
      setUserFilter(users);
    } else {
      setUserFilter(users.filter(user => user.role_id === filterRole));
    }
  }, [filterRole, users]);

  // แปลง role_id เป็น ชื่อ role_name
  const showRoleUser = (id) => {
    const roleFound = role.find(r => r.id === id);
    return roleFound ? roleFound.role_name : 'Role not found';
  }

  const handleEditUser = (id) => {
    console.log(id)
    setUserSelect(users.filter(user => user.id === id))
    setOpenEdit(true)
  }

  // useEffect(() => {
  //   console.log(userSelect)
  // }, [userSelect])

  return (
    <MainLayout>
      <h1 className="mb-4 text-2xl">Manage Users</h1>
      <div className="border rounded-md shadow-md">
        <div className="p-2">
          <PrimaryButton children="fetch" />
        </div>
        <hr />
        <div className="py-2 px-10 flex gap-4">
          <ul className="border-r-4 p-4 flex flex-col gap-6 text-lg">
          <li
            onClick={() => handleRoleChange(0)}
            className={`${filterRole === 0 ? "border-b-2 border-blue-600" : ""}`}
          >
            <span className="p-4">All</span>
          </li>
            { role.length === 0 ? (
              <>
                <div role='status' class='max-w-sm animate-pulse'>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-8"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-8"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                </div>
              </>
            ) : (
              role.map((role) => (
                <li
                  key={role.id}
                  onClick={() => handleRoleChange(role.id)} 
                  className={`${filterRole === role.id ? "border-b-2 border-blue-600" : ""}`}
                  >
                    <span className="p-4">{role.role_name}</span>
                </li>
              )))
            }
          </ul>
          <div className="w-full flex flex-wrap gap-4 h-[600px] overflow-auto p-4">
            {
              usersFilter.map((user) => (
                <div key={user.id} className="flex flex-col gap-2 border shadow-md w-[168px] h-[212px] rounded-md p-2 hover:scale-95 duration-200">
                  <div className="flex justify-center">
                    <img src={`/${(user.profile_img)? user.profile_img : 'image/emptyProfile.jpg'}`} className="border p-1 rounded-full w-20 h-20" alt="" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">{user.name}</h3>
                    <h3 className="w-full overflow-hidden">({user.email})</h3>
                    <h3 className="">({showRoleUser(user.role_id)})</h3>
                    <div className="flex justify-center gap-2"> 
                      <button 
                        onClick={() => handleEditUser(user.id)}
                        className="bg-blue-500 text-white w-14 rounded-md">แก้ไข</button>
                      <button className="bg-pink-500 text-white w-14 rounded-md">ลบ</button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          {
            openEdit && (
              <ModalEditUser 
              open={openEdit} 
              handleClose={handleCloseEdit}
              roleData={role}
              userSelect={userSelect}
              />
            )
          }
        </div>
      </div>
    </MainLayout>
  )
}
