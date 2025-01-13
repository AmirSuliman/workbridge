'use client'
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

interface Folder {
  id: string;
  name: string;
  files: File[];
}
const Editdocument = ({ setIsModalOpen3 }) => {
   const [folders, setFolders] = useState<Folder[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchFolders = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axiosInstance.get('/folders');
          console.log(response.data, 'folder data');
          setFolders(response.data.data.items); 
        } catch (err) {
          setError('Failed to load folders.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
    
      fetchFolders();
    }, []);
    
    return (
      <div className="w-full sm:w-[600px] p-8 bg-white rounded shadow-lg relative">
        <button
          onClick={() => setIsModalOpen3(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="font-semibold text-xl mb-4">Edit document</h2>

        <div className="flex flx-row items-center w-full gap-6 mt-8">
        <label className="flex flex-col w-full text-gray-400">
           <span className="mb-1 text-gray-400 text-[14px]">Folder</span>
           <select id="folderSelect" className="w-full border p-3 rounded" >
             <option value="">Select a Folder</option>
             {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
           </select>
         </label>
         <label className="flex flex-col w-full ">
          <span className="mb-1 text-gray-400 text-[14px]">Document title</span>
          <input type="text" placeholder="Add document title" className="w-full border p-3 rounded"/>
         </label>
        </div>

        <div className='flex flex-row items-center w-full p-4 mt-52 gap-6 px-8'>
        <button className='rounded w-full bg-[#0F172A] text-white p-4 text-center text-[14px]'>Confirm</button>
        <button className='rounded w-full border  p-4 text-center text-[14px]'>Cancel</button>
      </div>
      </div>
    );
  };

export default Editdocument;