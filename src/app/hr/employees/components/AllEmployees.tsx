'use client';

import Button from '@/components/Button';
import { Pagination } from '@/components/common/Pagination';
import ProfileAvatarItem from '@/components/common/ProfileAvatarItem';
import ScreenLoader from '@/components/common/ScreenLoader';
import SearchInput from '@/components/common/SearchBar';
import { IMAGES } from '@/constants/images';
import { getAllEmployees } from '@/services/getAllEmployees';
import { addEmployees } from '@/store/slices/allEmployeesSlice';
import { AllEmployeeData } from '@/types/employee';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { FaChevronRight, FaDownload } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
export const AllEmployees = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.myInfo?.user?.role);

  const [employees, setEmployeesState] = useState<
    AllEmployeeData | undefined
  >();
  const [filteredEmployees, setFilteredEmployees] = useState<
    AllEmployeeData['items'] | undefined
  >([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [uniqueJobTitles, setUniqueJobTitles] = useState<string[]>([]);
  const [uniqueDepartments, setUniqueDepartments] = useState<string[]>([]);
  const pageSize = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const { data } = await getAllEmployees(
          currentPage,
          pageSize,
          searchTerm
        );
        dispatch(addEmployees(data.items));

        // Extract unique job titles and departments
        const jobTitles: string[] = Array.from(
          new Set(data.items.map((employee) => employee.tittle))
        );
        const departments: string[] = Array.from(
          new Set(data.items.map((employee) => employee.department?.name))
        );

        setEmployeesState(data);
        setFilteredEmployees(data.items);
        setUniqueJobTitles(jobTitles);
        setUniqueDepartments(departments);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [currentPage, dispatch, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!employees) return;

    let updatedList = [...employees.items];

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
      updatedList.sort((a, b) => a.id - b.id);
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

  // if (loading) return <ScreenLoader />;
  // console.log('employees: ', employees);
  return (
    <>
      <nav className="flex gap-4 justify-between flex-wrap my-8">
        <h1 className="font-semibold text-2xl flex gap-2 items-center">
          <svg
            width="26"
            height="25"
            viewBox="0 0 26 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.94028 5.57268C3.94028 2.82073 6.17117 0.589844 8.92311 0.589844C11.6751 0.589844 13.9059 2.82073 13.9059 5.57268C13.9059 8.32462 11.6751 10.5555 8.92311 10.5555C6.17117 10.5555 3.94028 8.32462 3.94028 5.57268Z"
              fill="#0F172A"
            />
            <path
              d="M15.7179 8.29058C15.7179 6.03899 17.5432 4.21372 19.7947 4.21372C22.0463 4.21372 23.8716 6.03899 23.8716 8.29058C23.8716 10.5422 22.0463 12.3674 19.7947 12.3674C17.5432 12.3674 15.7179 10.5422 15.7179 8.29058Z"
              fill="#0F172A"
            />
            <path
              d="M0.316406 20.9742C0.316406 16.2208 4.16976 12.3674 8.92311 12.3674C13.6765 12.3674 17.5298 16.2208 17.5298 20.9742V20.9772C17.5298 21.0253 17.5294 21.0736 17.5286 21.1214C17.5233 21.4337 17.3576 21.7213 17.0901 21.8824C14.7041 23.3189 11.9087 24.145 8.92311 24.145C5.93756 24.145 3.14218 23.3189 0.756177 21.8824C0.488616 21.7213 0.322897 21.4337 0.317646 21.1214C0.316823 21.0725 0.316406 21.0234 0.316406 20.9742Z"
              fill="#0F172A"
            />
            <path
              d="M19.3416 20.978C19.3416 21.036 19.341 21.0942 19.3401 21.1519C19.3332 21.561 19.2345 21.9559 19.0587 22.3113C19.3022 22.3258 19.5475 22.3331 19.7946 22.3331C21.7221 22.3331 23.5479 21.8866 25.1719 21.0904C25.4703 20.9441 25.6646 20.6463 25.6783 20.3142C25.6817 20.2326 25.6834 20.1506 25.6834 20.0682C25.6834 16.8159 23.0469 14.1794 19.7946 14.1794C18.8929 14.1794 18.0385 14.382 17.2746 14.7443C18.5728 16.4819 19.3416 18.6383 19.3416 20.9742V20.978Z"
              fill="#0F172A"
            />
          </svg>
          Employees
        </h1>
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
      </nav>
      <main className="bg-white border p-4 rounded-md mt-4">
        <div className="flex gap-3 my-3">
          <SearchInput
            placeholder="Search Employees"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2 items-center">
            <label className="text-sm text-[#abaeb4]">Sort</label>
            <select
              className="p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Select</option>
              <option value="By Id">By Id</option>
              <option value="Hire date">Hire date</option>
              <option value="Name">Name</option>
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-sm text-[#abaeb4]">Filter</label>
            <select
              className="p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="">Select</option>
              <optgroup label="Job Title">
                {uniqueJobTitles.map((jobTitle) => (
                  <option key={jobTitle} value={jobTitle}>
                    {jobTitle}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Departments">
                {uniqueDepartments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          {userRole !== 'ViewOnly' && (
            <Button
              name="Add new Employee"
              icon={<CiCirclePlus />}
              onClick={() => router.push('/hr/employees/create-employee')}
            />
          )}
        </div>
        <div className="mt-12 overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-500">
                <th className="py-3 px-4 font-medium border-b">Employee Name</th>
                <th className="py-3 px-4 font-medium border-b">Job Title</th>
                <th className="py-3 px-4 font-medium border-b">Department</th>
                <th className="py-3 px-4 font-medium border-b">Email</th>
                <th className="py-3 px-4 font-medium border-b">Hire Date</th>
                <th className="py-3 px-4 font-medium border-b">
                  <span className='border bg-gray-200 text-gray-400 p-2 text-[12px] flex flex-row items-center gap-2 rounded-sm'>
                    <FaDownload/>
                  Download
                  </span>
                  </th>
              </tr>
            </thead>
            {!loading ? (
              <tbody className="w-full">
                {filteredEmployees?.map((employee) => {
                  const hireDate = employee?.hireDate
                    ? employee.hireDate.split('T')[0]
                    : 'N/A';

                  const calculateDuration = (
                    startDate: string | undefined
                  ): string => {
                    if (!startDate) return 'N/A';
                    const start = new Date(startDate);
                    const now = new Date();
                    const differenceInMilliseconds =
                      now.getTime() - start.getTime();
                    const days = Math.floor(
                      differenceInMilliseconds / (1000 * 60 * 60 * 24)
                    );
                    const months =
                      now.getMonth() -
                      start.getMonth() +
                      12 * (now.getFullYear() - start.getFullYear());
                    if (months < 1) return `${days} d`;
                    if (months < 12) return `${months} m`;
                    const years = Math.floor(months / 12);
                    const remainingMonths = months % 12;
                    return `${years} y ${remainingMonths} m`;
                  };
                  const duration = employee?.hireDate
                    ? calculateDuration(hireDate)
                    : 'N/A';

                  return (
                    <tr
                      onClick={() => {
                        router.push(`employees/employee-info/${employee.id}`);
                      }}
                      key={employee.id}
                      className="hover:bg-gray-50 text-[#0F172A] text-[14px] w-full cursor-pointer"
                    >
                      <td className="py-3 px-4 border-b min-w-fit w-full lg:w-fit">
                        <ProfileAvatarItem
                          src={
                            employee.profilePictureUrl ||
                            IMAGES.placeholderAvatar.src
                          }
                          title={`${employee.firstName} ${employee.lastName}`}
                          subtitle={`#${String(employee.id)}`}
                        />
                      </td>
                      <td className="py-3 px-4 border-b ml-4 lg:ml-0">
                        {employee.tittle}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {employee.department?.name}
                      </td>
                      <td className="py-3 px-4 border-b">
                        <a
                          className="text-blue-700 underline"
                          href={`mailto:${employee.email}`}
                        >
                          {employee.email}
                        </a>
                      </td>
                      <td className="py-3 px-4 border-b">
                        {new Date(employee.hireDate).toLocaleDateString()}
                        <br />
                        <span className="text-[10px] mt-2">{duration}</span>
                      </td>
                      <td className="py-3 px-4 border-b ">
                        <span className="p-2 border w-8 rounded-md flex items-center justify-center hover:bg-black hover:text-white">
                          <FaChevronRight size={12} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody className="w-full">
                <tr>
                  <td colSpan={6}>
                    <ScreenLoader />
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          <Pagination
            styles={{ container: 'mt-5 gap-x-2 !justify-end' }}
            totalItems={employees?.totalItems || 0}
            pageSize={pageSize}
            currentPage={currentPage}
            maxPagesToShow={3} // Adjust if needed
            setCurrentPage={handlePageChange}
          />
        </div>
      </main>
    </>
  );
};
