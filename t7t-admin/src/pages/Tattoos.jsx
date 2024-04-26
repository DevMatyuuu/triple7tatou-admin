import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';   
import useTattooGallery from '../hooks/useTattooGallery';
import { FaTrash } from 'react-icons/fa6';

export default function Tattoos({open, handleOpen}) {
  const { tattooGallery } = useTattooGallery();

  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.image} alt={rowData.category} style={{width: '50px'}} />;
  }

  const actionBodyTemplate = () => {
    return (
      <div className='flex gap-10'>
        <FaTrash className='text-red-500 size-5 cursor-pointer' />
      </div>
    )
  }

  return (
    <>
      <div className='w-full'>
        <div className='flex justify-end px-20 pt-5'>
          <button className='text-black bg-white hover:bg-white/50 hover:text-white py-2 px-3 rounded-md' onClick={handleOpen}>Upload Image</button>
        </div>
        <DataTable value={tattooGallery} key='id' paginator rows={5} rowsPerPageOptions={[5, 10]} tableStyle={{ minWidth: '50rem' }} className='mx-auto w-[90%] mt-6' sortField='id' sortOrder={1}>
          <Column field="id" header="ID" style={{ width: '25%' }} className='font-bold'/>
          <Column field="category" header="Category" style={{ width: '25%' }} className='first-letter:uppercase font-bold' />
          <Column body={imageBodyTemplate} header="Images" style={{ width: '25%' }} />
          <Column body={actionBodyTemplate} header="Action" style={{ width: '25%' }} />
        </DataTable>
      </div>
    </>
  )
}