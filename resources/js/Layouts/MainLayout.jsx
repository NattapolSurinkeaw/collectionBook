import React from 'react'
import { Link } from '@inertiajs/react'
import { useState } from 'react';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import GradeIcon from '@mui/icons-material/Grade';
import { menuData } from '@/services/menu/menu.services';
import ModalProfile from '@/Components/modalProfile/ModalProfile';
import MenuIcon from '@mui/icons-material/Menu';

export default function MainLayout({ children, auth }) {
    // console.log(menuData)
    const [showList, setShowList] = useState(false);
    const [modalProfile, setModalProfile] = useState(false);
    const [handleNav, setHandleNav] = useState(true);
  return (
    <div className="bg-[#f5f4f9] flex gap-5 h-screen">
        <div className={`bg-white ${handleNav ? 'w-[290px]': 'w-[0px]'} overflow-hidden duration-300 shadow-lg`}>
            <div className="m-4 border bg-gray-300">
                <h1 className="py-6 text-2xl font-bold text-green-500 text-center">PHP ADMIN </h1>
            </div>
            <div className="">
                {
                    menuData.map((menu) => (
                        <div key={menu.id} className="flex flex-col gap-2 mb-4">
                            <div className="flex gap-2 text-[#bcbfc1]">
                                <div className="">=</div>
                                <p className="">{menu.main_menu}</p>
                            </div>
                            {/* main menu  */}
                            { 
                                menu.sub_menu?.map((submenu) => (
                                submenu.status_display && (
                                    <div key={submenu.id}>
                                    <div className="px-4">
                                        <Link href={submenu.link} className="flex items-center px-2 gap-2 h-[40px] hover:bg-[#e7e7ff] rounded-[10px] text-[#adacfb] font-bold">
                                        {submenu.icon} {submenu.name}
                                        {submenu.menu_list?.length > 0 && <KeyboardArrowRightIcon className="ml-auto" />}
                                        </Link>
                                    </div>
                                    {/* sub menu  */}
                                    {submenu.menu_list?.length > 0 && (
                                        <ul className="flex flex-col gap-1 pl-10">
                                        {/* list sub menu  */}
                                        {/* {submenu.menu_list.map((list) => (
                                            <li key={list.id} className="flex gap-1 pl-4">
                                            <GradeIcon /> {list.list_name}
                                            </li>
                                        ))} */}
                                        </ul>
                                    )}
                                    </div>
                                )
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
        {/* <div className="w-10/12 max-md:w-[90%] mt-2 flex flex-col gap-5"> */}
        <div className="w-full mr-5 mt-2 flex flex-col gap-5">
            <div className="bg-white h-[65px] rounded-[10px] px-4 flex justify-between items-center shadow-lg">
                <div>
                    <button onClick={() => setHandleNav(!handleNav)}>
                        <MenuIcon />
                    </button>
                </div>
                <div className="flex gap-2 items-center relative">
                    <p>{auth?.user.name}</p>
                    <ModalProfile modalProfile={modalProfile} auth={auth} />
                    <img src={`/${(auth?.user.profile_img)?auth?.user.profile_img : "image/emptyProfile.jpg"}`} className='w-10 h-10 rounded-full cursor-pointer' alt="" onClick={() => setModalProfile(!modalProfile)} />
                </div>
            </div>
            <div className="p-4 bg-white rounded-[10px] shadow-lg h-screen overflow-auto">
                {children}
            </div>
        </div>
    </div>
  )
}
