import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tattoos from './pages/Tattoos';
import Piercings from './pages/Piercings';
import Promo from './pages/Promo';
import Sidebar from './components/Sidebar';
import LoaderPage from './components/LoaderPage';
import AddTattooModal from './components/AddTattooModal';
import AddPiercingModal from './components/AddPiercingModal';
import useUserLoggedIn from './hooks/useUserLoggedIn';
import AddPromoModal from './components/AddPromoModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [openTattooModal, setOpenTattooModal] = useState(false);
  const [openPiercingModal, setOpenPiercingModal] = useState(false);
  const [openPromoModal, setOpenPromoModal] = useState(false);

  const { user } = useUserLoggedIn();
  const navigate = useNavigate();

  const handleOpenTattooModal = () => setOpenTattooModal(!openTattooModal);
  const handleCloseTattooModal = () => {
    setOpenTattooModal(!openTattooModal);
  };

  const handleOpenPiercingModal = () => setOpenPiercingModal(!openPiercingModal);
  const handleClosePiercingModal = () => {
    setOpenPiercingModal(!openPiercingModal);
  };

  const handleOpenPromoModal = () => setOpenPromoModal(!openPromoModal);
  const handleClosePromoModal = () => {
    setOpenPromoModal(!openPromoModal);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoaderPage loading={loading} />;
  }

  if (!user) {
    return (
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    );
  }

  return (
    <div className='bg-black relative'>
      <main className='flex w-full'>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <div className='flex text-white lg:text-3xl w-full lg:pb-10 lg:px-20 lg:pt-10 lg:border-b-[1px] bg-cover lg:border-white/20 justify-between font-semibold'>
            <span className='font-[Engraver] text-5xl'>Admin</span>
            <span>Hi, MJ!</span>
          </div>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/tattoos' element={<Tattoos open={openTattooModal} handleOpen={handleOpenTattooModal} />} />
            <Route path='/piercings' element={<Piercings open={openPiercingModal} handleOpen={handleOpenPiercingModal} />} />
            <Route path='/promo' element={<Promo open={openPromoModal} handleOpen={handleOpenPromoModal} />} />
          </Routes>
        </div>
      </main>
      <AddTattooModal handleClose={handleCloseTattooModal} open={openTattooModal} />
      <AddPiercingModal handleClose={handleClosePiercingModal} open={openPiercingModal} />
      <AddPromoModal handleClose={handleClosePromoModal} open={openPromoModal} />
    </div>
  );
}
