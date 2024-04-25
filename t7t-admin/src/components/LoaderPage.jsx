import React from 'react'
import logo from '../assets/T7T-logo.webp'


export default function LoaderPage({loading}) {
  return (
    <div className={`${loading ? 'top-0' : '-top-[5000px]' } duration-500 ease-in-out flex justify-center fixed bg-black  h-full w-full z-50`}>
      <div className='flex flex-col justify-center items-center gap-20'>
        <img src={logo} alt='logo' className='lg:h-[300px] h-40'/>
        <div className='flex items-center'>
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle id="test" cx="40" cy="40" r="32"></circle>
            </svg>
          </div>
          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64"></rect>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
