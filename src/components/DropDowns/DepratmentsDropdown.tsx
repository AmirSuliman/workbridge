import axiosInstance from '@/lib/axios';
import { Department } from '@/types/employee';
import { useEffect, useState } from 'react';

const DepratmentDropdown = ({ register, errors }) => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axiosInstance.get('/departments');
        setDepartments(data.data.items);
      } catch (error) {
        console.error('Error fetching Departments: ', error);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <>
      <select
        className="p-3 rounded-md bg-transparent border w-full text-sm text-black"
        {...register('departmentId', {
          required: 'Department is required',
        })}
      >
        <option value="">Select Department</option>
        {departments.map((department) => (
          <option key={department.id} value={Number(department.id)}>
            {department.name}
          </option>
        ))}
      </select>
      {errors.departmentId && (
        <span className="text-red-500">{errors.departmentId.message}</span>
      )}
    </>
  );
};
export default DepratmentDropdown;
