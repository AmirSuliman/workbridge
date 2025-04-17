'use client';

import axiosInstance from '@/lib/axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isAxiosError } from 'axios';
import { EmployeeData } from '@/types/employee';

const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  headId: z.string().min(1, 'Department head is required'),
});

const CreateDepartment = ({
  isModalOpen,
  setIsModalOpen,
  onDepartmentAdded,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: '', headId: '' },
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoadingEmployees(true);
      try {
        const response = await axiosInstance.get('/employees', {
          params: { isManager: true },
        });
        setEmployees(response.data.data.items);
      } catch (error) {
        toast.error('Failed to load employees. Please try again.');
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await axiosInstance.post('/department', {
        name: data.name,
        employeeId: data.headId,
      });

      const response = await axiosInstance.get('/departments', {
        params: { associations: true },
      });

      onDepartmentAdded(response.data.data?.items);
      reset();
      setIsModalOpen(false);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Some error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-1000'>
      <div className='bg-white rounded-lg p-6 w-[90%] sm:w-[600px] shadow-lg'>
        <h2 className='text-[22px] font-semibold'>Create Department</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4 mt-10'>
            <label className='block text-gray-400 mb-2 text-[14px]'>
              Department Name*
            </label>
            <input
              {...register('name')}
              className='border w-full px-3 py-3 rounded-[5px] text-sm text-gray-800 focus:outline-none'
              placeholder='Type department name'
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
            )}
          </div>

          <div className='mb-4'>
            <label className='block text-gray-400 mb-2 text-[14px]'>
              Department Head*
            </label>
            <select
              {...register('headId')}
              className='border w-full px-3 py-3 rounded-[5px] text-sm text-gray-800 focus:outline-none'
              // disabled={loadingEmployees}
            >
              <option value='' disabled hidden>
                {loadingEmployees
                  ? 'Loading employees...'
                  : 'Select department head'}
              </option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {`${employee.firstName} ${employee.lastName}`}
                </option>
              ))}
            </select>
            {errors.headId && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.headId.message}
              </p>
            )}
          </div>

          <div className='flex justify-center items-center w-full gap-6 p-6 mt-32'>
            <button
              type='submit'
              className='px-4 py-3 rounded bg-[#0F172A] text-white text-sm w-full'
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Confirm'}
            </button>
            <button
              type='button'
              onClick={() => setIsModalOpen(false)}
              className='px-4 py-3 rounded border text-sm w-full'
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
