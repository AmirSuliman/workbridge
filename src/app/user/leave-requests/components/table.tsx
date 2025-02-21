import React, { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Modal from '@/components/modal/Modal';
import ConfirmLeave from './confirmleave';
import Deny from './deny';
import UserImgPlaceholder from '@/components/LeaveRequests/UserImgPlaceholder';
const ITEMS_PER_PAGE = 7;

export interface Employee {
  id: number;
  employeeId: number;
  avatar: string;
  name: string;
  vacationType: 'Vacation' | 'Sick';
  duration: number;
  type: string;
  leaveDay: string;
  returningDay: string;
  status: 'Confirmed' | 'Pending' | 'Denied';
  employee: {
    firstName: string;
    middleName?: string | null;
    lastName: string;
    profilePictureUrl: string;
  };
}

type TableProps = {
  filter: string;
  sort: 'default' | 'duration' | 'leaveEarliest' | 'returnEarliest';
};

const Table: React.FC<TableProps> = ({ filter, sort }) => {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = {
          page: currentPage,
          size: ITEMS_PER_PAGE,
          sort,
        };

        const response = await axiosInstance.get('/timeoffs', { params });
        const fetchedData = response.data.data.items || [];

        console.log('Fetched Data:', fetchedData);

        const filteredData =
          filter !== 'All'
            ? fetchedData.filter(
                (employee) =>
                  employee.type.toLowerCase() === filter.toLowerCase()
              )
            : fetchedData;

        console.log('Filtered Data:', filteredData);

        setEmployeeData(filteredData);
        setTotalPages(response.data.data.totalPages || 1);
      } catch (err) {
        setError('Failed to fetch employee data.');
        setEmployeeData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filter, currentPage, sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleConfirmRequest = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsConfirmModalOpen(true);
  };

  const handleDenyRequest = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDenyModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleCloseDenyModal = () => {
    setIsDenyModalOpen(false);
    setSelectedEmployee(null);
  };

  // Callback to update the local state after confirmation
  const updateEmployeeStatus = (
    employeeId: number,
    newStatus: 'Confirmed' | 'Denied'
  ) => {
    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === employeeId
          ? { ...employee, status: newStatus }
          : employee
      )
    );
  };

  return (
    <div className="p-4 mt-8 overflow-x-auto">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && (
        <>
          {employeeData.length === 0 ? (
            <p>No data available for the selected filter.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="font-medium text-gray-400 text-[14px] p-3 text-left">
                    Employee Name
                  </th>
                  <th className="font-medium text-gray-400 text-[14px] p-3 text-left">
                    Type
                  </th>
                  <th className="font-medium text-gray-400 text-[14px] p-3 text-center">
                    Duration
                  </th>
                  <th className="font-medium text-gray-400 text-[14px] p-3 text-center">
                    Leave Day
                  </th>
                  <th className="font-medium text-gray-400 text-[14px] p-3 text-center">
                    Returning Day
                  </th>
                  <th className="font-medium text-gray-400 text-[14px] p-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee) => (
                  <tr
                    key={employee.id}
                    className="text-center text-[14px] hover:bg-gray-50 border-b"
                  >
                    <td className="p-4 flex items-center gap-3 justify-start whitespace-nowrap">
                      {employee.employee.profilePictureUrl ? (
                        <img
                          src={employee.employee.profilePictureUrl}
                          alt="user"
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <UserImgPlaceholder
                          name={`${employee.employee.firstName} ${employee.employee.lastName}`}
                        />
                      )}
                      <p className="text-left">
                        {employee
                          ? `${employee.employee.firstName} ${
                              employee.employee.middleName || ''
                            } ${employee.employee.lastName || ''}`
                          : ''}
                      </p>
                    </td>
                    <td className="p-4 whitespace-nowrap text-left">
                      <span className="flex items-center gap-3">
                        <Image
                          src={
                            employee.type === 'Vacation'
                              ? '/vaction.png'
                              : '/sickleave.png'
                          }
                          alt="vacation or sick leave"
                          width={25}
                          height={25}
                          className="rounded-full"
                        />
                        <span>{employee.type}</span>
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-center">
                      {employee.duration} days
                    </td>
                    <td className="p-4 text-center">
                      {new Date(employee.leaveDay).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center">
                      {new Date(employee.returningDay).toLocaleDateString()}
                    </td>
                    <td className="p-4 flex justify-center items-center whitespace-nowrap gap-2">
                      {employee.status === 'Pending' ? (
                        <>
                          <button
                            className="p-2 text-white bg-[#25A244] rounded text-[10px] flex items-center gap-2"
                            onClick={() => handleConfirmRequest(employee)}
                          >
                            Confirm Request <FaCheck />
                          </button>
                          <button
                            className="p-2 text-white bg-[#F53649] rounded text-[10px] flex items-center gap-2"
                            onClick={() => handleDenyRequest(employee)}
                          >
                            Deny <FaTimes />
                          </button>
                        </>
                      ) : (
                        <span
                          className={`font-semibold ${
                            employee.status === 'Confirmed'
                              ? 'text-green-600 border rounded p-2 px-4 border-green-600'
                              : 'text-red-600 border rounded p-2 px-7 border-red-600'
                          }`}
                        >
                          {employee.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-between items-center">
          <p className="text-[13px] text-gray-400">
            Showing page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              className="p-2 border bg-gray-200 rounded-lg"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <BiChevronLeft size={24} />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`p-2 border w-10 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-black text-white'
                    : 'hover:bg-black hover:text-white'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="p-2 border bg-gray-200 rounded-lg"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <BiChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {isConfirmModalOpen && (
        <Modal onClose={handleCloseConfirmModal}>
          {selectedEmployee && (
            <ConfirmLeave
              timeOffRequestId={selectedEmployee.id}
              onClose={handleCloseConfirmModal}
              onConfirm={() =>
                updateEmployeeStatus(selectedEmployee.id, 'Confirmed')
              }
            />
          )}
        </Modal>
      )}

      {isDenyModalOpen && selectedEmployee && (
        <Modal onClose={handleCloseDenyModal}>
          <Deny
            timeOffRequestId={selectedEmployee.id}
            onClose={handleCloseDenyModal}
            onDeny={() => updateEmployeeStatus(selectedEmployee.id, 'Denied')}
          />
        </Modal>
      )}
    </div>
  );
};

export default Table;
