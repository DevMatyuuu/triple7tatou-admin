import React, { useEffect, useRef, useState } from 'react'
import useUserLoggedIn from './hooks/useUserLoggedIn'
import { Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tattoos from './pages/Tattoos';
import Piercings from './pages/Piercings';
import Promo from './pages/Promo';
import Sidebar from './components/Sidebar'
import LoaderPage from './components/LoaderPage';
import { IoCloseSharp } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import Select from 'react-select'
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from './firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

const dropdownItem = [
  { value: "minimalist", label: "Minimalist" },
  { value: "realism", label: "Realism" },
  { value: "traditional", label: "Traditional" },
]

export default function App() {
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState(null)
  const [media, setMedia] = useState('')
  
  const { user, setUser } = useUserLoggedIn();


  const filePickerRef = useRef();

  const handleDropdownChange = (selectedOption) => {
    setCategory(selectedOption);
  };

  const addImageToModal = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setMedia(readerEvent.target.result);
    }
  }

  const upload = async () => {
    const newId = uuidv4();
  
    const imageRef = ref(storage, `posts/${newId}/image`);
  
    if (media) {
      await uploadString(imageRef, media, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);
  
      const docRef = await addDoc(collection(db, 'tattooGallery'), {
        uid: user?.uid,
        id: newId,
        category: category.value,
        image: downloadURL,
        date: new Date().toLocaleDateString
      });
    }
    setCategory(null);
    setMedia('')
  }
  
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
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

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
        <div className={`${!open ? 'hidden' : 'block'} w-full`}>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[100vh] bg-black/25 w-full'>
            <div className='flex flex-col py-6 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#3b3b3b] h-auto[600px] w-[25%]'>
              <div className='w-[90%] h-full'>
                <div className='flex justify-between items-center mb-10'>
                  <span className='text-white text-xl'>Add Tattoo Image</span>
                  <IoCloseSharp onClick={handleClose} className='text-white size-7 hover:text-red-500 cursor-pointer duration-200'/>
                </div>
                <div className='flex flex-col justify-center items-center gap-10 py-14'>
                  {media 
                  ?
                  <img src={media} alt='uploaded-image' className='rounded-xl object-contain w-[60%] h-[120px] z-0'/>
                  : 
                  <div onClick={() => filePickerRef.current.click()} className='flex gap-3 items-center justify-center mx-auto w-[60%] h-[120px] bg-slate-300 rounded-lg group hover:bg-slate-500 cursor-pointer duration-200'>
                    <RiImageAddFill className=' text-slate-500 group-hover:text-white size-10 duration-200'/>
                    <input ref={filePickerRef} onChange={addImageToModal} type='file' id='file' hidden />
                  </div> 
                  }
                  <Select onChange={(selectedOption) => setCategory(selectedOption)} options={dropdownItem} value={category} placeholder='Select Category' className='w-[60%]'/>
                </div>
                <div className='flex w-full justify-end gap-5 text-white'>
                  <button onClick={() => upload()} className='hover:text-green-600 duration-200'>Upload</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </>
  )
}
