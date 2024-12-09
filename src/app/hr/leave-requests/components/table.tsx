'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Modal from '@/components/modal/Modal';
import ConfirmLeave from './confirmleave';
import Deny from './deny';

const ITEMS_PER_PAGE = 7;

const Table = ({ filter, sort }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const employeeData = [
    { id: 1, avatar: '/user.png', name: 'John Doe', vacationType: 'Vacation', duration: 5, leaveDay: '2024-07-01', returningDay: '2024-07-06', allowance: 'Approved' },
    { id: 2, avatar: '/user.png', name: 'Jane Smith', vacationType: 'Sick Leave', duration: 2, leaveDay: '2024-06-15', returningDay: '2024-06-17', allowance: 'Pending' },
    { id: 3, avatar: '/user.png', name: 'Michael Brown', vacationType: 'Vacation', duration: 3, leaveDay: '2024-08-10', returningDay: '2024-08-13', allowance: 'Approved' },
    { id: 4, avatar: '/user.png', name: 'Emily Clark', vacationType: 'Sick Leave', duration: 1, leaveDay: '2024-06-20', returningDay: '2024-06-21', allowance: 'Approved' },
    { id: 5, avatar: '/user.png', name: 'Anna Doe', vacationType: 'Sick Leave', duration: 1, leaveDay: '2024-06-20', returningDay: '2024-06-21', allowance: 'Approved' },
    { id: 6, avatar: '/user.png', name: 'John Doe', vacationType: 'Vacation', duration: 5, leaveDay: '2024-07-01', returningDay: '2024-07-06', allowance: 'Approved' },
    { id: 7, avatar: '/user.png', name: 'Jane Smith', vacationType: 'Sick Leave', duration: 2, leaveDay: '2024-06-15', returningDay: '2024-06-17', allowance: 'Pending' },
    { id: 8, avatar: '/user.png', name: 'Michael Brown', vacationType: 'Vacation', duration: 3, leaveDay: '2024-08-10', returningDay: '2024-08-13', allowance: 'Approved' },
    { id: 9, avatar: '/user.png', name: 'Emily Clark', vacationType: 'Sick Leave', duration: 1, leaveDay: '2024-06-20', returningDay: '2024-06-21', allowance: 'Approved' },
    { id: 10, avatar: '/user.png', name: 'Anna Doe', vacationType: 'Sick Leave', duration: 1, leaveDay: '2024-06-20', returningDay: '2024-06-21', allowance: 'Approved' },
  ];

  const filteredEmployees = useMemo(() => {
    if (filter === 'All') return employeeData;
    return employeeData.filter((employee) => employee.vacationType === filter);
  }, [filter, employeeData]);

  const sortedEmployees = useMemo(() => {
    const employees = [...filteredEmployees];
    switch (sort) {
      case 'duration':
        return employees.sort((a, b) => a.duration - b.duration);
      case 'leaveEarliest':
        return employees.sort((a, b) => new Date(a.leaveDay) - new Date(b.leaveDay));
      case 'returnEarliest':
        return employees.sort((a, b) => new Date(a.returningDay) - new Date(b.returningDay));
      default:
        return employees;
    }
  }, [filteredEmployees, sort]);

  const totalPages = Math.ceil(sortedEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = sortedEmployees.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleConfirmRequest = (employee) => {
    setSelectedEmployee(employee);
    setIsConfirmModalOpen(true);
  };

  const handleDenyRequest = (employee) => {
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

  return (
    <div className="p-4 mt-8">
      <table className="w-full">
        <thead>
          <tr>
            <th className="font-medium text-gray-400 text-[14px] p-3">Employee Name</th>
            <th className="font-medium text-gray-400 text-[14px] p-3">Vacation Type</th>
            <th className="font-medium text-gray-400 text-[14px] p-3">Duration</th>
            <th className="font-medium text-gray-400 text-[14px] p-3">Leave Day</th>
            <th className="font-medium text-gray-400 text-[14px] p-3">Returning Day</th>
            <th className="font-medium text-gray-400 text-[14px] p-3"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map((employee) => (
            <tr key={employee.id} className="text-center text-[14px] hover:bg-gray-50 border-b">
              <td className="p-4 flex items-center gap-3 justify-start">
                <Image src={employee.avatar} alt={employee.name} width={30} height={30} className="rounded-full" />
                <p className="text-left">{employee.name}</p>
              </td>
              <td className="p-4 items-center justify-center gap-2">
                {employee.vacationType === 'Vacation' && (
                  <Image src="/vaction.png" alt="Vacation" width={20} height={20} className="rounded-full inline-block" />
                )}
                {employee.vacationType === 'Sick Leave' && (
                  <Image src="/sickleave.png" alt="Sick Leave" width={20} height={20} className="rounded-full inline-block" />
                )}
                <span className="ml-2 inline-block">{employee.vacationType}</span>
              </td>

              <td className="p-4">{employee.duration} days</td>
              <td className="p-4">{employee.leaveDay}</td>
              <td className="p-4">{employee.returningDay}</td>
              <td className="p-4 flex justify-center items-center gap-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                className={`p-2 border w-10 rounded-lg ${currentPage === index + 1 ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
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
          <ConfirmLeave employee={selectedEmployee} onClose={handleCloseConfirmModal} />
        </Modal>
      )}

      {/* Deny Modal */}
      {isDenyModalOpen && (
        <Modal onClose={handleCloseDenyModal}>
          <Deny employee={selectedEmployee} onClose={handleCloseDenyModal} />
        </Modal>
      )}
    </div>
  );
};

export default Table;
