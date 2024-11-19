'use client';
import React from 'react';
import FormHeading from '../UserInformation/FormHeading';
import EmployeesIcon from '../icons/employees-icon';
import SearchInput from '../common/SearchBar';
import ProfileAvatarItem from '../common/ProfileAvatarItem';
import { IMAGES } from '@/constants/images';
import Table from '../UserInformation/Table';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const EmployeesTab = () => {
  const headers = [
    {
      title: 'Employee ID',
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
    { title: 'Department', accessor: '3' },
    {
      title: 'Email',
      accessor: 'user.email',
      render: (value: any) => (
        <a href={`mailto:${value}`} className="text-blue-500">
          {value}
        </a>
      ),
    },
    {
      title: 'Hire Date',
      accessor: 'hireDate',
      render: () => (
        <div className="flex flex-col ">
          {' '}
          <div className="text-sm text-dark-navy font-[500]">
            24.01.2024
          </div>{' '}
          <div className="text-[10px] text-dark-navy font-[500]">
            1 Year 4 Months{' '}
          </div>{' '}
        </div>
      ),
    },
    { title: '', accessor: '' },
    { title: '', accessor: 'x' },
    {
      title: '',
      accessor: 'actions',
      render: () => (
        <MdOutlineKeyboardArrowRight className="w-6 h-6 border border-gray-border rounded-sm hover:cursor-pointer hover:bg-gray-100" />
      ),
    },
  ];

  const Tvalues = [
    {
      employeeId: '12343', // Employee ID
      user: {
        address: { street: '123 Elm St', city: 'New York' }, // Street and city
        email: 'darlene.robertson@gmail.com', // Email
      },
      hireDate: '24.01.2024', // Hire date
      '1': '1 Year 4 Months', // Experience
      '2': 'HR MANAGER', // Job Title
      '3': 'Human Resources', // Department
    },
    {
      employeeId: '12344', // Another Employee ID
      user: {
        address: { street: '456 Oak St', city: 'San Francisco' },
        email: 'john.doe@example.com',
      },
      hireDate: '01.01.2020', // Another Hire date
      '1': '3 Years 2 Months', // Experience
      '2': 'Software Engineer', // Job Title
      '3': 'Engineering', // Department
    },
    {
      employeeId: '12344', // Another Employee ID
      user: {
        address: { street: '456 Oak St', city: 'San Francisco' },
        email: 'john.doe@example.com',
      },
      hireDate: '01.01.2020', // Another Hire date
      '1': '3 Years 2 Months', // Experience
      '2': 'Software Engineer', // Job Title
      '3': 'Engineering', // Department
    },
    {
      employeeId: '12344', // Another Employee ID
      user: {
        address: { street: '456 Oak St', city: 'San Francisco' },
        email: 'john.doe@example.com',
      },
      hireDate: '01.01.2020', // Another Hire date
      '1': '3 Years 2 Months', // Experience
      '2': 'Software Engineer', // Job Title
      '3': 'Engineering', // Department
    },
    {
      employeeId: '12344', // Another Employee ID
      user: {
        address: { street: '456 Oak St', city: 'San Francisco' },
        email: 'john.doe@example.com',
      },
      hireDate: '01.01.2020', // Another Hire date
      '1': '3 Years 2 Months', // Experience
      '2': 'Software Engineer', // Job Title
      '3': 'Engineering', // Department
    },
    {
      employeeId: '12344', // Another Employee ID
      user: {
        address: { street: '456 Oak St', city: 'San Francisco' },
        email: 'john.doe@example.com',
      },
      hireDate: '01.01.2020', // Another Hire date
      '1': '3 Years 2 Months', // Experience
      '2': 'Software Engineer', // Job Title
      '3': 'Engineering', // Department
    },
    // Add more rows as needed...
  ];

  return (
    <div className="h-full p-2 ">
      <FormHeading
        textClasses="text-xl font-[600] font-semibold "
        classNames="mb-4"
        icon={<EmployeesIcon classNames="w-6" />}
        text="Employees"
      />

      <div className="bg-white border border-gray-border rounded-md p-3 ">
        {/* Filters Section */}
        <div className="flex gap-3 my-3">
          {' '}
          <SearchInput placeholder="Search Employees" value="" />
          <div className="flex gap-2  items-center">
            <label className="text-sm text-[#abaeb4]">Sort</label>
            <select className="p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray ">
              <option>Select</option>
              <option>Recently Added</option>
              <option>Recently Added</option>
              <option>Recently Added</option>
            </select>
          </div>
          <div className="flex gap-2  items-center">
            <label className="text-sm text-[#abaeb4]">Filter</label>
            <select className="p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray ">
              <option>Select</option>
              <option>Recently Added</option>
              <option>Recently Added</option>
              <option>Recently Added</option>
            </select>
          </div>
        </div>
        <Table
          headers={headers}
          values={Tvalues}
          tableConfig={{ rowBorder: true, selectable: true }}

          // cols={6}
          // colSpans={[1, 1, 1, 1, 1]}
          // tableConfig={{ selectable: false, rowBorder: false }}
          // onSelectionChange={(selectedRows) => console.log(selectedRows)}
        />
        {/* <InfoGrid
                    headers={["Employee ID", "Job Title", "Department", "Email", "Hire Date", ""]}
                    values={values}
                    cols={6}
                    colSpans={[1, 1, 1, 1, 1, 1]}
                /> */}
      </div>
    </div>
  );
};

export default EmployeesTab;
