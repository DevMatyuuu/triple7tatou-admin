import React from 'react'
import DashboardCards from '../components/DashboardCards'


export default function Dashboard() {
  return (
    <div className='flex'>
      <div className='flex item-center'>
        <div className='w-full lg:px-20 lg:pt-10'>
          <DashboardCards />
        </div>
      </div>
    </div>
  )
}
