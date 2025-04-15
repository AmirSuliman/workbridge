'use client';
import Button from '@/components/Button';
import EmployeesIcon from '@/components/icons/employees-icon';
import Modal from '@/components/modal/Modal';
import axiosInstance from '@/lib/axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { CiCirclePlus } from 'react-icons/ci';
import { FaSearch } from 'react-icons/fa';
import CreateDepartment from '../department/components/createdepartment';
import { useSession } from 'next-auth/react';
import { GoArrowUpRight } from 'react-icons/go';
import ButtonWithNav from '@/components/common/ButtonWithNav';
import SearchInput from '@/components/common/SearchBar';

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
  const { data: session } = useSession();
  const role = session?.user?.user?.role;
  const isUserpanel = role === 'ViewOnly' || role === 'Manager';

  const handleDepartmentAdded = (updatedDepartments) => {
    setDepartments(updatedDepartments);
    setFilteredDepartments(updatedDepartments);
  };

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
      dept.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [searchQuery, departments]);

  return (
    <div className='mt-4 p-2 z-10'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2'>
        <div className='flex flex-row items-center gap-2'>
          <EmployeesIcon />
          <h1 className='font-semibold text-[22px]'>Departments</h1>
        </div>
        <ButtonWithNav href='/employees/charter' label='See Employee Charter' />
      </div>

      {/* Table Container */}
      <div className='p-6 border border-gray-300 w-full bg-white mt-3 rounded-lg'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2'>
          {/* Search and Sort */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 w-full justify-between'>
            {/* for search bar */}

            <SearchInput
              placeholder='Search department'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* for sort */}
            <div className='flex items-center'>
              <label htmlFor='sort' className='mr-2 text-gray-400 text-xs'>
                Sort
              </label>
              <select id='sort' className='border rounded px-2 py-2 text-xs'>
                <option value=''>Select</option>
                <option value='nameAZ'>A-Z</option>
                <option value='nameZA'>Z-A</option>
                <option value='dateAsc'>Date Ascending</option>
                <option value='dateDesc'>Date Descending</option>
              </select>
            </div>
          </div>

          {/* Add Button */}
          {!isUserpanel && (
            <button
              className='flex flex-row text-[12px] items-center gap-2 bg-dark-navy p-2 px-4 text-white rounded'
              onClick={() => setIsModalOpen(true)}
            >
              Add new Department
              <CiCirclePlus className='text-white' size={18} />
            </button>
          )}
        </div>

        {/* Responsive Table */}
        <div className='overflow-x-auto mt-6'>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
            <table className='min-w-full table-auto border-collapse'>
              <thead>
                <tr className='border-b text-gray-400 text-[14px]'>
                  <th className='px-4 py-3 text-left fon-medium'>Department</th>
                  <th className='px-4 py-3 text-left fon-medium'>Employees</th>
                  <th className='px-4 py-3 text-left fon-medium'>Dept. Head</th>
                  <th className='px-4 py-3'></th>
                </tr>
              </thead>
              <tbody className='text-[14px]'>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((dept) => (
                    <tr key={dept.id} className='border-b'>
                      <td className='px-4 py-3'>{dept.name}</td>
                      <td className='px-4 py-3 flex items-center gap-2'>
                        <EmployeesIcon classNames='w-4 ' /> {dept.employeeCount}
                      </td>
                      <td className='px-4 py-3'>
                        {dept.department_head_data
                          ? `${dept.department_head_data.firstName} ${dept.department_head_data.lastName}`
                          : 'N/A'}
                      </td>

                      <td className='px-4 py-3'>
                        <Link
                          href={`${
                            isUserpanel
                              ? `/user/employees/department/${dept.id}`
                              : `/hr/employees/department/${dept.id}`
                          }`}
                        >
                          <div className='p-1 border rounded-lg w-[30px] flex justify-center items-center'>
                            <BiChevronRight size={20} />
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className='text-center'>
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
            onDepartmentAdded={handleDepartmentAdded}
          />
        </Modal>
      )}
    </div>
  );
};

export default DepartmentTable;
