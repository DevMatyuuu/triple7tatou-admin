import React from 'react'
import useTattooGallery from '../hooks/useTattooGallery'
import usePiercingGallery from '../hooks/usePiercingGallery';

export default function DashboardCards() {

  const { tattooGallery } = useTattooGallery();
  const { piercingGallery } = usePiercingGallery();

  return (
    <div className='flex text-black w-full gap-20 h-[200px] justify-between items-center'>
      <div className='flex flex-col justify-center gap-8 bg-gradient-to-b from-gray-900 to-gray-600 w-full rounded-xl lg:px-5 h-full'>
        <div className='flex justify-end'>
          <span className='text-white underline underline-offset-2 cursor-pointer'>See all</span>
        </div>
        <div className='flex justify-between items-end'>
          <span className='text-3xl lg:w-[40%] leading-16 text-white'>Tattoo Images Uploaded</span>
          <span className='text-7xl text-white font-semi-bold'>{tattooGallery.length}</span>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-8 bg-gradient-to-b from-gray-900 to-gray-600 w-full rounded-xl lg:px-5 h-full'>
        <div className='flex justify-end'>
          <span className='text-white underline underline-offset-2 cursor-pointer'>See all</span>
        </div>
        <div className='flex justify-between items-end'>
          <span className='text-3xl lg:w-[40%] leading-16 text-white'>Piercing Images Uploaded</span>
          <span className='text-7xl text-white font-semi-bold'>{piercingGallery.length}</span>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-8 bg-gradient-to-b from-gray-900 to-gray-600 w-full rounded-xl lg:px-5 h-full'>
        <div className='flex justify-end'>
          <span className='text-white underline underline-offset-2 cursor-pointer'>See all</span>
        </div>
        <div className='flex justify-between items-end'>
          <span className='text-3xl lg:w-[40%] leading-16 text-white'>Tattoo Images Uploaded</span>
          <span className='text-7xl text-white font-semi-bold'>{tattooGallery.length}</span>
        </div>
      </div>
    </div>
  )
}
