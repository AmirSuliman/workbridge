'use client';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import axios from 'axios';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}

interface AddEmployeeProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const Addemployee: React.FC<AddEmployeeProps> = ({ setIsModalOpen }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [localEmployees, setLocalEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

  // Fetch the departmentId from the URL
  const params = useParams();
  const departmentId = Number(params.id);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/employees', {
          params: {
            page: 1,
            size: 10,
            associations: 'true',
          },
        });

        const employeesData = Array.isArray(response.data?.data?.items)
          ? response.data.data.items
          : [];

        if (employeesData.length) {
          setLocalEmployees(employeesData);
        } else {
          console.warn('No employees found in API response.');
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAdd = async () => {
    if (!selectedEmployeeId) {
      console.warn('Please select an employee.');
      return;
    }

    try {
      const payload = { employeeIds: [selectedEmployeeId] };
      console.log('Payload being sent:', payload);

      await axiosInstance.put(`/department/${departmentId}/assignEmployees`, payload);
      console.log('Employee added successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding employee:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server Response:', error.response.data);
      }
    }
  };

  const renderEmployeeSelect = () => {
    if (isLoading) {
      return <option>Loading employees...</option>;
    }
    if (localEmployees.length === 0) {
      return <option>No employees available</option>;
    }
    return localEmployees.map((employee) => (
      <option key={employee.id} value={employee.id}>
        {employee.firstName} {employee.lastName}
      </option>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-1000">
      <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[600px] shadow-lg h-[70vh]">
        <div className="flex justify-between items-center">
          <h2 className="text-[22px] font-semibold">Add Employee</h2>
          <button onClick={() => setIsModalOpen(false)}>
            <IoMdClose size={24} />
          </button>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4 mt-10">
            <label className="block text-gray-400 mb-2 text-[14px]">Employee</label>
            <select
              value={selectedEmployeeId || ''}
              onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
              className="border w-full px-3 py-3 rounded-[5px] text-sm text-gray-400"
            >
              <option value="">Select employee</option>
              {renderEmployeeSelect()}
            </select>
          </div>

          <div className="flex justify-center items-center gap-6 p-6 mt-52">
            <button
              type="button"
              onClick={handleAdd}
              className="px-4 py-3 rounded bg-[#0F172A] text-white text-sm w-full"
            >
              Add
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

export default Addemployee;
