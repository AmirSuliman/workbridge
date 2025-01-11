'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import * as yup from 'yup';
import axios from 'axios';

interface Employee {
  id: string;
  name:string;
  firstName: string;
  lastName: string;
  employeeId: number;
}

interface ErrorDetails {
  [key: string]: string;
}

const CreateDepartment = ({ isModalOpen, setIsModalOpen }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [employeeError, setEmployeeError] = useState('');
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedEmployeeName, setSelectedEmployeeName] = useState('');

  const departmentSchema = yup.object().shape({
    name: yup.string().required('Department name is required'),
    headId: yup.string().required('Department head is required'),
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoadingEmployees(true);
      setEmployeeError('');
      try {
        const response = await axiosInstance.get('/employees');
        console.log('Employees data:', response.data);
        setEmployees(response.data.data.items);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setEmployeeError('Failed to load employees. Please try again.');
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddDepartment = async () => {
    try {
      console.log('Form Data:', {
        name: departmentName,
        employeeId: selectedEmployeeId,
      });

      await departmentSchema.validate(
        { name: departmentName, headId: selectedEmployeeId },
        { abortEarly: false }
      );
      setErrorMessage('');
      setEmployeeError('');

      if (!selectedEmployeeId) {
        setEmployeeError('Please select a department head.');
        return;
      }

      setIsLoading(true);

      console.log('Selected Employee ID:', selectedEmployeeId);

      const response = await axiosInstance.post('/department', {
        name: departmentName,
        employeeId: selectedEmployeeId,
      });

      console.log('Department created successfully:', response.data);

      setDepartmentName('');
      setSelectedEmployeeId('');
      setSelectedEmployeeName('');
      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorDetails: ErrorDetails = error.inner.reduce((acc: ErrorDetails, curr) => {
          acc[curr.path as string] = curr.message;
          return acc;
        }, {});
        if (errorDetails.name) setErrorMessage(errorDetails.name);
        if (errorDetails.headId) setEmployeeError(errorDetails.headId);
      } else if (axios.isAxiosError(error)) {
        console.error('Server error:', error.response?.data || error.message);
        setErrorMessage('An error occurred while creating the department. Please try again.');
      } else {
        console.error('Unexpected error:', error);
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-1000">
      <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[600px] shadow-lg">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-[22px] font-semibold">Create Department</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4 mt-10">
            <label className="block text-gray-400 mb-2 text-[14px]">Department Name*</label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="border w-full px-3 py-3 rounded-[5px] text-sm text-gray-800 focus:outline-none"
              placeholder="Type department name"
            />
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2 text-[14px]">Department Head*</label>
            <select
              className="border w-full px-3 py-3 rounded-[5px] text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedEmployeeId}
              onChange={(e) => {
                const employeeId = e.target.value;
                const employeeName = employees.find((emp) => emp.id === employeeId)?.name || '';
                setSelectedEmployeeId(employeeId);
                setSelectedEmployeeName(employeeName);
              }}
              disabled={loadingEmployees}
            >
              <option value="" disabled hidden>
                {loadingEmployees ? 'Loading employees...' : 'Select department head'}
              </option>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {`${employee.firstName} ${employee.lastName}`}
                  </option>
                ))
              ) : (
                !loadingEmployees && <option disabled>No employees found</option>
              )}
            </select>
            {employeeError && <p className="text-red-500 text-sm mt-1">{employeeError}</p>}
          </div>

          <div className="flex justify-center items-center flex-row w-full gap-6 p-6 mt-32">
            <button
              type="button"
              onClick={handleAddDepartment}
              className="px-4 py-3 rounded bg-[#0F172A] text-white text-sm w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Confirm'}
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

export default CreateDepartment;
