import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import { useState, useEffect } from 'react'

export default function UserPage({auth}) {
  const [filterRole, setFilterRole] = useState(0);
  const [rolemock, setRolemock] = useState([
    {
      id: 1,
      title : "Superadmin"
    },
    {
      id: 2,
      title : "Admin"
    },
    {
      id: 3,
      title : "User"
    },
  ]);
  const [users, setUser] = useState([
    {
      id : 1,
      name : "nattaphol",
      email : "nattapol.surinkeaw@gmail.com",
      role : 1
    },
    {
      id : 2,
      name : "surinkeaw",
      email : "nattapol.surinkeaw@gmail.com",
      role : 2
    },
    {
      id : 3,
      name : "surinkeaw",
      email : "nattapol.surinkeaw@gmail.com",
      role : 3
    },
    {
      id : 4,
      name : "surinkeaw",
      email : "nattapol.surinkeaw@gmail.com",
      role : 3
    },
    {
      id : 5,
      name : "surinkeaw",
      email : "nattapol.surinkeaw@gmail.com",
      role : 3
    },
    {
      id : 6,
      name : "surinkeaw",
      email : "nattapol.surinkeaw@gmail.com",
      role : 3
    },
    {
      id : 7,
      name : "surinkeaw",
      email : "nattapol.surinkeaw@gmail.com",
      role : 3
    },
    {
      id : 8,
      name : "surinkeaw",
      email : "nattapol.surinkeaw@gmail.com",
      role : 3
    }
  ]);

  useEffect(() => {
    const filterUser = (users) => {
      return users.filter(user => user.role === filterRole);
    };
    
    // เรียกใช้ filterUser และตั้งค่า setUser
    setUser(filterUser(users));
  }, [filterRole])

  return (
    <MainLayout auth={auth}>
      <h1 className="mb-4">Manage Users {filterRole}</h1>
      <div className="border rounded-md shadow-md">
        <div className="p-2">
          <PrimaryButton children="fetch" />
        </div>
        <hr />
        <div className="py-2 px-10 flex gap-4">
          <ul className="border-r-4 p-4 flex flex-col gap-6 text-lg">
          <li
            onClick={() => setFilterRole(0)}
            className={`${filterRole === 0 ? "border-b-2 border-blue-600" : ""}`}
          >
            <span className="p-4">All</span>
          </li>
            {
              rolemock.map((role) => (
                <li
                  onClick={() => setFilterRole(role.id)} 
                  className={`${filterRole === role.id ? "border-b-2 border-blue-600" : ""}`}
                  >
                    <span className="p-4">{role.title}</span>
                </li>
              ))
            }
          </ul>
          <div className="w-full flex flex-wrap gap-4 h-[600px] overflow-auto p-4">
            {
              users.map((user) => (
                <div key={user.id} className="flex flex-col gap-2 border shadow-md w-[168px] h-[212px] rounded-md p-2 hover:scale-95 duration-200">
                  <div className="flex justify-center">
                    <img src="/upload/profile/2024/07/26/1721965220.jpg" className="border p-1 rounded-full w-20 h-20" alt="" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">{user.name}</h3>
                    <h3 className="w-full overflow-hidden">({user.email})</h3>
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
