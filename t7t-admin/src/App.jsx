import React, { useEffect, useState } from 'react'
import useUserLoggedIn from './hooks/useUserLoggedIn'
import { Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tattoos from './pages/Tattoos';
import Piercings from './pages/Piercings';
import Promo from './pages/Promo';
import Sidebar from './components/Sidebar'
import LoaderPage from './components/LoaderPage';
import AddTattooModal from './components/AddTattooModal';

export default function App() {
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  
  const { user, setUser } = useUserLoggedIn();

  const handleOpen = () => setOpen(!open);
  const handleClose = () => {
    setOpen(!open);
    setMedia(null)
    setCategory(null)
  }

  useEffect(() => { 
    setTimeout(() => {   
      setLoading(false)   
    }, 1000)
  }, []) 

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return null;
  }

  if (!user) {
    return (
      <Routes>
        <Route path='/*' element={<Login />} />
      </Routes>
    )
  }


  return (
    <>
    <LoaderPage loading={loading}/>
    <div className='bg-black relative'>
        <main className='flex w-full'>
          <Sidebar />
          <div className='flex flex-col w-full'>
            <div className='flex text-white lg:text-3xl w-full lg:pb-10 lg:px-20 lg:pt-10 lg:border-b-[1px] bg-cover lg:border-white/20 justify-between font-semibold'>
              <span className='font-[Engraver] text-5xl'>Admin</span>
              <span>Hi! {user.email.split()}</span>
            </div>
            <Routes>
              <Route path='/' exact element={<Dashboard />} />
              <Route path='/tattoos' element={<Tattoos open={open} handleOpen={handleOpen} />} />
              <Route path='/piercings' element={<Piercings />} />
              <Route path='/promo' element={<Promo />} />
            </Routes>
          </div>
        </main>
        <AddTattooModal handleClose={handleClose} open={open}/>
    </div>
  </>
  )
}
