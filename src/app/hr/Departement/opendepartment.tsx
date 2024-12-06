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
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import axiosInstance from '@/lib/axios';
import { useParams } from 'next/navigation';

const ITEMS_PER_PAGE = 7;

const OpendepartmentTable = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EmployeeName, setEmployeeName] = useState('');
  const [departmentData, setDepartmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([]); 
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

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
        const employeesData = Array.isArray(response.data.data) ? response.data.data : [];
        setEmployees(employeesData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees();
  }, []);
  // Fetch Department Data
  useEffect(() => {
    if (id) {
      const fetchDepartmentData = async () => {
        try {
          const response = await axiosInstance.get(`/department/${id}`, {
            params: { associations: 'true', employees: 'true' },
          });
          const employeesData = response.data.data.employees || [];
          setDepartmentData(response.data.data);
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

  // Handle Search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = employees.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term)
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Handle Sort
  const handleSort = (e) => {
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
        sorted.sort((a, b) => new Date(a.hireDate) - new Date(b.hireDate));
        break;
      case 'dateDesc':
        sorted.sort((a, b) => new Date(b.hireDate) - new Date(a.hireDate));
        break;
      default:
        sorted = employees;
        break;
    }
    setFilteredEmployees(sorted);
  };

  // Handle Add Employee
  const handleAddEmployee = () => {
    console.log('Employee Name:', EmployeeName);
    setIsModalOpen(false);
    setEmployeeName(''); // Reset employee name after adding
  };

  // Table Values (for employee data)
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

  // Table Headers
  const headers = [
    {
      title: 'Employee Name',
      accessor: 'employeeId',
      render: (value) => {
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
      render: (value) => (
        <a href={`mailto:${value}`} className="text-black">
          {value}
        </a>
      ),
    },
    {
      title: 'Hire Date',
      accessor: 'hireDate',
      render: (value) => (
        <div className="text-sm text-dark-navy font-[500] mr-12">{value}</div>
      ),
    },
    {
      title: (
        <button className="p-2 px-3 bg-gray-200 text-black text-sm rounded-md flex flex-row items-center gap-2">
          <FaDownload />
          Download
        </button>
      ),
      accessor: 'actions',
      render: () => (
        <MdOutlineKeyboardArrowRight className="w-6 h-6 border border-gray-border rounded-sm hover:cursor-pointer hover:bg-gray-100 ml-12" />
      ),
    },
  ];

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const renderEmployeeSelect = () => {
    if (!employees.length) {
      return <option>No employees available</option>;
    }
    return employees.map((employee) => (
      <option key={employee.id} value={`${employee.firstName} ${employee.lastName}`}>
        {employee.firstName} {employee.lastName}
      </option>
    ));
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
        <button className="flex items-center gap-2 p-2 px-4 bg-white rounded-lg font-medium text-[12px] border">
          See Employee Charter
          <FaArrowRight size={14} style={{ transform: 'rotate(310deg)', color: '#0F172A' }} />
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
              <SearchInput placeholder="Search Employees" value={searchTerm} onChange={handleSearch} />
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="sort" className="mr-2 text-gray-400 text-[12px]">Sort</label>
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
            <Button name="Add new Employee" icon={<CiCirclePlus />} onClick={() => setIsModalOpen(true)} />
          </div>
          <Table headers={headers} values={Tvalues} tableConfig={{ rowBorder: true, selectable: true }} />

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button onClick={() => handlePageChange(currentPage - 1)} className="p-2 text-[12px]">
                <BiChevronLeft />
              </button>
              <span className="text-[14px] text-gray-500">{currentPage} of {totalPages}</span>
              <button onClick={() => handlePageChange(currentPage + 1)} className="p-2 text-[12px]">
                <BiChevronRight />
              </button>
            </div>
          )}
        </div>
      )}

{isModalOpen && (
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
        )}
    </div>
  );
};

export default OpendepartmentTable;
