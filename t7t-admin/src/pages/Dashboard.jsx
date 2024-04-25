import React from 'react'
import DashboardCards from '../components/DashboardCards'


export default function Dashboard() {

  return (
    <div className='flex justify-center items-center px-20 w-full'>
        <div className='flex flex-col w-full h-full lg:pt-10 gap-10'>
          <div className='flex flex-col text-white xl:w-full lg:w-full h-full'>
            <p className='w-full text-5xl font-[Engraver]'>Manage your Triple7Tatou website</p>
          </div>
          <DashboardCards />
        </div>
    </div>
  )
}
