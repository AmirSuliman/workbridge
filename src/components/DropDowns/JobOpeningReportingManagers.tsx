import { getAllEmployees } from '@/services/getAllEmployees';
import { EmployeeData } from '@/types/employee';
import { useEffect, useState } from 'react';

const JobOpeningReportingManagers = ({ errors, register }) => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees(1, 1000, '', true);
        const items = response?.data?.items || []; // Ensure items is an array
        setEmployees(items);
      } catch (error) {
        console.error('Error fetching employees: ', error);
        setEmployees([]); // Ensure employees is always an array
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <select className="form-input" {...register('reportingToEmployeeId')}>
        <option value="">Select Manager</option>
        {employees.map((employee) => (
          <option key={employee.id} value={String(employee.id)}>
            {employee.firstName} {employee.lastName} - {employee.tittle}
          </option>
        ))}
      </select>
      {errors.reportingToEmployeeId && (
        <span className="form-error">
          {errors.reportingToEmployeeId.message}
        </span>
      )}
    </>
  );
};

export default JobOpeningReportingManagers;
