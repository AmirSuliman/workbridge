import React from 'react'
import { FaFolder } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';

const page = () => {
  return (
    <div className=''>
         <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-2'>
            <FaFolder size={24}/>
          <h1 className='font-semibold text-[22px]'>Files</h1>
          </div>
          <div className='flex flex-row items-center gap-4'>
                <button className='flex flex-row items-center p-3 gap-2 px-4 bg-white border rounded text-[12px]'>Add Folder <FaPlusCircle/></button>
                <button className='flex flex-row items-center p-3 gap-2 px-4 bg-black text-white border rounded text-[12px]'>Upload Files <FaUpload/></button>
          </div>
         </div>

       <div className='flex flex-row items-start gap-8 w-full mt-8'>
           <div className='flex flex-col bg-white border rounded rounded-[10px] w-[30%] h-[90vh]'>
            <h1 className='mt-6 px-8 font-medium text-[18px] text-[#0F172A] mb-4'>Folders</h1>
            <div className='flex flex-row items-center justify-between mt-3 mb-3 hover:bg-black hover:text-white p-3'>
              <div className='flex flex-row items-center gap-2 px-4 font-medium'>
                <FaFolder size={20}/>
                <p>All Files</p>
              </div>
              <p className='px-4 text-gray-400 text-[16px]'>7 Files</p>
            </div>
            <div className='flex flex-row items-center justify-between  mb-3 hover:bg-black hover:text-white p-3'>
              <div className='flex flex-row items-center gap-2 px-4 font-medium'>
                <FaFolder size={20}/>
                <p>Work Document</p>
              </div>
              <p className='px-4 text-gray-400 text-[16px]'>7 Files</p>
            </div>
            <div className='flex flex-row items-center justify-between hover:bg-black hover:text-white p-3 mb-3'>
              <div className='flex flex-row items-center gap-2 px-4 font-medium'>
                <FaFolder size={20}/>
                <p>My files</p>
              </div>
              <p className='px-4 text-gray-400 text-[16px]'>7 Files</p>
            </div>
             <div className='h-[1px] w-full bg-gray-300 mb-2'/>
             <div className='flex flex-row items-center justify-between hover:bg-black hover:text-white p-3 mb-3'>
              <div className='flex flex-row items-center gap-2 px-4 font-medium'>
                <FaFolder size={20}/>
                <p>My files</p>
              </div>
              <p className='px-4 text-gray-400 text-[16px]'>7 Files</p>
            </div>
           </div>


           <div className='flex flex-col bg-white border rounded rounded-[10px] p-5 w-[70%]'>

           </div>
       </div>
    </div>
  )
}

export default page