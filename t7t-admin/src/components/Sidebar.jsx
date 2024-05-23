import React, { useEffect, useState } from 'react';
import { sidebarLinks } from '../constant';
import { IoIosLogOut } from "react-icons/io";
import logo from '../assets/T7T-logo.webp';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export default function Sidebar() {
  const [active, setActive] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentLink = sidebarLinks.find(link => link.route === location.pathname);
    if (currentLink) {
      setActive(currentLink.id);
    }
  }, [location.pathname]);

  const handleLogout = () => {               
    signOut(auth)
    .then(() => {
        navigate('/login');
    })
    .catch((error) => {
    });
  };

  return (
    <aside className='flex flex-col items-center lg:w-[15%] lg:h-screen text-white lg:py-10 lg:border-r-[1px] border-white/20'>
      <img src={logo} alt='logo' className='lg:w-28 lg:h-16 lg:mx-auto lg:mb-10'/>
      <div className='flex flex-col items-center justify-between h-full w-full'>
        <div className='flex flex-col items-center gap-7 justify-center lg:px-4 w-full'>
          {sidebarLinks.map((link) => (
            <Link onClick={() => setActive(link.id)} to={link.route} key={link.id} className={`${active == link.id ? 'bg-white/20' : ''} flex items-center w-full h-24 justify-start text-white/70 lg:px-10 gap-4 group hover:bg-white/20 cursor-pointer lg:rounded-lg`}>
              <div className={`${active == link.id ? 'text-red-500' : 'group-hover:text-white'} `}>{link.icon}</div>
              <span className={`${active == link.id ? 'text-red-500' : 'group-hover:text-white'} lg:text-base`}>{link.label}</span>
            </Link>
          ))}
        </div>
        <div onClick={handleLogout} className='flex justify-center items-center lg:gap-3 cursor-pointer hover:text-red-500 lg:mb-5'>
          <span className='lg:text-base'>Logout</span>
          <IoIosLogOut className='lg:size-6'/>
        </div>
      </div>
    </aside>
  );
}
