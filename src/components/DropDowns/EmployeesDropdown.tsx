import { getAllEmployees } from '@/services/getAllEmployees';
import { EmployeeData } from '@/types/employee';
import { useEffect, useState } from 'react';

const EmployeesDropdown = ({ register, errors }) => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getAllEmployees(1, 1000);
        setEmployees(data.items);
      } catch (error) {
        console.error('Error fetching employees: ', error);
      }
    };

    fetchEmployees();
  }, []);
  return (
    <>
      <select
        className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
        {...register('reportingManagerId', {
          required: 'Reporting Manager is required',
        })}
      >
        <option value="">Select Manager</option>
        {employees.map((employee) => (
          <option key={employee.id} value={Number(employee.id)}>
            {employee.firstName} {employee.lastName} - {employee.tittle}
          </option>
        ))}
      </select>
      {errors.reportingManagerId && (
        <span className="text-red-500">
          {errors.reportingManagerId.message}
        </span>
      )}
    </>
  );
};
export default EmployeesDropdown;
