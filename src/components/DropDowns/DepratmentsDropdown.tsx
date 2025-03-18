import axiosInstance from '@/lib/axios';
import { Department } from '@/types/employee';
import { useEffect, useState } from 'react';

// This is used to retain the data if we change the tabs (personal/employment)
const cache = {
  departments: [],
};

const DepartmentDropdown = ({ departmentId, resetField, register, errors }) => {
  const [departments, setDepartments] = useState<Department[]>(
    cache.departments
  );

  // useEffect(() => {
  //   const fetchDepartments = async () => {
  //     try {
  //       const { data } = await axiosInstance.get('/departments');
  //       setDepartments(data.data.items);
  //     } catch (error) {
  //       console.error('Error fetching Departments: ', error);
  //     }
  //   };

  //   fetchDepartments();
  // }, []);
  useEffect(() => {
    const fetchDepartments = async () => {
      // Only fetch if cache is empty
      if (cache.departments.length === 0) {
        try {
          const { data } = await axiosInstance.get('/departments');
          const items = data.data.items;
          setDepartments(items);
          cache.departments = items; // Store in cache
        } catch (error) {
          console.error('Error fetching Departments: ', error);
        }
      }
    };

    fetchDepartments();
  }, []);

  return (
    <>
      <select className="form-input" {...register('departmentId')}>
        <option value="">Select Department</option>
        {departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.name}
          </option>
        ))}
      </select>
      {errors?.departmentId && (
        <p className="form-error">{errors?.departmentId.message}</p>
      )}
    </>
  );
};

export default DepartmentDropdown;
