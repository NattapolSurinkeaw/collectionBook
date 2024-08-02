import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { useState, useEffect, useMemo } from 'react'
import { svGetUsers } from '@/services/user/user.services'

export default function UserPage() {
  const [filterRole, setFilterRole] = useState(0);
  const [role, setRole] = useState([]);
  const [users, setUser] = useState([]);
  const [usersFilter, setUserFilter] = useState([]); 

  const handleRoleChange = (id) => {
    setFilterRole(id);
  };

  useEffect(() => {
    svGetUsers().then((res) => {
      setUser(res.data.data['user'])
      setUserFilter(res.data.data['user'])
      setRole(res.data.data['role'])
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
            {
              role.map((role) => (
                <li
                  key={role.id}
                  onClick={() => handleRoleChange(role.id)} 
                  className={`${filterRole === role.id ? "border-b-2 border-blue-600" : ""}`}
                  >
                    <span className="p-4">{role.role_name}</span>
                </li>
              ))
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
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
