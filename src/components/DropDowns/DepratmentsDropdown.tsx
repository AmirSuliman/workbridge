import axiosInstance from '@/lib/axios';
import { Department } from '@/types/employee';
import { useEffect, useState } from 'react';

const DepartmentDropdown = ({ departmentId, resetField, register, errors }) => {
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

  useEffect(() => {
    if (departmentId && departments.length > 0) {
      const matchedDepartment = departments.find(
        (department) => department.id === departmentId
      );
      if (matchedDepartment) {
        resetField('departmentId');
      }
    }
  }, [departments, departmentId, resetField]);

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
