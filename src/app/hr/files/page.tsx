'use client';
import { useState } from 'react';
import React from 'react';
import { FaFolder, FaPlusCircle, FaUpload, FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import Modal from '@/components/modal/Modal';
import Addfolder from './components/addfolder';
import Uploadfiles from './components/uploadfiles';
import Editfolder from './components/editfolder';
import Editdocument from './components/editdocument';
import Deletedocument from './components/deletedocumnet';
const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const handleAddfolder = () => {
    setIsModalOpen(true); 
  };
  const handleUploadfiles = () => {
    setIsModalOpen1(true); 
  };
  const handleEditfolder = () => {
    setIsModalOpen2(true); 
  };
  const handleEditdocument = () => {
    setIsModalOpen3(true); 
  };
  const handleDeletedocument = () => {
    setIsModalOpen4(true); 
  };
  return (
    <div className=''>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <FaFolder size={24} />
          <h1 className='font-semibold text-[22px]'>Files</h1>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <button
            onClick={handleAddfolder}
            className='flex flex-row items-center p-3 gap-2 px-4 bg-white border rounded text-[12px]'
          >
            Add Folder <FaPlusCircle />
          </button>
          <button
          onClick={handleUploadfiles}
          className='flex flex-row items-center p-3 gap-2 px-4 bg-black text-white border rounded text-[12px]'>
            Upload Files <FaUpload />
          </button>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-6 w-full mt-8'>
        <div className='flex flex-col bg-white border rounded rounded-[10px] w-full sm:w-[30%] h-[90vh]'>
          <h1 className='mt-6 px-8 font-medium text-[18px] text-[#0F172A] mb-4'>Folders</h1>
          <div className='flex flex-row items-center justify-between mt-3 mb-3 hover:bg-black hover:text-white p-3'>
            <div className='flex flex-row items-center gap-2 px-4 font-medium'>
              <FaFolder size={20} />
              <p>All Files</p>
            </div>
            <p className='px-4 text-gray-400 text-[16px]'>7 Files</p>
          </div>
          <div className='flex flex-row items-center justify-between mb-3 hover:bg-black hover:text-white p-3'>
            <div className='flex flex-row items-center gap-2 px-4 font-medium'>
              <FaFolder size={20} />
              <p>Work Document</p>
            </div>
            <p className='px-4 text-gray-400 text-[16px]'>7 Files</p>
          </div>
          <div className='flex flex-row items-center justify-between hover:bg-black hover:text-white p-3 mb-3'>
            <div className='flex flex-row items-center gap-2 px-4 font-medium'>
              <FaFolder size={20} />
              <p>My Files</p>
            </div>
            <p className='px-4 text-gray-400 text-[16px]'>7 Files</p>
          </div>
          <div className='h-[1px] w-full bg-gray-300 mb-2' />
          <div className='flex flex-row items-center justify-between hover:bg-black hover:text-white p-3 mb-3'>
            <div className='flex flex-row items-center gap-2 px-4 font-medium'>
              <FaFolder size={20} />
              <p>Shared Files</p>
            </div>
            <p className='px-4 text-gray-400 text-[16px]'>7 Files</p>
          </div>
        </div>

        <div className='flex flex-col bg-white border rounded rounded-[10px] p-5 w-full sm:w-[70%] h-[90vh]'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center gap-2'>
              <FaFolder size={20} />
              <h1 className='font-medium text-[18px]'>Files</h1>
            </div>
            <div className='flex flex-row items-center gap-3'>
              <div className='flex flex-row items-center gap-2'>
                <label htmlFor='sort' className='mr-2 text-gray-400 text-[12px]'>
                  Sort
                </label>
                <select id='sort' className='border rounded px-2 py-1 text-[12px]'>
                  <option value=''>Select</option>
                  <option value='nameAZ'>Name</option>
                  <option value='dateAsc'>Date Uploaded</option>
                  <option value='dateDesc'>Size</option>
                </select>
              </div>
              <button 
              onClick={handleEditfolder}
              className='flex flex-row items-center p-2 gap-2 px-4 bg-black text-white border rounded text-[12px]'>
                Edit Files <FaEdit />
              </button>
            </div>
          </div>

          <table className='mt-8 w-full mb-2'>
            <thead className='text-gray-400 text-[14px] font-medium'>
              <tr className='border-b'>
                <th className='p-4 text-left'>Document Name</th>
                <th className='p-4 text-left'>Date Uploaded</th>
                <th className='p-4 text-left'>Size</th>
                <th className='p-4 text-left'>Filetype</th>
                <th className='p-4 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='p-3 border-b text-[14px] font-normal hover:bg-gray-50'>
                <td className='p-4 flex items-center gap-2'>
                  <input type='checkbox' />
                  <span>ioasdh22mvasd23a.pdf</span>
                </td>
                <td className='p-4'>24.02.2024</td>
                <td className='p-4'>14mb</td>
                <td className='p-4'>PDF</td>
                <td className='flex flex-row gap-3 justify-center items-center'>
                  <FaEdit onClick={handleEditdocument} className='cursor-pointer' />
                  <FaTrash onClick={handleDeletedocument} className='cursor-pointer' />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <Addfolder setIsModalOpen={setIsModalOpen} />
          </Modal>
        )}
         {isModalOpen1 && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <Uploadfiles setIsModalOpen1={setIsModalOpen1} />
          </Modal>
        )}
         {isModalOpen2 && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <Editfolder setIsModalOpen2={setIsModalOpen2} />
          </Modal>
        )}
          {isModalOpen3 && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <Editdocument setIsModalOpen3={setIsModalOpen3} />
          </Modal>
        )}
          {isModalOpen4 && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <Deletedocument setIsModalOpen4={setIsModalOpen4} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Page;
