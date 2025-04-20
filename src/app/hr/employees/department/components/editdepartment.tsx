'use client';

import { IoMdClose } from 'react-icons/io';
import axiosInstance from '@/lib/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
interface EditDepartmentProps {
  setIsModalOpen1: (isOpen: boolean) => void;
}

const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  headId: z.string().min(1, 'Department head is required'),
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

const EditDepartment: React.FC<EditDepartmentProps> = ({ setIsModalOpen1 }) => {
  const { id } = useParams<{ id: string }>();
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loadingDepartment, setLoadingDepartment] = useState(false);
  const router = useRouter();
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    // defaultValues: {
    //   name: '',
    //   headId: '',
    // },
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      if (!id) return;
      setLoadingDepartment(true);
      try {
        const response = await axiosInstance.get(`/department/${id}`);
        const { name, employeeId } = response.data.data;
        console.log('name: ', name, 'head: ', employeeId);
        setValue('name', name);
        setValue('headId', employeeId);
      } catch (error) {
        console.error('Error fetching department:', error);
        toast.error('Failed to load department details. Please try again.');
      } finally {
        setLoadingDepartment(false);
      }
    };
    fetchDepartment();
  }, [id, setValue]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoadingEmployees(true);
      try {
        const response = await axiosInstance.get('/employees');
        setEmployees(response.data.data.items);
      } catch (error) {
        console.error('Error fetching employees:', error);
        toast.error('Failed to load employees. Please try again.');
      } finally {
        setLoadingEmployees(false);
      }
    };
    fetchEmployees();
  }, []);

  const onSubmit = async (data: DepartmentFormValues) => {
    try {
      await axiosInstance.put(`/department/${id}`, {
        name: data.name,
        employeeId: data.headId,
      });
      toast.success('Department updated successfully!');
      setIsModalOpen1(false);
      router.back();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Some error occurred.');
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-1000'>
      <div className='bg-white rounded-lg p-6 w-[90%] sm:w-[600px] shadow-lg'>
        <div className='flex justify-between items-center'>
          <h2 className='text-[22px] font-semibold'>Edit Department</h2>
          <button onClick={() => setIsModalOpen1(false)}>
            <IoMdClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4 mt-10'>
            <label className='block text-gray-400 mb-2 text-[14px]'>
              Department Name*
            </label>
            <input
              type='text'
              className='border w-full px-3 py-3 rounded-[5px] text-sm text-gray-800 focus:outline-none'
              placeholder='Type department name'
              {...register('name')}
              disabled={loadingDepartment}
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2 text-[14px]'>
              Department Head*
            </label>
            <select
              className='border w-full px-3 py-3 rounded-[5px] text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400'
              {...register('headId')}
              disabled={loadingEmployees || loadingDepartment}
            >
              <option value='' disabled hidden>
                {loadingEmployees
                  ? 'Loading employees...'
                  : 'Select department head'}
              </option>
              {employees.length > 0
                ? employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {`${employee.firstName} ${employee.lastName}`}
                    </option>
                  ))
                : !loadingEmployees && (
                    <option disabled>No employees found</option>
                  )}
            </select>
            {errors.headId && (
              <p className='text-red-500 text-sm'>{errors.headId.message}</p>
            )}
          </div>
          <div className='flex justify-center items-center gap-6 p-6 mt-24'>
            <button
              type='submit'
              className='px-4 py-3 rounded bg-[#0F172A] text-white text-sm w-full'
              disabled={isSubmitting || loadingDepartment || loadingEmployees}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
            <button
              type='button'
              onClick={() => setIsModalOpen1(false)}
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

export default EditDepartment;
