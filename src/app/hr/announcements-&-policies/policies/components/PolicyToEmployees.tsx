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
import Select from 'react-select';

interface PolicyToEmployeesProps {
  onClose: () => void;
  postPolicy: () => Promise<void>;
}

const PolicyToEmployees: React.FC<PolicyToEmployeesProps> = ({ onClose, postPolicy }) => {
  const router = useRouter();
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  const employeeOptions = employees.map((emp) => ({
    value: emp.id,
    label: `${emp.firstName} ${emp.lastName}`,
  }));

  const isAllSelected = employees.length > 0 && selectedEmployeeIds.length === employees.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setValue("employeeIds", []);
    } else {
      setValue("employeeIds", employeeOptions.map((option) => option.value));
    }
  };

  const onSubmit = async (data: { employeeIds: number[] }) => {
    if (!data.employeeIds || data.employeeIds.length === 0) {
      toast.error("Please select at least one employee.");
      return;
    }
  
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
                  <Select
                    {...field}
                    options={employeeOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    placeholder="Select employees..."
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) =>
                      field.onChange(selectedOptions.map((option) => option.value))
                    }
                    value={employeeOptions.filter((option) =>
                      selectedEmployeeIds.includes(option.value)
                    )}
                  />
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
