import { getAllEmployees } from '@/services/getAllEmployees';
import { EmployeeData } from '@/types/employee';
import { useEffect, useState } from 'react';

const EmployeesDropdown = ({
  errors,
  register,
  resetField,
  reportingManagerId,
}) => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getAllEmployees(1, 1000);
        setEmployees(data.items);
        // Find and set the default manager ID
        const matchedEmployee = data.items.find(
          (employee) => employee.id === reportingManagerId
        );
        if (matchedEmployee) {
          resetField('reportingManagerId');
        }
      } catch (error) {
        console.error('Error fetching employees: ', error);
      }
    };

    fetchEmployees();
  }, [reportingManagerId, resetField]);

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
      {errors.reportingManagerId && (
        <span className="form-error">{errors.reportingManagerId.message}</span>
      )}
    </>
  );
};

export default EmployeesDropdown;
