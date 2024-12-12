'use client'
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";


const Uploadfiles = ({ setIsModalOpen1 }) => {
  const [progress, setProgress] = useState(0);

    return (
      <div className="w-full sm:w-[700px] p-8 bg-white rounded shadow-lg relative">
        <button
          onClick={() => setIsModalOpen1(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="font-semibold text-xl mb-4">Upload File</h2>
        <label className="text-gray-400 block text-sm mb-2 mt-8">Upload file</label>

      <div className="border-dashed border-2 border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
        <div className="text-gray-500 flex items-center gap-2">
          <span>Upload document</span>
          <FiUpload className="text-xl" />
        </div>
      </div>

      <div className="w-full mt-2">
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-gray-400 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-gray-500 text-xs mt-1 text-right">{progress}%</div>
      </div>
        <div className="h-[1px]  w-full bg-gray-200 mt-4" />
        <div className="flex flx-row items-center w-full gap-6 mt-4">
        <label className="flex flex-col w-full ">
           <span className="mb-1 text-gray-400 text-[14px]">Folder</span>
           <select id="folderSelect" className="w-full border p-3 rounded " >
             <option value="">Select a Folder</option>
             <option value="tab1">Folder 1</option>
             <option value="tab2">Folder 2</option>
             <option value="tab3">Folder 3</option>
           </select>
         </label>
         <label className="flex flex-col w-full ">
          <span className="mb-1 text-gray-400 text-[14px]">Document title</span>
          <input type="text" placeholder="Add document title" className="w-full border p-3 rounded"/>
         </label>
        </div>
        <p className="text-black text-[12px] mt-4">Leave blank for the file to be saved to All Files Folder</p>


        <div className='flex flex-row items-center w-full p-4 mt-16 gap-6 px-8'>
        <button className='rounded w-full bg-[#0F172A] text-white p-4 text-center text-[14px]'>Confirm</button>
        <button className='rounded w-full border  p-4 text-center text-[14px]'>Cancel</button>
      </div>
      </div>
    );
  };

export default Uploadfiles;