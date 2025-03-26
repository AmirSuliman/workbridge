'use client';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import axios from 'axios';
import Select from 'react-select';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}

interface EmployeeData extends Employee {
  parentId: number | null;
  countryId: number | null;
  isManager: boolean;
  userId: number | null;
  email?: string;
  phone?: string;
}

interface AddEmployeeProps {
  setIsModalOpen: (isOpen: boolean) => void;
  onEmployeeAdded;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ setIsModalOpen, onEmployeeAdded }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localEmployees, setLocalEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const departmentId = Number(params.id);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/employees');
        const employeesData = Array.isArray(response.data?.data?.items)
          ? response.data.data.items
          : [];
        setLocalEmployees(employeesData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAdd = async () => {
    if (selectedEmployeeIds.length === 0) {
      setError('Please select at least one employee.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = { employeeIds: selectedEmployeeIds };
      await axiosInstance.put(`/department/${departmentId}/assignEmployees`, payload);

      const newlyAddedEmployees: EmployeeData[] = localEmployees
        .filter((emp) => selectedEmployeeIds.includes(emp.id))
        .map((emp) => ({
          ...emp,
          parentId: null, // Default values for missing fields
          countryId: null,
          isManager: false,
          userId: null,
          email: '',
          phone: '',
        }));

      onEmployeeAdded(newlyAddedEmployees);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding employee:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server Response:', error.response.data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-1000">
      <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[600px] shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-[22px] font-semibold">Add Employee</h2>
          <button onClick={() => setIsModalOpen(false)}>
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4 mt-10">
            <label className="block text-gray-400 mb-2 text-[14px]">
              Employee
            </label>
            <Select
              isMulti
              options={localEmployees.map((employee) => ({
                value: employee.id,
                label: `${employee.firstName} ${employee.lastName}`,
              }))}
              value={localEmployees
                .filter((emp) => selectedEmployeeIds.includes(emp.id))
                .map((emp) => ({
                  value: emp.id,
                  label: `${emp.firstName} ${emp.lastName}`,
                }))}
              onChange={(selectedOptions) => {
                setSelectedEmployeeIds(selectedOptions.map((opt) => opt.value));
                if (selectedOptions.length > 0) setError(null);
              }}
              className="w-full px-3 py-3 rounded-[5px] text-sm text-gray-400"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="flex justify-center items-center gap-6 p-6 mt-52">
            <button
              type="button"
              onClick={handleAdd}
              disabled={isSubmitting}
              className={`px-4 py-3 rounded text-white text-sm w-full ${
                isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#0F172A]'
              }`}
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-3 rounded border text-sm w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
