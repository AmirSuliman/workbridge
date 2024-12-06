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
import { FaArrowRight } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { FaDownload } from 'react-icons/fa';
import axiosInstance from '@/lib/axios';
import { useSearchParams } from 'next/navigation';

const OpendepartmentTable = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); 
  console.log(id, 'id');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EmployeeName, setEmployeeName] = useState('');
  const [departmentData, setDepartmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    if (id) {
      const fetchDepartmentData = async () => {
        try {
          const response = await axiosInstance.get(`/department/${id}`);
          setDepartmentData(response.data);
        } catch (error) {
          console.error('Error fetching department data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDepartmentData();
    }
  }, [id]);

  console.log(id, 'id');

  const handleAddEmployee = () => {
    console.log({
      EmployeeName,
    });
    setIsModalOpen(false);
    setEmployeeName('');
  };

  const headers = [
    {
      title: 'Employee Name',
      accessor: 'employeeId',
      render: () => (
        <ProfileAvatarItem
          src={IMAGES.dummyImage.src}
          title="Darlene Peterson"
          subtitle="#12343"
        />
      ),
    },
    { title: 'Job Title', accessor: '2' },
    {
      title: 'Email',
      accessor: 'user.email',
      render: (value: any) => (
        <a href={`mailto:${value}`} className="text-black">
          {value}
        </a>
      ),
    },
    {
      title: 'Hire Date',
      accessor: 'hireDate',
      render: () => (
        <div>
          <div className="flex flex-col mr-32">
            <div className="text-sm text-dark-navy font-[500]">24.01.2024</div>
            <div className="text-[10px] text-dark-navy font-[500]">
              1 Year 4 Months
            </div>
          </div>
        </div>
      ),
    },
    {
      title: (
        <button className="p-2 px-3 bg-gray-200 text-black text-sm rounded-md flex flex-row items-center gap-2 ">
          <FaDownload />
          Download
        </button>
      ),
      accessor: 'actions',
      render: () => (
        <div className="flex flex-col items-center gap-2">
          <MdOutlineKeyboardArrowRight className="w-6 h-6 border border-gray-border rounded-sm hover:cursor-pointer hover:bg-gray-100" />
        </div>
      ),
    },
  ];

  const Tvalues = [
    {
      employeeId: '12343',
      user: {
        address: { street: '123 Elm St', city: 'New York' },
        email: 'darlene.robertson@gmail.com',
      },
      hireDate: '24.01.2024',
      '1': '1 Year 4 Months',
      '2': 'HR MANAGER',
    },
    {
      employeeId: '12344',
      user: {
        address: { street: '456 Oak St', city: 'San Francisco' },
        email: 'john.doe@example.com',
      },
      hireDate: '01.01.2020',
      '1': '3 Years 2 Months',
      '2': 'Software Engineer',
    },
  ];

  return (
    <div className="h-full p-2 ">
      <div className="flex flex-row items-center justify-between">
        <FormHeading
          textClasses="text-xl font-[600] font-semibold "
          classNames="mb-4"
          icon={<EmployeesIcon classNames="w-6" />}
          text={departmentData?.name || 'Department Name'}
        />
        <button className="flex flex-row items-center gap-2 p-2 px-4 bg-white rounded-lg font-medium text-[12px] border">
          See Employee Charter{' '}
          <FaArrowRight size={14} style={{ transform: 'rotate(310deg)', color: '#0F172A' }} />
        </button>
      </div>

      <div className="bg-white border border-gray-border rounded-md p-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 my-3">
            <SearchInput placeholder="Search Employees" value="" />
            <div className="flex gap-2 items-center">
              <label className="text-sm text-[#abaeb4]">Sort</label>
              <select className="p-2 border w-[300px] max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray">
                <option>Select</option>
                <option>Recently Added</option>
              </select>
            </div>
          </div>
          <Button name="Add new Employee" icon={<CiCirclePlus />} onClick={() => setIsModalOpen(true)} />
        </div>
        <Table headers={headers} values={Tvalues} tableConfig={{ rowBorder: true, selectable: true }} />

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-[13px] text-gray-400">
            Showing <span className="font-semibold text-[#0F172A]">1 to 5 of 120</span> employees
          </p>

          <div className="flex flex-row items-center gap-2">
            <button className="p-2 border bg-gray-200 rounded-lg">
              <BiChevronLeft size={24} />
            </button>
            <button className="p-2 border w-10 rounded-lg hover:bg-black hover:text-white">1</button>
            <button className="p-2 border w-10 rounded-lg hover:bg-black hover:text-white">2</button>
            <button className="p-2 border w-10 rounded-lg hover:bg-black hover:text-white">... </button>
            <button className="p-2 border w-10 rounded-lg hover:bg-black hover:text-white">24</button>

            <button className="p-2 border bg-gray-200 rounded-lg">
              <BiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-1000">
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[600px] shadow-lg h-[70vh]">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-[22px] font-semibold">Add Employees</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <IoMdClose size={24} />
              </button>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4 mt-10">
                <label className="block text-gray-400 mb-2 text-[14px]">Employees</label>
                <select
                  value={EmployeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="border w-full px-3 py-3 rounded-[5px] text-sm text-gray-400"
                >
                  <option value="Marketing">Darlene Peterson</option>
                  <option value="Sales">Darlene Peterson</option>
                </select>
              </div>

              <div className="flex justify-center items-center flex-row w-full gap-6 p-6 mt-52">
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
