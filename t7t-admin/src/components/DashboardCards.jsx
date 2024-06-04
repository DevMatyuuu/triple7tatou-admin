import React, { useEffect, useState } from 'react'
import useTattooGallery from '../hooks/useTattooGallery'
import usePiercingGallery from '../hooks/usePiercingGallery';
import { Link } from 'react-router-dom';
import useUserLoggedIn from '../hooks/useUserLoggedIn';
import usePromo from '../hooks/usePromo';

export default function DashboardCards() {
  const [tattooCount, setTattooCount] = useState(0);
  const [piercingCount, setPiercingCount] = useState(0);
  const [promoCount, setPromoCount] = useState(0);

  const { tattooGallery } = useTattooGallery();
  const { piercingGallery } = usePiercingGallery();
  const { promo } = usePromo();
  const { user } = useUserLoggedIn();

  const userTattooGallery = tattooGallery.filter(userTatoo => userTatoo.uid ===  user?.uid);
  const userPiercingGallery = piercingGallery.filter(userPiercing => userPiercing.uid ===  user?.uid);
  const userPromo = promo.filter(userPromo => userPromo.uid ===  user?.uid);

  const maxTattooCount = userTattooGallery.length;
  const maxPiercingCount = userPiercingGallery.length;
  const maxPromoCount = userPromo.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTattooCount((prevCount) => (prevCount < maxTattooCount ? prevCount + 1 : prevCount));
    }, 80);

    return () => clearInterval(intervalId);
  }, [maxTattooCount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPiercingCount((prevCount) => (prevCount < maxPiercingCount ? prevCount + 1 : prevCount));
    }, 120);

    return () => clearInterval(intervalId);
  }, [maxPiercingCount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPromoCount((prevCount) => (prevCount < maxPromoCount ? prevCount + 1 : prevCount));
    }, 120);

    return () => clearInterval(intervalId);
  }, [maxPromoCount]);

  return (
    <div className='flex gap-10'>
      <div className='flex lg:flex-row text-black w-full gap-16 h-[200px] justify-between items-center'>
        <div className='flex flex-col justify-between py-5 gap-8 bg-gradient-to-r from-gray-100 to-gray-300 w-full rounded-xl lg:px-5 h-full'>
          <div className='flex justify-end'>
            <Link to='/tattoos' className='underline underline-offset-2 cursor-pointer hover:text-red-500 duration-300'>See all</Link>
          </div>
          <div className='flex justify-between items-end'>
            <span className='text-3xl lg:w-[40%] leading-16 '>Tattoo Images Uploaded</span>
            <span className='text-7xl text-black font-semi-bold w-[80px]'>{tattooCount}</span>
          </div>
        </div>
        <div className='flex flex-col justify-between py-5 gap-8 bg-gradient-to-r from-gray-100 to-gray-300 w-full rounded-xl lg:px-5 h-full'>
          <div className='flex justify-end'>
            <Link to='/piercings' className='underline underline-offset-2 cursor-pointer hover:text-red-500 duration-300'>See all</Link>
          </div>
          <div className='flex justify-between items-end'>
            <span className='text-3xl lg:w-[40%] leading-16 '>Piercing Images Uploaded</span>
            <span className='text-7xl font-semi-bold'>{piercingCount}</span>
          </div>
        </div>
        <div className='flex flex-col justify-between py-5 gap-8 bg-gradient-to-r from-gray-100 to-gray-300 w-full rounded-xl lg:px-5 h-full'>
          <div className='flex justify-end'>
            <Link to='/promo' className='underline underline-offset-2 cursor-pointer hover:text-red-500 duration-300'>See all</Link>
          </div>
          <div className='flex justify-between items-end'>
            <span className='text-3xl lg:w-[40%] leading-16 '>Active Promo</span>
            <span className='text-7xl font-semi-bold'>{promoCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
