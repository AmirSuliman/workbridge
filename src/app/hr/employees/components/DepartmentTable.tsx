'use client';
import { useState, useEffect } from 'react';
import EmployeesIcon from '@/components/icons/employees-icon';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { CiCirclePlus } from 'react-icons/ci';
import { BiChevronRight } from 'react-icons/bi';
import Link from 'next/link';
import CreateDepartment from '../../Departement/components/createdepartment';
import axiosInstance from '@/lib/axios';
import Modal from '@/components/modal/Modal';
import Button from '@/components/Button';

interface Department {
  id: string;
  name: string;
  employeeCount: number;
  head: string;
  openPositions: any[];
  department_head_data: {
    firstName: string;
    lastName: string;
  };
}

const DepartmentTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get('/departments', {
          params: { associations: true },
        });

        const items = response.data.data?.items;

        if (items) {
          const processedDepartments: Department[] = items.map((dept: any) => ({
            id: dept.id,
            name: dept.name,
            employeeCount: dept.employees?.length || 0,
            head: dept.openPositions?.[0]?.hiringLeadId || 'N/A',
            openPositions: dept.openPositions || [],
            department_head_data: dept.department_head_data || {
              firstName: '',
              lastName: 'N/A',
            },
          }));

          setDepartments(processedDepartments);
          setFilteredDepartments(processedDepartments);
        } else {
          throw new Error('Departments data not found.');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to fetch departments');
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const filtered = departments.filter((dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [searchQuery, departments]);

  return (
    <div className="mt-4 p-2 z-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <EmployeesIcon />
          <h1 className="font-semibold text-[22px]">Departments</h1>
        </div>
        <Link href="employees/charter">
          <Button
            bg="white"
            textColor="black"
            className="!font-mdium !text-xs"
            name="See Employee Charter"
            icon={
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.49036 10.123L10.9998 0.613646M10.9998 0.613646L3.86771 0.613647M10.9998 0.613646L10.9998 7.7457"
                  stroke="#0F172A"
                  strokeWidth="1.15289"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </Link>
      </div>

      {/* Table Container */}
      <div className="p-6 border border-gray-300 w-full bg-white mt-3 rounded-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <div className="flex flex-row rounded-lg border px-3 py-1 text-gray-400 items-center gap-3 text-[12px]">
              <FaSearch className="text-gray-400 text-[16px]" />
              <input
                type="search"
                placeholder="Search department"
                className="border-none focus:outline-none text-[12px] text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="sort" className="mr-2 text-gray-400 text-[12px]">
                Sort
              </label>
              <select
                id="sort"
                className="border rounded px-2 py-1 text-[12px]"
              >
                <option value="">Select</option>
                <option value="nameAZ">A-Z</option>
                <option value="nameZA">Z-A</option>
                <option value="dateAsc">Date Ascending</option>
                <option value="dateDesc">Date Descending</option>
              </select>
            </div>
          </div>

          {/* Add Button */}
          <button
            className="flex flex-row text-[12px] items-center gap-2 bg-[#0F172A] p-3 px-4 text-white rounded-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Add new Department
            <CiCirclePlus className="text-white" size={18} />
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto mt-6">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="border-b text-gray-400 text-[14px]">
                  <th className="px-4 py-3 text-left">Department</th>
                  <th className="px-4 py-3 text-left">Employees</th>
                  <th className="px-4 py-3 text-left">Dept. Head</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((dept) => (
                    <tr key={dept.id} className="border-b">
                      <td className="px-4 py-3">{dept.name}</td>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <EmployeesIcon /> {dept.employeeCount}
                      </td>
                      <td className="px-4 py-3">
                        {dept.department_head_data
                          ? `${dept.department_head_data.firstName} ${dept.department_head_data.lastName}`
                          : 'N/A'}
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/hr/Departement/${dept.id}`}>
                          <div className="p-1 border rounded-lg w-[30px] flex justify-center items-center">
                            <BiChevronRight size={20} />
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No departments match your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateDepartment
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </div>
  );
};

export default DepartmentTable;
