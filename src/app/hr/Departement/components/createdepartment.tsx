'use client';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import axiosInstance from '@/lib/axios';
import * as yup from 'yup';
import axios from 'axios';

const CreateDepartment = ({ isModalOpen, setIsModalOpen }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const departmentSchema = yup.object().shape({
    name: yup.string().required('Department name is required'),
  });

  const handleAddDepartment = async () => {
    try {
      await departmentSchema.validate({ name: departmentName });
      setErrorMessage('');

      setIsLoading(true);

      const response = await axiosInstance.post('/department', {
        name: departmentName,
      });

      console.log('Department created successfully:', response.data);

      setDepartmentName('');
      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrorMessage(error.message);
      } else if (axios.isAxiosError(error)) {
        console.error('Server error:', error.response?.data || error.message);
        setErrorMessage(
          'An error occurred while creating the department. Please try again.'
        );
      } else {
        console.error('Unexpected error:', error);
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-1000">
      <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[600px] shadow-lg ">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-[22px] font-semibold">Create Department</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4 mt-10">
            <label className="block text-gray-400 mb-2 text-[14px]">
              Department Name*
            </label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="border w-full px-3 py-3 rounded-[5px] text-sm text-gray-800 focus:outline-none"
              placeholder="Type department name"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2 text-[14px]">
              Department Head*
            </label>
            <select
              className="border w-full px-3 py-3 rounded-[5px] text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select department head
              </option>
              <option value="john_doe">John Doe</option>
              <option value="jane_smith">Jane Smith</option>
              <option value="alex_johnson">Alex Johnson</option>
              <option value="linda_williams">Linda Williams</option>
            </select>
          </div>

          <div className="flex justify-center items-center flex-row w-full gap-6 p-6 mt-32">
            <button
              type="button"
              onClick={handleAddDepartment}
              className="px-4 py-3 rounded bg-[#0F172A] text-white text-sm w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Confirm'}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-3 rounded border text-sm w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDepartment;
