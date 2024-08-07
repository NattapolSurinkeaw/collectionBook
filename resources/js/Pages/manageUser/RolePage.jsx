import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
import { useState, useEffect, useMemo } from 'react'
import PrimaryButton from '@/Components/PrimaryButton'
import { svGetCateBackOffice, svSaveChangeCate } from '@/services/user/user.services'
import Checkbox from '@/Components/Checkbox'
import Swal from 'sweetalert2';

export default function RolePage() {
  const [filterRole, setFilterRole] = useState(1);
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([])
  const [selectedIds, setSelectedIds] = useState([]);

  const handleRoleChange = (id) => {
    setFilterRole(id);
    const filtered = roles.filter((role) => role.id === id);
    if (filtered.length > 0) {
      const dataId = filtered[0].cate_id.split(',').map(Number);
      setSelectedIds(dataId);
      console.log(dataId);
    } else {
      setSelectedIds([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await svGetCateBackOffice();
      console.log(res);
      setRoles(res.data.data['role']);
      setCategories(res.data.data['cate']);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (roles.length > 0) {
      handleRoleChange(filterRole);
    }
  }, [roles, filterRole]);
  // useEffect(() => {
  //   handleRoleChange(filterRole)
  // }, [])

  // useEffect(() => {
  //   handleRoleChange(filterRole); // สามารถเปลี่ยน ID ได้ตามที่ต้องการ
  // }, []);

  useEffect(() => {
    console.log(selectedIds);
  }, [selectedIds])

  const handleCheckboxChange = (id) => {
    setSelectedIds(prevSelectedIds => {
        if (prevSelectedIds.includes(id)) {
            return prevSelectedIds.filter(item => item !== id);
        } else {
            return [...prevSelectedIds, id];
        }
    });
  };

  const submitChange = () => {
    console.log(filterRole);
    console.log(selectedIds);
    // ทำการส่ง selectedIds ไปยังเซิร์ฟเวอร์หรือทำการประมวลผลต่อไป
    const params = {
      "role_id" : filterRole,
      "cate_id" : selectedIds
    }
    svSaveChangeCate(params).then((res) => {
      console.log(res.data.status);
      if(res.data.status === 'success') {
        Swal.fire(
          'Save Change!',
          'Your change has save success.',
          'success'
        );
      }
    })
  };

  return (
    <MainLayout>
      <h1 className="mb-4 text-2xl">RolePage</h1>
      <div className="border rounded-md shadow-md">
        <div className="p-2">
          <PrimaryButton children="Create" />
        </div>
        <hr />
        <div className="py-2 px-10 flex gap-4">
          <ul className="border-r-4 p-4 flex flex-col gap-6 text-lg">
            {
              roles.map((role) => (
                <li
                  key={role.id}
                  onClick={() => handleRoleChange(role.id)} 
                  className={`${filterRole === role.id ? "border-b-2 border-blue-600 cursor-default" : "cursor-pointer"}`}
                  >
                    <span className="p-4">{role.role_name}</span>
                </li>
              ))
            }
          </ul>
          <div className="w-full flex flex-wrap gap-4 h-[600px] overflow-auto p-4">
            {
              categories.map((cate) => (
                <div key={cate.id} className="flex flex-col gap-2 border shadow-md w-[168px] h-[212px] rounded-md p-2">
                  <div className="flex justify-center">
                    <img src={`${(cate.cate_thumbnail)? cate.cate_thumbnail : '/image/emptyProfile.jpg'}`} className="border p-1 rounded-lg w-full h-20" alt="" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">{cate.cate_title}</h3>
                    <h3 className="w-full overflow-hidden">({cate.id})</h3>
                    <h3 className="">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(cate.id)} 
                        onChange={() => handleCheckboxChange(cate.id)} 
                      />
                    </h3>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <button 
          className="p-1 bg-blue-600 text-white rounded-md"
          onClick={submitChange}
        >บันทึก</button>
      </div>
    </MainLayout>
  )
}
