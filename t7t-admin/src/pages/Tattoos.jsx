import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';   
import useTattooGallery from '../hooks/useTattooGallery';
import { FaTrash } from 'react-icons/fa6';
import useUserLoggedIn from '../hooks/useUserLoggedIn';
import DeleteTattooModal from '../components/DeleteTattooModal';

export default function Tattoos({open, handleOpen}) {
  const { tattooGallery } = useTattooGallery();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState(null);

  const { user } = useUserLoggedIn();

  const userTattooGallery = tattooGallery.filter(userTatoo => userTatoo.uid ===  user?.uid)

  const handleOpenDeleteModal = (id) => {
    setOpenDelete(true)
    setDeleteRowId(id)
  }

  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.image} alt={rowData.category} style={{width: '50px'}} />;
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div onClick={() => handleOpenDeleteModal(rowData.id)} className='flex items-center gap-2 text-red-500 w-max hover:text-red-800 cursor-pointer'>
        <span>Delete</span>
        <FaTrash className='size-5' />
      </div>
    )
  }

  return (
    <div className='relative h-full w-full'>
      <div className='w-full'>
        <div className='flex justify-end px-20 pt-5'>
          <button className='text-black bg-white hover:bg-white/50 hover:text-white py-2 px-3 rounded-md' onClick={handleOpen}>Upload Image</button>
        </div>
        <DataTable 
          value={userTattooGallery} 
          key='id' 
          paginator 
          rows={5} 
          rowsPerPageOptions={[5, 10]} 
          tableStyle={{ minWidth: '50rem' }} 
          className='mx-auto w-[90%] mt-6' 
          sortField='timestamp' 
          sortOrder={-1}>
          <Column field="category" header="Category" style={{ width: '30%' }} className='first-letter:uppercase font-bold' />
          <Column body={imageBodyTemplate} header="Images" style={{ width: '30%' }} />
          <Column body={actionBodyTemplate} header="Action" style={{ width: '30%' }} />
        </DataTable>
      </div>
      <DeleteTattooModal openDelete={openDelete} setOpenDelete={setOpenDelete} deleteRowId={deleteRowId} />
    </div>
  )
}
