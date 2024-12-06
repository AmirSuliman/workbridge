'use client';
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const Addemployee = ({ setIsModalOpen,  EmployeeName, setEmployeeName, handleAddEmployee }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [localEmployees, setLocalEmployees] = useState([]); 
  
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
        console.log(response, 'res');
        const employeesData = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setLocalEmployees(employeesData); 
      } catch (error) {
        console.error('Error fetching employees:', error);
        alert('Failed to fetch employees. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const renderEmployeeSelect = () => {
    if (isLoading) {
      return <option>Loading employees...</option>;
    }
    if (!localEmployees.length) {
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
              value={EmployeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="border w-full px-3 py-3 rounded-[5px] text-sm text-gray-400"
            >
              <option value="">Select employee</option>
              {renderEmployeeSelect()}
            </select>
          </div>

          <div className="flex justify-center items-center gap-6 p-6 mt-52">
            <button
              type="button"
              onClick={handleAddEmployee}
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
