'use client';
import { IoMdClose } from "react-icons/io";
import axiosInstance from "@/lib/axios";  // Assuming axiosInstance is set up correctly
import * as yup from 'yup';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast from 'react-hot-toast'
interface EditDepartmentProps {
  setIsModalOpen1: (isOpen: boolean) => void;
}

const EditDepartment: React.FC<EditDepartmentProps> = ({ setIsModalOpen1 }) => {
  const { id } = useParams<{ id: string }>(); // Extract department id from URL params

  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]); // Adjusted typing for employees
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [loadingDepartment, setLoadingDepartment] = useState(false);
  const [error, setError] = useState('');

  // Validation schema
  const departmentSchema = yup.object().shape({
    name: yup.string().required('Department name is required'),
    headId: yup.string().required('Department head is required'),
  });

  // Fetch department details
  useEffect(() => {
    const fetchDepartment = async () => {
      if (!id) return;
      setLoadingDepartment(true);
      try {
        const response = await axiosInstance.get(`/department/${id}`);
        const { name, headId } = response.data.data;
        setDepartmentName(name);
        setSelectedEmployeeId(headId);
      } catch (error) {
        console.error('Error fetching department:', error);
        setError('Failed to load department details. Please try again.');
      } finally {
        setLoadingDepartment(false);
      }
    };

    fetchDepartment();
  }, [id]);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoadingEmployees(true);
      try {
        const response = await axiosInstance.get('/employees');
        setEmployees(response.data.data.items);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Failed to load employees. Please try again.');
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await departmentSchema.validate({ name: departmentName, headId: selectedEmployeeId });
      await axiosInstance.put(`/department/${id}`, {
        name: departmentName,
        employeeId: selectedEmployeeId,
      });
      toast.success('Department updated successfully!');
      setIsModalOpen1(false);
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        setError(error.message); 
      } else {
        console.error('Error updating department:', error);
        setError('Failed to update department. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-1000">
      <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[600px] shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-[22px] font-semibold">Edit Department</h2>
          <button onClick={() => setIsModalOpen1(false)}>
            <IoMdClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-10">
            <label className="block text-gray-400 mb-2 text-[14px]">Department Name*</label>
            <input
              type="text"
              className="border w-full px-3 py-3 rounded-[5px] text-sm text-gray-800 focus:outline-none"
              placeholder="Type department name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              disabled={loadingDepartment}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2 text-[14px]">Department Head*</label>
            <select
              className="border w-full px-3 py-3 rounded-[5px] text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              disabled={loadingEmployees || loadingDepartment}
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
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-center items-center gap-6 p-6 mt-24">
            <button
              type="submit"
              className="px-4 py-3 rounded bg-[#0F172A] text-white text-sm w-full"
              disabled={loadingDepartment || loadingEmployees}
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen1(false)}
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

export default EditDepartment;
