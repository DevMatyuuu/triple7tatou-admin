import React from 'react'
import Sidebar from '../components/Sidebar'
import DashboardCards from '../components/DashboardCards'

export default function Dashboard() {
  return (
    <div className='flex item-center'>
      <Sidebar />
      <div className='flex flex-col items-center lg:py-10 w-full'>
        <div className='flex text-white lg:text-3xl w-full lg:pb-5 lg:px-20 lg:border-b-[1px] lg:border-white/20 justify-between font-semibold'>
          <span>Admin</span>
          <span>Hi! Mj</span>
        </div>
        <div className='w-full lg:px-20 lg:pt-10'>
          <DashboardCards />
        </div>
      </div>
    </div>
  )
}
