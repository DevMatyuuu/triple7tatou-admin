import React, { useEffect, useState } from 'react'
import useTattooGallery from '../hooks/useTattooGallery'
import usePiercingGallery from '../hooks/usePiercingGallery';
import { Link } from 'react-router-dom';

export default function DashboardCards() {
  const [tattooCount, setTattooCount] = useState(0);
  const [piercingCount, setPiercingCount] = useState(0);

  const { tattooGallery } = useTattooGallery();
  const { piercingGallery } = usePiercingGallery();
  const maxTattooCount = tattooGallery.length;
  const maxPiercingCount = piercingGallery.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTattooCount((prevCount) => (prevCount < maxTattooCount ? prevCount + 1 : prevCount));
    }, 80);

    return () => clearInterval(intervalId);
  }, [maxTattooCount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPiercingCount((prevCount) => (prevCount < maxPiercingCount ? prevCount + 1 : prevCount));
    }, 80);

    return () => clearInterval(intervalId);
  }, [maxPiercingCount]);

  return (
    <div className='flex text-black w-full gap-20 h-[200px] justify-between items-center'>
      <div className='flex flex-col justify-center gap-8 bg-gradient-to-r from-gray-100 to-gray-300 w-full rounded-xl lg:px-5 h-full'>
        <div className='flex justify-end'>
          <Link to='/tattoos' className='underline underline-offset-2 cursor-pointer hover:text-red-500 duration-300'>See all</Link>
        </div>
        <div className='flex justify-between items-end'>
          <span className='text-3xl lg:w-[40%] leading-16 '>Tattoo Images Uploaded</span>
          <span className='text-7xl text-black font-semi-bold'>{tattooCount}</span>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-8 bg-gradient-to-r from-gray-100 to-gray-300 w-full rounded-xl lg:px-5 h-full'>
        <div className='flex justify-end'>
          <Link to='/piercings' className='underline underline-offset-2 cursor-pointer hover:text-red-500 duration-300'>See all</Link>
        </div>
        <div className='flex justify-between items-end'>
          <span className='text-3xl lg:w-[40%] leading-16 '>Piercing Images Uploaded</span>
          <span className='text-7xl font-semi-bold'>{piercingCount}</span>
        </div>
      </div>
      <div className='flex flex-col justify-center gap-8 bg-gradient-to-r from-gray-100 to-gray-300 w-full rounded-xl lg:px-5 h-full'>
        <div className='flex justify-end'>
          <span className='underline underline-offset-2 cursor-pointer'>See all</span>
        </div>
        <div className='flex justify-between items-end'>
          <span className='text-3xl lg:w-[40%] leading-16 '>Tattoo Images Uploaded</span>
          <span className='text-7xl font-semi-bold'>{tattooGallery.length}</span>
        </div>
      </div>
    </div>
  )
}
