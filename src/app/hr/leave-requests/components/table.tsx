import React, { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Modal from '@/components/modal/Modal';
import ConfirmLeave from './confirmleave';
import Deny from './deny';
import UserImgPlaceholder from '@/components/LeaveRequests/UserImgPlaceholder';
import { getSession } from 'next-auth/react';
import imageLoader from '../../../../../imageLoader';
import { Pagination } from '@/components/common/Pagination';

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
  filter: string | undefined;
  sort: undefined | 'duration' | 'returningDay' | 'leaveDay';
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
  const [totalItems, setTotalItems] = useState(0);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role || null);
    };

    fetchSession();
  }, []);

  const isAdminOrManager = role === 'SuperAdmin' || role === 'Manager';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = {
          page: currentPage,
          size: ITEMS_PER_PAGE,
          sort,
          type: filter,
        };

        const response = await axiosInstance.get('/timeoffs', { params });
        const fetchedData = response.data.data.items || [];

        setEmployeeData(fetchedData);
        setTotalItems(response.data.data.totalItems);
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
    <div className='p-4 mt-8 overflow-x-auto'>
      {isLoading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {!isLoading && !error && (
        <>
          {employeeData.length === 0 ? (
            <p>No data available for the selected filter.</p>
          ) : (
            <table className='w-full '>
              <thead>
                <tr>
                  <th className='font-medium text-gray-400 text-[14px] p-3 text-left'>
                    Employee Name
                  </th>
                  <th className='font-medium text-gray-400 text-[14px] p-3 text-left'>
                    Type
                  </th>
                  <th className='font-medium text-gray-400 text-[14px] p-3 text-center'>
                    Duration
                  </th>
                  <th className='font-medium text-gray-400 text-[14px] p-3 text-center'>
                    Leave Day
                  </th>
                  <th className='font-medium text-gray-400 text-[14px] p-3 text-center'>
                    Returning Day
                  </th>
                  <th className='font-medium text-gray-400 text-[14px] p-3 text-center'></th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee) => (
                  <tr
                    key={employee.id}
                    className='text-center text-[14px] hover:bg-gray-50 border-b'
                  >
                    <td className='p-4 flex items-center gap-3 justify-start whitespace-nowrap'>
                      {employee.employee?.profilePictureUrl ? (
                        <img
                          src={employee.employee?.profilePictureUrl}
                          alt='user'
                          className='w-10 h-10 rounded-full'
                        />
                      ) : (
                        <UserImgPlaceholder
                          name={`${employee.employee?.firstName} ${employee.employee?.lastName}`}
                        />
                      )}
                      <p className='text-left'>
                        {employee
                          ? `${employee.employee?.firstName} ${
                              employee.employee?.middleName || ''
                            } ${employee.employee?.lastName || ''}`
                          : ''}
                      </p>
                    </td>
                    <td className='p-4 whitespace-nowrap text-left'>
                      <span className='flex items-center gap-3'>
                        <Image
                          loader={imageLoader}
                          src={
                            employee.type === 'Vacation'
                              ? '/vaction.png'
                              : '/sickleave.png'
                          }
                          alt='vacation or sick leave'
                          width={25}
                          height={25}
                          className='rounded-full'
                        />
                        <span>{employee.type}</span>
                      </span>
                    </td>
                    <td className='p-4 whitespace-nowrap text-center'>
                      {employee.duration} days
                    </td>
                    <td className='p-4 text-center'>
                      {new Date(employee.leaveDay).toLocaleDateString()}
                    </td>
                    <td className='p-4 text-center'>
                      {new Date(employee.returningDay).toLocaleDateString()}
                    </td>
                    <td className='p-4 flex justify-center items-center whitespace-nowrap gap-2'>
                      {employee.status === 'Pending' ? (
                        isAdminOrManager ? (
                          <>
                            <button
                              className='p-2 text-white bg-[#25A244] rounded text-[10px] flex items-center gap-2'
                              onClick={() => handleConfirmRequest(employee)}
                            >
                              Confirm Request <FaCheck />
                            </button>
                            <button
                              className='p-2 text-white bg-[#F53649] rounded text-[10px] flex items-center gap-2'
                              onClick={() => handleDenyRequest(employee)}
                            >
                              Deny <FaTimes />
                            </button>
                          </>
                        ) : (
                          <span className='font-semibold text-yellow-600 border rounded p-2 px-4 border-yellow-600'>
                            Pending
                          </span>
                        )
                      ) : (
                        <span
                          className={`font-semibold text-[10px] ${
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
        <div className='mt-8 flex justify-between items-center flex-wrap'>
          <p className='text-[13px] text-gray-400 mr-auto'>
            Showing page {currentPage} of {totalPages}
          </p>
          <Pagination
            styles={{ container: 'mt-5 gap-x-2 !justify-end' }}
            totalItems={totalItems || 0}
            pageSize={ITEMS_PER_PAGE}
            currentPage={currentPage}
            maxPagesToShow={2} // Adjust if needed
            setCurrentPage={handlePageChange}
          />
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
