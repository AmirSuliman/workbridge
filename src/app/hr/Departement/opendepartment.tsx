'use client';
import React, { useEffect, useState } from 'react';
import FormHeading from '@/components/UserInformation/FormHeading';
import EmployeesIcon from '@/components/icons/employees-icon';
import SearchInput from '@/components/common/SearchBar';
import ProfileAvatarItem from '@/components/common/ProfileAvatarItem';
import { IMAGES } from '@/constants/images';
import Table from '@/components/UserInformation/Table';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Button from '@/components/Button';
import { CiCirclePlus } from 'react-icons/ci';
import { FaArrowRight, FaDownload, FaEdit } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import axiosInstance from '@/lib/axios';
import { useParams } from 'next/navigation';
import Addemployee from './components/addemployee';
import Modal from '@/components/modal/Modal';
import axios from 'axios';
import EditDepartment from './components/editdepartment';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hireDate?: string;
  tittle?: string;
}

interface DepartmentData {
  id: string;
  name: string;
  employees: Employee[];
}
interface Header {
  title: string | React.ReactNode;
  accessor: string;
  render?: (value: any) => React.ReactNode;
}

const ITEMS_PER_PAGE = 7;

const OpendepartmentTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [EmployeeName, setEmployeeName] = useState('');
  const [departmentData, setDepartmentData] = useState<DepartmentData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState<string>('');

  useEffect(() => {
    if (id) {
      const fetchDepartmentData = async () => {
        try {
          const response = await axiosInstance.get(`/department/${id}`, {
            params: { associations: 'true', employees: 'true' },
          });
          const employeesData = response.data.data.employees || [];
          setDepartmentData(response.data.data as DepartmentData);
          setEmployees(employeesData);
          setFilteredEmployees(employeesData);
        } catch (error) {
          console.error('Error fetching department data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDepartmentData();
    }
  }, [id]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = employees.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term)
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSortType(type);
    let sorted = [...filteredEmployees];
    switch (type) {
      case 'nameAZ':
        sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
        break;
      case 'nameZA':
        sorted.sort((a, b) => b.firstName.localeCompare(a.firstName));
        break;
      case 'dateAsc':
        sorted.sort(
          (a, b) =>
            new Date(a.hireDate || '').getTime() -
            new Date(b.hireDate || '').getTime()
        );
        break;
      case 'dateDesc':
        sorted.sort(
          (a, b) =>
            new Date(b.hireDate || '').getTime() -
            new Date(a.hireDate || '').getTime()
        );
        break;
      default:
        sorted = employees;
        break;
    }
    setFilteredEmployees(sorted);
  };

  const Tvalues = filteredEmployees
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    .map((employee) => ({
      employeeId: employee.id,
      user: {
        email: employee.email || 'N/A',
      },
      hireDate: employee.hireDate || 'N/A',
      jobTitle: employee.tittle || 'N/A',
    }));

  const headers = [
    {
      title: 'Employee Name',
      accessor: 'employeeId',
      render: (value: string) => {
        const employee = employees.find((emp) => emp.id === value);
        return (
          <ProfileAvatarItem
            src={IMAGES.dummyImage.src}
            title={`${employee?.firstName || ''} ${employee?.lastName || ''}`}
            subtitle={`#${value}`}
          />
        );
      },
    },
    { title: 'Job Title', accessor: 'jobTitle' },
    {
      title: 'Email',
      accessor: 'user.email',
      render: (value: string) => (
        <a href={`mailto:${value}`} className="text-black">
          {value}
        </a>
      ),
    },
    {
      title: 'Hire Date',
      accessor: 'hireDate',
      render: (value: string) => (
        <div className="text-sm text-dark-navy font-[500] mr-12">{value}</div>
      ),
    },
    {
      title: 'Download',
      accessor: 'actions',
      render: () => (
        <div className="flex items-center">
          <MdOutlineKeyboardArrowRight className="w-6 h-6 border border-gray-border rounded-sm hover:cursor-pointer hover:bg-gray-100 ml-12" />
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="h-full p-2">
      <div className="flex justify-between items-center">
        <FormHeading
          textClasses="text-xl font-[600] font-semibold"
          classNames="mb-4"
          icon={<EmployeesIcon classNames="w-6" />}
          text={departmentData?.name || 'Department Name'}
        />
        <button
          onClick={() => setIsModalOpen1(true)}
          className="flex items-center gap-2 p-2 px-4 bg-black text-white rounded-lg font-medium text-[12px] border"
        >
          Edit Department
          <FaEdit size={14} />
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-border rounded-md p-3">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-row items-center gap-4">
              <SearchInput
                placeholder="Search Employees"
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="flex flex-row items-center gap-2">
                <label
                  htmlFor="sort"
                  className="mr-2 text-gray-400 text-[12px]"
                >
                  Sort
                </label>
                <select
                  id="sort"
                  className="border rounded px-2 py-1 text-[12px]"
                  value={sortType}
                  onChange={handleSort}
                >
                  <option value="">Select</option>
                  <option value="nameAZ">Name A-Z</option>
                  <option value="nameZA">Name Z-A</option>
                  <option value="dateAsc">Date Ascending</option>
                  <option value="dateDesc">Date Descending</option>
                </select>
              </div>
            </div>
            <Button
              name="Add new Employee"
              icon={<CiCirclePlus />}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div className="overflow-x-auto">
            <Table
              headers={headers}
              values={Tvalues}
              tableConfig={{ rowBorder: true, selectable: true }}
            />
          </div>
          {totalPages > 1 && (
            <div className="mt-16 flex justify-between items-center">
              <p className="text-[13px] text-gray-400">
                Showing {currentPage} of {totalPages} pages
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
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Addemployee setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
      {isModalOpen1 && (
        <Modal onClose={() => setIsModalOpen1(false)}>
          <EditDepartment setIsModalOpen1={setIsModalOpen1} />
        </Modal>
      )}
    </div>
  );
};

export default OpendepartmentTable;
