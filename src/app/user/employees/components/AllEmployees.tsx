'use client';

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
import { FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
export const AllEmployees = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state.myInfo);

  console.log(state, 'Redux State');
  const userRole = useSelector((state: RootState) => state.myInfo?.user?.role);
  console.log(userRole, 'role');
  
  const [employees, setEmployeesState] = useState<AllEmployeeData | undefined>();
  const [filteredEmployees, setFilteredEmployees] = useState<AllEmployeeData['items'] | undefined>([]);
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
        const { data } = await getAllEmployees(currentPage, pageSize);
        console.log('Employees: ', data);
        dispatch(addEmployees(data.items));

        // Extract unique job titles and departments
        const jobTitles: string[] = Array.from(
          new Set(data.items.map((employee) => employee.tittle))
        );
        const departments: string[] = Array.from(
          new Set(data.items.map((employee) => employee.department.name))
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
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Set to page: ', page);
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
          employee.department.name === filterOption ||
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

  if (loading) return <ScreenLoader />;

  return (
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
        
      </div>
      <div className="mt-12 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="py-3 px-4 border-b">Employee Name</th>
              <th className="py-3 px-4 border-b">Job Title</th>
              <th className="py-3 px-4 border-b">Department</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Hire Date</th>
              <th className="py-3 px-4 border-b">Download</th>
            </tr>
          </thead>
          <tbody>
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
                  className="hover:bg-gray-50 text-[#0F172A] text-[14px] cursor-pointer"
                >
                  <td className="py-3 px-4 border-b">
                    <ProfileAvatarItem
                      src={
                        employee.profilePictureUrl ||
                        IMAGES.placeholderAvatar.src
                      }
                      title={`${employee.firstName} ${employee.lastName}`}
                      subtitle={`#${String(employee.id)}`}
                    />
                  </td>
                  <td className="py-3 px-4 border-b">{employee.tittle}</td>
                  <td className="py-3 px-4 border-b">
                    {employee.department.name}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <a
                      className="text-blue-700"
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
        </table>
        <Pagination
          styles={{ container: 'mt-5 gap-x-2 !justify-end' }}
          totalItems={employees?.totalItems || 0}
          pageSize={pageSize}
          currentPage={currentPage}
          maxPagesToShow={5} // Adjust if needed
          setCurrentPage={handlePageChange}
        />
      </div>
    </main>
  );
};
