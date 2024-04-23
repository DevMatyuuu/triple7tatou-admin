import React from 'react'
import { sidebarLinks } from '../constant'
import { IoIosLogOut } from "react-icons/io";
import logo from '../assets/T7T-logo.webp'

export default function Sidebar() {
  return (
    <aside className='flex flex-col items-center lg:w-[20%] lg:h-screen text-white lg:py-10 lg:border-r-[1px] border-white/20'>
      <img src={logo} alt='logo' className='lg:w-28 lg:h-16 lg:mx-auto lg:mb-10'/>
      <div className='flex flex-col items-center justify-between h-full w-full'>
        <div className='flex flex-col items-center gap-7 justify-center lg:px-4 w-full'>
          {sidebarLinks.map((link) => (
            <div key={link.id} className='flex items-center w-full h-24 justify-center gap-5 group hover:bg-white/20 cursor-pointer lg:rounded-lg'>
              <div className='group-hover:text-red-500'>{link.icon}</div>
              <span className='group-hover:text-red-500 lg:text-lg'>{link.label}</span>
            </div>
          ))}
        </div>
        <div className='flex justify-center items-center lg:gap-3 cursor-pointer hover:text-red-500'>
          <span className='lg:text-lg'>Logout</span>
          <IoIosLogOut className='lg:size-8'/>
        </div>
      </div>
    </aside>
  )
}
