import React from 'react'
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { RiErrorWarningFill } from 'react-icons/ri';

export default function DeletePiercingModal({deleteRowId, setOpenDelete, openDelete}) {

    const deletePiercing = async (id) => {
        const q = query(collection(db, "piercingGallery"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    }
  return (
    <>
    {openDelete &&
    <div>
    <div className='w-full h-full absolute bg-black/30 top-0 z-50'>
        <div className='flex flex-col mx-auto  items-center gap-14 w-[45%] h-auto py-10 mt-36 bg-[#3b3b3b] text-white rounded-xl'>
            <div className='flex flex-col gap-2'>
                <span className='text-lg'>Are you sure you want to delete this item?</span>
                <div className='flex gap-2 text-red-500 items-center'>
                    <RiErrorWarningFill className='size-4'/>
                    <span className='text-sm'>This action cannot be undone</span>
                </div>
            </div>
            <div className='flex items-center justify-center gap-7'>
                <button className='bg-white text-black px-7 py-2 rounded-xl hover:bg-black hover:text-white duration-100' onClick={() => {deletePiercing(deleteRowId); setOpenDelete(false)}}>Confirm</button>
                <button className='bg-red-700 text-white px-7 py-2 rounded-xl hover:bg-red-900 hover:text-white duration-100' onClick={() => setOpenDelete(false)}>Cancel</button>
            </div>
        </div>
    </div>  
    </div>
    }
    </>
  )
}
