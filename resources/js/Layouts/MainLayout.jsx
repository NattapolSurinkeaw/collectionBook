import React from 'react'
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import GradeIcon from '@mui/icons-material/Grade';
import { menuData, svChangeMode } from '@/services/menu/menu.services';
import ModalProfile from '@/Components/modalProfile/ModalProfile';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DarkMode from '@/Components/darkMode/DarkMode';

export default function MainLayout({ children }) {
    const { auth, categories } = usePage().props;
    // console.log(categories)
    const [modalProfile, setModalProfile] = useState(false);
    const [handleNav, setHandleNav] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const htmlElement = document.querySelector('html');

    useEffect(() => {
        setDarkMode(auth.user.dark_mode);
    }, [auth.user.dark_mode]);

    useEffect(() => {
        // if (darkMode) {
        //    // console.log("เพิ่ม Dark");
        //     htmlElement.classList.add("dark");
        // } else {
        //     // console.log("ลบ Dark");
        //     htmlElement.classList.remove("dark");
        // } 
        const param = {
            "user_id" : auth.user.id,
            "dark_mode" : darkMode
        }
        // console.log(param);
        svChangeMode(param).then((res) => {
            // console.log(res);
        })
    }, [darkMode]);

    const fnSetDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
        if (darkMode) {
            // console.log("เพิ่ม Dark");
            htmlElement.classList.add("dark");
        } else {
            // console.log("ลบ Dark");
            htmlElement.classList.remove("dark");
        }
    }

  return (
    <div className="bg-[#f5f4f9] flex gap-5 h-screen">
        <div className={`dark:bg-[#404040] bg-white ${handleNav ? 'w-[290px]': 'w-[0px]'} overflow-hidden duration-300 shadow-lg`}>
            <div className="m-4 border-4 rounded-lg bg-white">
                <h1 className="py-6 text-2xl font-bold text-green-500 text-center">PHP ADMIN </h1>
            </div>
            {/* language */}
            <div className="p-4 flex gap-1 justify-center">
                <div className="dark:bg-white dark:text-black bg-gray-500 text-white p-1 rounded-sm cursor-pointer duration-300">
                    TH
                </div>
                <div className="dark:bg-white dark:text-black bg-gray-500 text-white p-1 rounded-sm cursor-pointer duration-300 ">
                    EN
                </div>
            </div>
            <div className="">
                {
                    categories.map((menu) => (
                        <div key={menu.id}>
                            {menu.cate_position === 1 && (
                                <div className="flex flex-col gap-2 mb-4">
                                    <div className="flex items-center gap-2 text-[#bcbfc1]">
                                        <div className="h-[2px] w-3 bg-black"></div>
                                        <p className="">{menu.cate_title}</p>
                                    </div>
                                    {/* main menu */}
                                    {categories.map((sub_menu) => (
                                        sub_menu.cate_parent_id == menu.id && sub_menu.cate_position === 2 && (
                                            <div key={sub_menu.id}>
                                                {/* {console.log(sub_menu.cate_url)} */}
                                                <div className="px-4">
                                                    <Link href={sub_menu.cate_url} className="flex items-center px-2 gap-2 h-[40px] hover:bg-[#e7e7ff] rounded-[10px] text-[#4338ca] dark:text-white font-bold">
                                                        <DashboardIcon /> {sub_menu.cate_title}
                                                        {/* {submenu.menu_list?.length > 0 && <KeyboardArrowRightIcon className="ml-auto" />} */}

                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
        {/* <div className="w-10/12 max-md:w-[90%] mt-2 flex flex-col gap-5"> */}
        <div className="w-full mr-5 mt-2 flex flex-col gap-5">
            <div className="bg-white dark:bg-[#404040] h-[65px] rounded-[10px] px-4 flex justify-between items-center shadow-lg duration-300">
                <div>
                    <button onClick={() => setHandleNav(!handleNav)}>
                        <MenuIcon className="dark:text-white" />
                    </button>
                </div>
                <div className="flex gap-2 items-center relative">
                    {/* <button 
                        className="p-1 bg-black text-white rounded-lg dark:bg-white dark:text-black"
                        onClick={() => fnSetDarkMode()}
                    >dark</button> */}
                    <DarkMode auth={auth} />
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
