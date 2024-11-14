'use client'
import { FaEdit } from 'react-icons/fa';
import { FaBold, FaItalic, FaUnderline, FaUndo, FaRedo, FaSmile, FaListUl } from 'react-icons/fa';
import { FaEllipsisV } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaImages } from 'react-icons/fa';

const Createannouncment =()=>{
   
    return(
        <main className="space-y-4">
            <div className="flex flex-row items-center justify-between mb-4">
                <div className='flex flex-row items-center gap-2'>
                    <FaEdit size={22}/>
                    <h1 className='font-bold text-[22px]'>Create Announcement</h1>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-2'>
                   <button className='bg-[#0F172A] rounded-lg p-3 text-white text-[14px]'>Save Draft</button>
                   <button className='bg-white rounded-lg p-3 text-[#0F172A] border text-[14px]'>Preview Post</button>
                   <button>Cancel</button>
                </div>
            </div>
         
         <div className=" bg-white rounded-lg border">
            <div className='flex flex-col p-8 '>
             <label className='text-[#0F172A] text-[14px] p-2'>Title</label>
             <input type='text' placeholder='Add a title for your post' className='p-3 w-full border rounded-lg text-black' />
            </div>
            <div className='w-full h-[1px] bg-gray-300  mb-2'/>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between'>
        <div className="flex flex-wrap gap-3 p-2 px-6 text-[]">
        {/* Bold */}
        <button
          className=" p-2 "
        >
          <FaBold size={14} />
        </button>

        {/* Italic */}
        <button
          className="text-black p-2 "
        >
          <FaItalic size={14} />
        </button>

        {/* Underline */}
        <button
          className="text-black p-2"
        >
          <FaUnderline size={18} />
        </button>
        <button className='text-black p-2'>
            <FaBars/>
        </button>
        <button
          className="text-black p-2"
        >
          <FaImages size={14} />
        </button>

        <button
          className="text-black p-2"
        >
          <FaSmile size={14} />
        </button>
        <button
          className="text-black p-2"
        >
          <FaPlus size={14} />
        </button>

        {/* Bullet Points */}
        <button
          className="text-black p-2 "
        >
          <FaListUl size={14} />
        </button>
        <button
          className="text-gray-400 p-2 sm:ml-8"
        >
          <FaUndo size={14} />
        </button>

        <button
          className="text-gray-400 p-2"
        >
          <FaRedo size={14} />
        </button>
        <button className='text-back p-2'>
            <FaEllipsisV size={14} />
        </button>

      </div>
        
        <div className='flex flex-row gap-3 items-center mb-4 p-4'>
            <div className='p-2 bg-[#0F172A] rounded-full'>
                <img src='/Union.png' alt='img' />
            </div>
            <div className='p-2 bg-[#00B87D] rounded-full'>
                <img src='/important_details.png' alt='img'/>
            </div>
            <div className='p-2 bg-[#F53649] mr-0 sm:mr-4 rounded-full'>
                <img src='/important_details.png' alt='img'/>
            </div>
            
        </div>
      </div>
         </div>

         <div className="p-8 bg-white rounded-lg border">
         <div className="">
          <h1 className="text-[#0D1322] font-bold text-[22px] mb-2">Exciting News!</h1>
          <p className="mb-14">
            We are thrilled to announce an important update to our Work from Home policy. With the evolving nature of the workplace, we have made some adjustments to better accommodate your needs and ensure a more flexible, productive environment for everyone.
          </p>
          <img
            src="/solen-feyissa-TaOGbz_S-Qw-unsplash.png"
            alt="img"
            className="w-[600px] mb-8  mx-auto"
          />
       </div>
         </div>
         <div className="flex justify-center items-center">
           <button className="p-3 rounded-lg bg-[#0F172A] text-white text-[16px] flex justify-center w-[300px]">
             Save & Publish
           </button>
         </div>
         
        </main>
    )
}
export default Createannouncment;