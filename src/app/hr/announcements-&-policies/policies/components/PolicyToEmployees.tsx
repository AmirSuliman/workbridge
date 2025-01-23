import Button from '@/components/Button';
import axiosInstance from '@/lib/axios';
import { getAllEmployees } from '@/services/getAllEmployees';
import { EmployeeData } from '@/types/employee';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';

interface PolicyToEmployeesProps {
  onClose: () => void;
  postPolicy: () => Promise<void>;
}

const PolicyToEmployees: React.FC<PolicyToEmployeesProps> = ({
  onClose,
  postPolicy,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const { data } = await getAllEmployees(1, 1000000);
        setEmployees(data.items);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      employeeIds: [] as number[],
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await postPolicy();

      const response = await axiosInstance.post('/policy/send/', {
        policyId: sessionStorage.getItem('policy'),
        employeeIds: data.employeeIds,
        departmentId: null,
      });

      toast.success('Policy sent successfully!');
      setLoading(false);
      onClose();
      router.back();
      console.log('Send policy response:', response.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to send policy.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Select Employees
          </label>
          <Controller
            name="employeeIds"
            control={control}
            render={({ field }) => (
              <div>
                {employees.map((employee) => (
                  <div key={employee.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      value={employee.id}
                      checked={field.value.includes(employee.id)}
                      onChange={(e) => {
                        const selectedIds = field.value;
                        if (e.target.checked) {
                          field.onChange([
                            ...selectedIds,
                            Number(e.target.value),
                          ]);
                        } else {
                          field.onChange(
                            selectedIds.filter(
                              (id) => id !== Number(e.target.value)
                            )
                          );
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
        </div>

        <div className="flex items-center gap-4 justify-center mt-4 mb-0">
          <Button
            type="submit"
            disabled={loading}
            name={loading ? '' : 'Confirm'}
            icon={
              loading && (
                <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
              )
            }
            className="disabled:cursor-not-allowed"
          />
          <Button
            onClick={onClose}
            bg="transparent"
            textColor="black"
            name="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

export default PolicyToEmployees;
