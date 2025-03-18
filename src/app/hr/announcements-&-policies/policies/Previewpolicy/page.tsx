'use client';
import Modal from '@/components/modal/Modal';
import { useState } from 'react';
import Workfromhome from '../components/PreviewPolicy';

const Previewpolicy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-[22px] font-semibold">Preview policy</h1>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={openModal}
            className="bg-black text-[14px] text-white p-2 rounded px-4"
          >
            Send
          </button>
          <button className="p-2 ">Cancel</button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-[10px] mt-8 border">
        {/* <Workfromhome /> */}
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="p-6 w-full sm:w-[600px]">
            <h2 className="text-xl font-semibold">Send Policy</h2>
            <label className="mt-12 flex flex-col gap-2">
              <span className="text-[14px] text-gray-400">Select</span>
              <select
                className="p-4 border border-gray-300 rounded bg-white focus:outline-none text-gray-500 "
                defaultValue=""
              >
                <option value="">Employees</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </label>
            <label className="mt-4 flex flex-row items-center gap-2 p-2">
              <input type="checkbox" className="p-8" />
              <span className="text-[14px]">Send to all employees </span>
            </label>

            <div className="flex items-center justify-between gap-2 mt-32 w-full p-4">
              <button
                onClick={() => {
                  closeModal();
                }}
                className="p-2 bg-black text-white rounded w-full"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="p-2 bg-gray-200 rounded w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Previewpolicy;
