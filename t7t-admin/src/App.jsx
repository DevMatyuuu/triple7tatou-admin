import React from 'react'
import useUserLoggedIn from './hooks/useUserLoggedIn'
import { Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tattoos from './pages/Tattoos';
import Piercings from './pages/Piercings';
import Promo from './pages/Promo';
import Sidebar from './components/Sidebar'

export default function App() {

  const { user } = useUserLoggedIn();

  return (
    <div className='bg-black'>
        <div>
          <Routes>
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
        <main className='flex w-full'>
          <Sidebar />
          <div className='flex flex-col w-full'>
            <div className='flex text-white lg:text-3xl w-full lg:pb-10 lg:px-20 lg:pt-10 lg:border-b-[1px] lg:border-white/20 justify-between font-semibold'>
              <span>Admin</span>
              <span>Hi! Mj</span>
            </div>
            <Routes>
              <Route path='/' exact element={<Dashboard />} />
              <Route path='/tattoos' element={<Tattoos />} />
              <Route path='/piercings' element={<Piercings />} />
              <Route path='/promo' element={<Promo />} />
            </Routes>
          </div>
        </main>
    </div>
  )
}
