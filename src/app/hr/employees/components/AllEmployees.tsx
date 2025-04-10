'use client';

import Button from '@/components/Button';
import { Pagination } from '@/components/common/Pagination';
import ProfileAvatarItem from '@/components/common/ProfileAvatarItem';
import ScreenLoader from '@/components/common/ScreenLoader';
import SearchInput from '@/components/common/SearchBar';
import { IMAGES } from '@/constants/images';
import { getAllEmployees } from '@/services/getAllEmployees';
import {
  fetchEmployees,
  openDeleteModal,
  setCurrentPage,
} from '@/store/slices/allEmployeesSlice';
import { AllEmployeeData } from '@/types/employee';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { FaChevronRight, FaDownload, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { calculateDuration } from '@/lib/calculateDuration';
import DeleteEmployeeMoadal from './DeleteEmployeeModal';
import { AppDispatch, RootState } from '@/store/store';
import { GoArrowUpRight } from 'react-icons/go';

export const AllEmployees = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: employees,
    loading,
    uniqueJobTitles,
    uniqueDepartments,
    currentPage,
    totalItems,
  } = useSelector((state: RootState) => state.employees);

  const [role, setRole] = useState<string>();
  const [filteredEmployees, setFilteredEmployees] = useState<
    AllEmployeeData['items'] | undefined
  >([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const pageSize = 10;

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role);
    };
    fetchSession();
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, []);

  useEffect(() => {
    dispatch(fetchEmployees({ page: currentPage, pageSize, searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  // Apply filters and sorting
  useEffect(() => {
    let updatedList = [...employees];

    if (searchTerm) {
      updatedList = updatedList.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (filterOption) {
      updatedList = updatedList.filter(
        (employee) =>
          employee.department?.name === filterOption ||
          employee.tittle === filterOption
      );
    }

    if (sortOption === 'By Id') {
      updatedList.sort((a, b) => b.id - a.id);
    } else if (sortOption === 'Hire date') {
      updatedList.sort(
        (a, b) =>
          new Date(a.hireDate).getTime() - new Date(b.hireDate).getTime()
      );
    } else if (sortOption === 'Name') {
      updatedList.sort((a, b) =>
        `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        )
      );
    }

    setFilteredEmployees(updatedList);
  }, [searchTerm, sortOption, filterOption, employees]);

  const handleDownload = async () => {
    try {
      let allEmployees: AllEmployeeData['items'] = [];
      let currentPage = 1;
      let pageSize = 100;
      let totalPages = 1;

      // Fetch all employees across multiple pages
      while (currentPage <= totalPages) {
        const { data }: { data: AllEmployeeData } = await getAllEmployees(
          currentPage,
          pageSize,
          ''
        );
        if (data.items.length === 0) break; // Stop if no more employees

        allEmployees = [...allEmployees, ...data.items]; // ✅ No more type errors
        totalPages = Math.ceil((data.totalItems || 0) / pageSize);
        currentPage++;
      }

      if (allEmployees.length === 0) {
        alert('No employee data available to download.');
        return;
      }

      // Convert employee data into an array of objects
      const data = allEmployees.map((emp) => ({
        'Employee Name': `${emp.firstName} ${emp.lastName}`,
        'Job Title': emp.tittle || 'N/A', // Fixed 'title' field name
        Department: emp.department?.name || 'N/A',
        Email: emp.email || 'N/A',
        'Hire Date': emp.hireDate
          ? new Date(emp.hireDate).toLocaleDateString()
          : 'N/A',
      }));

      // Create a new workbook and worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'All Employees');

      // Write to a binary string
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      // Create a Blob and trigger download
      const blob = new Blob([excelBuffer], {
        type: 'application/octet-stream',
      });
      saveAs(blob, 'All_EmployeeData.xlsx');
    } catch (error) {
      console.error('Error fetching all employees:', error);
      alert('Failed to download employee data.');
    }
  };

  return (
    <>
      <nav className='flex gap-4 justify-between flex-wrap my-8'>
        <h1 className='font-semibold text-lg sm:text-2xl flex gap-2 items-center'>
          <svg
            width='26'
            height='25'
            viewBox='0 0 26 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3.94028 5.57268C3.94028 2.82073 6.17117 0.589844 8.92311 0.589844C11.6751 0.589844 13.9059 2.82073 13.9059 5.57268C13.9059 8.32462 11.6751 10.5555 8.92311 10.5555C6.17117 10.5555 3.94028 8.32462 3.94028 5.57268Z'
              fill='#0F172A'
            />
            <path
              d='M15.7179 8.29058C15.7179 6.03899 17.5432 4.21372 19.7947 4.21372C22.0463 4.21372 23.8716 6.03899 23.8716 8.29058C23.8716 10.5422 22.0463 12.3674 19.7947 12.3674C17.5432 12.3674 15.7179 10.5422 15.7179 8.29058Z'
              fill='#0F172A'
            />
            <path
              d='M0.316406 20.9742C0.316406 16.2208 4.16976 12.3674 8.92311 12.3674C13.6765 12.3674 17.5298 16.2208 17.5298 20.9742V20.9772C17.5298 21.0253 17.5294 21.0736 17.5286 21.1214C17.5233 21.4337 17.3576 21.7213 17.0901 21.8824C14.7041 23.3189 11.9087 24.145 8.92311 24.145C5.93756 24.145 3.14218 23.3189 0.756177 21.8824C0.488616 21.7213 0.322897 21.4337 0.317646 21.1214C0.316823 21.0725 0.316406 21.0234 0.316406 20.9742Z'
              fill='#0F172A'
            />
            <path
              d='M19.3416 20.978C19.3416 21.036 19.341 21.0942 19.3401 21.1519C19.3332 21.561 19.2345 21.9559 19.0587 22.3113C19.3022 22.3258 19.5475 22.3331 19.7946 22.3331C21.7221 22.3331 23.5479 21.8866 25.1719 21.0904C25.4703 20.9441 25.6646 20.6463 25.6783 20.3142C25.6817 20.2326 25.6834 20.1506 25.6834 20.0682C25.6834 16.8159 23.0469 14.1794 19.7946 14.1794C18.8929 14.1794 18.0385 14.382 17.2746 14.7443C18.5728 16.4819 19.3416 18.6383 19.3416 20.9742V20.978Z'
              fill='#0F172A'
            />
          </svg>
          Employees
        </h1>
        <Link href='employees/charter'>
          <Button
            bg='#00B87D'
            className=' !font-mdium !text-sm'
            name='See Employee Charter'
            icon={<GoArrowUpRight size={20} />}
          />
        </Link>
      </nav>
      <main className='bg-white border p-4 rounded-md mt-4'>
        {/* for search bar */}
        <nav className='flex flex-wrap gap-2 my-3'>
          <SearchInput
            placeholder='Search Employees'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Sort and Filter DropDowns */}
          <div className='flex gap-2 items-center ml-auto mr-0'>
            <label className='text-sm text-[#abaeb4]'>Sort</label>
            <select
              className='p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray'
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value=''>Select</option>
              <option value='By Id'>By Id</option>
              <option value='Hire date'>Hire date</option>
              <option value='Name'>Name</option>
            </select>
          </div>
          <div className='flex gap-2 items-center'>
            <label className='text-sm text-[#abaeb4]'>Filter</label>
            <select
              className='p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray'
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value=''>Select</option>
              <optgroup label='Job Title'>
                {uniqueJobTitles.map((jobTitle) => (
                  <option key={jobTitle} value={jobTitle}>
                    {jobTitle}
                  </option>
                ))}
              </optgroup>
              <optgroup label='Departments'>
                {uniqueDepartments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          {(role === 'Admin' || role === 'SuperAdmin') && (
            <Button
              className='bg-[#0F172A] sm:px-6'
              name='Add new Employee'
              icon={<CiCirclePlus />}
              onClick={() => router.push('/hr/employees/create-employee')}
            />
          )}
        </nav>

        <div className='mt-12 overflow-x-auto w-full'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='text-sm text-gray-500'>
                <th className='py-3 px-4 font-medium border-b'>
                  Employee Name
                </th>
                <th className='py-3 px-4 font-medium border-b'>Job Title</th>
                <th className='py-3 px-4 font-medium border-b'>Department</th>
                <th className='py-3 px-4 font-medium border-b'>Email</th>
                <th className='py-3 px-4 font-medium border-b'>Hire Date</th>
                <th className='py-3 px-4 font-medium border-b'></th>
                <th className='py-3 px-4 font-medium border-b'>
                  <button
                    onClick={handleDownload}
                    className='border bg-[#0F172A] text-white p-2 text-[12px] flex flex-row items-center gap-2 rounded-sm cursor-pointer'
                  >
                    <FaDownload />
                    Download
                  </button>
                </th>
              </tr>
            </thead>
            {!loading ? (
              <tbody className='w-full'>
                {filteredEmployees?.map((employee) => {
                  const hireDateObj = employee?.hireDate
                    ? new Date(employee.hireDate)
                    : undefined;

                  const duration = employee?.hireDate
                    ? calculateDuration(employee.hireDate)
                    : '';

                  // Format the date for display
                  const hireDateFormatted = hireDateObj
                    ? hireDateObj.toLocaleDateString()
                    : 'N/A';

                  return (
                    <tr
                      key={employee.id}
                      className='hover:bg-gray-50 text-[#0F172A] text-[12px] w-full '
                    >
                      <td className='py-2 px-2 text-dark-navy whitespace-nowrap overflow-hidden text-ellipsis border-b w-full'>
                        <ProfileAvatarItem
                          src={
                            employee.profilePictureUrl ||
                            IMAGES.placeholderAvatar.src
                          }
                          title={`${employee.firstName} ${employee.lastName}`}
                          subtitle={`#${String(employee.id)}`}
                        />
                      </td>
                      <td className='py-3 px-4 border-b w-full  whitespace-nowrap overflow-hidden text-ellipsis '>
                        {employee.tittle}
                      </td>
                      <td className='py-3 px-4 border-b w-full  whitespace-nowrap overflow-hidden text-ellipsis '>
                        {employee.department?.name}
                      </td>
                      <td className='py-3 px-4 border-b w-full  whitespace-nowrap overflow-hidden text-ellipsis '>
                        <a
                          className='text-blue-700 underline'
                          href={`mailto:${employee.email}`}
                        >
                          {employee.email}
                        </a>
                      </td>
                      <td className='py-3 px-4 border-b w-full  whitespace-nowrap overflow-hidden text-ellipsis '>
                        {hireDateFormatted}
                        <br />
                        <span className='text-[10px] mt-2'>{duration}</span>
                      </td>
                      <td className='py-3 px-4 border-b w-full  whitespace-nowrap overflow-hidden text-ellipsis '>
                        {role === 'SuperAdmin' && (
                          <FaTrash
                            onClick={() => dispatch(openDeleteModal(employee))}
                            size={14}
                            className='cursor-pointer'
                          />
                        )}
                      </td>
                      <td
                        onClick={() => {
                          // employee cannot see another employee's information
                          if (role !== 'ViewOnly')
                            router.push(
                              `employees/employee-info/${employee.id}`
                            );
                        }}
                        className='py-3 px-4 border-b cursor-pointer '
                      >
                        {role !== 'ViewOnly' && (
                          <span className='p-2 border w-8 rounded-md flex items-center justify-center hover:bg-black hover:text-white'>
                            <FaChevronRight size={12} />
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody className='w-full'>
                <tr>
                  <td colSpan={7}>
                    <ScreenLoader />
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          <Pagination
            styles={{ container: 'mt-5 gap-x-2 !justify-end' }}
            totalItems={totalItems || 0}
            pageSize={pageSize}
            currentPage={currentPage}
            maxPagesToShow={2} // Adjust if needed
            setCurrentPage={handlePageChange}
          />
        </div>
        <DeleteEmployeeMoadal />
      </main>
    </>
  );
};
