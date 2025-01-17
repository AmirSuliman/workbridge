import { getAllEmployees } from '@/services/getAllEmployees';
import { EmployeeData } from '@/types/employee';
import { useEffect, useState } from 'react';

const EmployeesDropdown = ({ reportingManagerId, register, errors }) => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [defaultManagerId, setDefaultManagerId] = useState<
    string | undefined
  >();

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
          setDefaultManagerId(String(matchedEmployee.id)); // Ensure it's a string
        }
      } catch (error) {
        console.error('Error fetching employees: ', error);
      }
    };

    fetchEmployees();
  }, [reportingManagerId]);

  return (
    <>
      <select
        className="p-3 rounded-md bg-transparent border w-full text-sm text-black"
        {...register('reportingManagerId', {
          required: 'Reporting Manager is required',
        })}
        value={defaultManagerId || ''}
        onChange={(e) => setDefaultManagerId(e.target.value)} // Sync state with selection
      >
        <option value="">Select Manager</option>
        {employees.map((employee) => (
          <option key={employee.id} value={String(employee.id)}>
            {employee.firstName} {employee.lastName} - {employee.tittle}
          </option>
        ))}
      </select>
      {errors.reportingManagerId && (
        <span className="text-red-500 text-xs">
          {errors.reportingManagerId.message}
        </span>
      )}
    </>
  );
};

export default EmployeesDropdown;
