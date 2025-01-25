import axiosInstance from '@/lib/axios';
import { Department } from '@/types/employee';
import { useEffect, useState } from 'react';

const DepartmentDropdown = ({ departmentId, register, errors }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [defaultDepartmentId, setDefaultDepartmentId] = useState<
    string | undefined
  >();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axiosInstance.get('/departments');
        setDepartments(data.data.items);

        // Find and set the default department ID
        const matchedDepartment = data.data.items.find(
          (department) => department.id === departmentId
        );
        if (matchedDepartment) {
          setDefaultDepartmentId(String(matchedDepartment.id)); // Ensure it's a string
        }
      } catch (error) {
        console.error('Error fetching Departments: ', error);
      }
    };

    fetchDepartments();
  }, [departmentId]);

  return (
    <>
      <select
        className="p-3 rounded-md bg-transparent border w-full text-sm text-black"
        {...register('departmentId', { valueAsNumer: false })}
        value={defaultDepartmentId?.toString() || ''}
        onChange={(e) => setDefaultDepartmentId(e.target.value)}
      >
        <option value="">Select Department</option>
        {departments.map((department) => (
          <option key={department.id} value={String(department.id)}>
            {department.name}
          </option>
        ))}
      </select>
      {errors.departmentId && (
        <p className="text-red-500 text-xs">{errors.departmentId.message}</p>
      )}
    </>
  );
};

export default DepartmentDropdown;
