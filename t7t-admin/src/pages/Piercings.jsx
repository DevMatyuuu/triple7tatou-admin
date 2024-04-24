import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';   
import usePiercingGallery from '../hooks/usePiercingGallery';

export default function Piercings() {

  const { piercingGallery } = usePiercingGallery();

  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.image} alt={rowData.category} style={{width: '50px'}} />;
  }

  const actionBodyTemplate = () => {
    return (
      <div className='flex gap-10'>
        <button className='text-red-500'>Delete</button>
        <button className=''>Edit</button>
      </div>
    )
  }

  return (
    <div>
      <div className='flex justify-end px-20 pt-5'>
        <button className='text-black bg-white hover:bg-white/50 hover:text-white py-2 px-3 rounded-md'>Upload Image</button>
      </div>
      <DataTable value={piercingGallery} key='id' paginator rows={5} rowsPerPageOptions={[5, 10]} tableStyle={{ minWidth: '50rem' }} className='mx-auto w-[90%] mt-6' sortField='id' sortOrder={1}>
        <Column field="id" header="ID" style={{ width: '25%' }} className='font-bold'/>
        <Column body={imageBodyTemplate} header="Images" style={{ width: '25%' }} />
        <Column body={actionBodyTemplate} header="Action" style={{ width: '25%' }} />
      </DataTable>
    </div>
  )
}
