import { getAllEmployees } from '@/services/getAllEmployees';
import { EmployeeData } from '@/types/employee';
import { useEffect, useState } from 'react';

// This is used to retain the data if we change the tabs (personal/employment)
const cache = {
  employees: [],
};

const EmployeesDropdown = ({
  errors,
  register,
  resetField,
  reportingManagerId,
}) => {
  const [employees, setEmployees] = useState<EmployeeData[]>(cache.employees);

  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     try {
  //       const response = await getAllEmployees(1, 1000, '', true);
  //       const items = response?.data?.items || []; // Ensure items is an array
  //       setEmployees(items);
  //     } catch (error) {
  //       console.error('Error fetching employees: ', error);
  //       setEmployees([]); // Ensure employees is always an array
  //     }
  //   };

  //   fetchEmployees();
  // }, []);
  useEffect(() => {
    const fetchEmployees = async () => {
      // Only fetch if cache is empty
      if (cache.employees.length === 0) {
        try {
          const response = await getAllEmployees(1, 1000, '', true);
          const items = response?.data?.items || [];
          setEmployees(items);
          cache.employees = items; // Store in cache
        } catch (error) {
          console.error('Error fetching employees: ', error);
        }
      }
    };

    fetchEmployees();
  }, []);

  // useEffect(() => {
  //   if (reportingManagerId && employees.length > 0) {
  //     const matchedDepartment = employees.find(
  //       (employee) => employee.id === reportingManagerId
  //     );
  //     if (matchedDepartment) {
  //       resetField('reportingManagerId');
  //     }
  //   }
  // }, [employees, reportingManagerId, resetField]);

  return (
    <>
      <select className="form-input" {...register('reportingManagerId')}>
        <option value="">Select Manager</option>
        {employees.map((employee) => (
          <option key={employee.id} value={String(employee.id)}>
            {employee.firstName} {employee.lastName} - {employee.tittle}
          </option>
        ))}
      </select>
      {errors?.reportingManagerId && (
        <span className="form-error">{errors.reportingManagerId.message}</span>
      )}
    </>
  );
};

export default EmployeesDropdown;
