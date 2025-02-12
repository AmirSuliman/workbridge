import { getAllEmployees } from '@/services/getAllEmployees';
import { EmployeeData } from '@/types/employee';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const ManagersDropdown = ({
  errors,
  register,
  resetField,
  reportingManagerId,
  onSelect,
}) => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees(1, 1000, '', true);
        const items = response?.data?.items || [];
        setEmployees(items);

        if (reportingManagerId && Array.isArray(reportingManagerId)) {
          const matchedEmployees = items.filter((employee) =>
            reportingManagerId.includes(employee.id)
          );
          if (matchedEmployees.length) {
            resetField('reportingManagerId');
          }
        }
      } catch (error) {
        console.error('Error fetching employees: ', error);
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, [reportingManagerId, resetField]);

  const handleChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    onSelect(selectedIds);
    register('reportingManagerId').onChange({ target: { value: selectedIds } });
  };

  const employeeOptions = employees.map((employee) => ({
    value: employee.id,
    label: `${employee.firstName} ${employee.lastName} - ${employee.tittle}`,
  }));

  return (
    <>
      <Select
        options={employeeOptions}
        isMulti
        onChange={handleChange}
        className="w-[300px] border rounded"
        defaultValue={
          reportingManagerId
            ? employeeOptions.filter((option) =>
                reportingManagerId.includes(option.value)
              )
            : []
        }
      />
      {errors.reportingManagerId && (
        <span className="form-error">{errors.reportingManagerId.message}</span>
      )}
    </>
  );
};

export default ManagersDropdown;
