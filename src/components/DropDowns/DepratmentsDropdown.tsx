import axiosInstance from '@/lib/axios';
import { Department } from '@/types/employee';
import { useEffect, useState } from 'react';

const DepartmentDropdown = ({ departmentId, register, errors }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [defaultDepartmentId, setDefaultDepartmentId] = useState<
    string | undefined
  >(departmentId?.toString());

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axiosInstance.get('/departments');
        setDepartments(data.data.items);

        // Set the default department ID if departmentId exists
        if (departmentId) {
          const matchedDepartment = data.data.items.find(
            (department) => department.id === departmentId
          );
          if (matchedDepartment) {
            setDefaultDepartmentId(String(matchedDepartment.id));
            // trigger('departmentId'); // Trigger validation AFTER setting the default value
          }
        }
      } catch (error) {
        console.error('Error fetching Departments: ', error);
      }
    };

    fetchDepartments();
  }, [departmentId]);

  const handleDepartmentChange = (e) => {
    const selectedValue = e.target.value;
    setDefaultDepartmentId(selectedValue);
    console.log('Selected Department ID:', selectedValue); // Log the selected value
  };

  return (
    <>
      <select
        className="form-input"
        {...register('departmentId')}
        value={defaultDepartmentId || ''}
        onChange={handleDepartmentChange}
      >
        <option value="">Select Department</option>
        {departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.name}
          </option>
        ))}
      </select>
      {errors.departmentId && (
        <p className="form-error">{errors.departmentId.message}</p>
      )}
    </>
  );
};

export default DepartmentDropdown;
