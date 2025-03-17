import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import axiosInstance from '@/lib/axios';
import { getAllEmployees } from '@/services/getAllEmployees';
import { EmployeeData } from '@/types/employee';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import Button from '@/components/Button';

interface PolicyToEmployeesProps {
  onClose: () => void;
  postPolicy: () => Promise<void>;
}

const PolicyToEmployees: React.FC<PolicyToEmployeesProps> = ({ onClose, postPolicy }) => {
  const router = useRouter();
  const [loadingEmployees, setLoadingEmployees] = useState(true); // State for fetching employees
  const [submitting, setSubmitting] = useState(false); // State for form submission
  const [employees, setEmployees] = useState<EmployeeData[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoadingEmployees(true);
        const { data } = await getAllEmployees(1, 1000000);
        setEmployees(data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingEmployees(false);
      }
    };
    fetchEmployees();
  }, []);

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      employeeIds: [] as number[],
    },
  });

  const selectedEmployeeIds = watch("employeeIds");
  const isAllSelected = employees.length > 0 && selectedEmployeeIds.length === employees.length;

  const handleSelectAll = () => {
    setValue("employeeIds", isAllSelected ? [] : employees.map((emp) => emp.id));
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      await postPolicy();
      await axiosInstance.post('/policy/send/', {
        policyId: sessionStorage.getItem('policy'),
        employeeIds: data.employeeIds,
      });

      toast.success('Policy sent successfully!');
      onClose();
      router.back();
    } catch (error) {
      console.error(error);
      toast.error(
        isAxiosError(error) && error.response
          ? error.response.data.message
          : 'Failed to send policy.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Select Employees
          </label>

          {loadingEmployees ? (
            <div className="flex justify-center my-4">
              <BiLoaderCircle className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <>
              {employees.length > 0 && (
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    id="selectAll"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="mr-2"
                  />
                  <label htmlFor="selectAll" className="text-sm font-semibold">
                    Select All
                  </label>
                </div>
              )}

              <Controller
                name="employeeIds"
                control={control}
                render={({ field }) => (
                  <div className="max-h-44 overflow-y-auto">
                    {employees.map((employee) => (
                      <div key={employee.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          value={employee.id}
                          checked={field.value.includes(employee.id)}
                          onChange={(e) => {
                            const selectedIds = field.value;
                            if (e.target.checked) {
                              field.onChange([...selectedIds, Number(e.target.value)]);
                            } else {
                              field.onChange(selectedIds.filter((id) => id !== Number(e.target.value)));
                            }
                          }}
                          id={`employee-${employee.id}`}
                          className="mr-2"
                        />
                        <label htmlFor={`employee-${employee.id}`}>
                          {employee.firstName} {employee.lastName}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              />
            </>
          )}
        </div>

        
        <div className="flex items-center gap-4 justify-center mt-4 mb-0">
          <Button
            type="submit"
            disabled={submitting || loadingEmployees}
            name={submitting ? '' : 'Confirm'}
            icon={submitting && <BiLoaderCircle className="h-5 w-5 animate-spin" />}
            className="disabled:cursor-not-allowed"
          />
          <Button onClick={onClose} bg="transparent" textColor="black" name="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default PolicyToEmployees;
