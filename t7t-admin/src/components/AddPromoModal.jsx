import React, { useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { RiImageAddFill } from "react-icons/ri";
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import useUserLoggedIn from '../hooks/useUserLoggedIn';


export default function AddPromoModal({open, handleClose}) {
    const [media, setMedia] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { user } = useUserLoggedIn();

    const filePickerRef = useRef();

    const addImageToModal = (e) => {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])
      }
      reader.onload = (readerEvent) => {
        setMedia(readerEvent.target.result);
      }
    }
  
    const uploadPromo = async () => {
      const newId = uuidv4();
    
      const imageRef = ref(storage, `promo/${newId}/image`);
    
      if (media) {
        await uploadString(imageRef, media, 'data_url');
        const downloadURL = await getDownloadURL(imageRef);
    
        const docRef = await addDoc(collection(db, 'promo'), {
          uid: user?.uid,
          id: newId,
          image: downloadURL,
          title: title,
          description: description,
          timestamp: serverTimestamp(),
        });
      }
      setMedia('')
      setTitle('')
      setDescription('')
    }

    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    }

  return (
    <div className={`${!open ? 'hidden' : 'block'} w-full`}>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[100vh] bg-black/25 w-full'>
        <div className='flex flex-col py-6 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#3b3b3b] h-auto[600px] w-[25%]'>
            <div className='w-[90%] h-full'>
            <div className='flex justify-between items-center mb-10'>
                <span className='text-white text-xl'>Add Promo</span>
                <IoCloseSharp onClick={handleClose} className='text-white size-7 hover:text-red-500 cursor-pointer duration-200'/>
            </div>
            <div className='flex flex-col justify-center items-center gap-6 py-14 w-[60%] mx-auto'>
                {media 
                ?
                <div className='relative w-max h-full'>
                <img src={media} alt='uploaded-image' className='rounded-xl object-contain max-w-[320px] h-[160px] z-0 mx-auto'/>
                <IoCloseSharp onClick={() => setMedia('')} className='absolute top-2 right-2 px-1 size-6 rounded-full text-white hover:text-red-500 duration-200 cursor-pointer bg-gray-900'/>
                </div>
                : 
                <div onClick={() => filePickerRef.current.click()} className='flex gap-3 items-center justify-center mx-auto w-full h-[160px] bg-slate-300 rounded-lg group hover:bg-slate-500 cursor-pointer duration-200'>
                <RiImageAddFill className=' text-slate-500 group-hover:text-white size-10 duration-200'/>
                <input ref={filePickerRef} onChange={addImageToModal} type='file' id='file' hidden />
                </div> 
                }
              <input type='text' placeholder='Title' value={title} onChange={handleTitleChange} className='w-full py-2 px-2 rounded-lg'/>
              <textarea placeholder='Description' value={description} onChange={handleDescriptionChange} className='w-full h-[100px] py-2 px-2 rounded-lg'/>
            </div>
            <div className='flex w-full justify-end gap-5 text-white'>
                <button onClick={() => uploadPromo()} className='hover:text-green-600 duration-200'>Upload</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

