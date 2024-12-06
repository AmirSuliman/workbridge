import React from 'react'

const page = () => {
  return (
    <div className=''>
         <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-2'>
          <h1 className='font-semibold text-[22px]'>Files</h1>
          </div>
          <div className='flex flex-row items-center gap-4'>
                <button className='flex flex-row items-center p-3 gap-2 px-4 bg-white border rounded text-[12px]'>Add Folder</button>
                <button className='flex flex-row items-center p-3 gap-2 px-4 bg-black text-white border rounded text-[12px]'>Upload Files</button>
          </div>
         </div>

    </div>
  )
}

export default page