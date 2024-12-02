'use client';

import React from 'react';
import FormHeading from './FormHeading';
import { HiMiniBriefcase } from 'react-icons/hi2';
import FormField from './FormField';
import InfoGrid from './InfoGrid';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const EmploymentSection = () => {
  const employeeData = useSelector((state: RootState) => state.employee.data);

  const hireDate = employeeData?.hireDate
    ? employeeData.hireDate.split('T')[0]
    : 'N/A';

  const calculateDuration = (startDate: string | undefined): string => {
    if (!startDate) return 'N/A';

    const start = new Date(startDate);
    const now = new Date();

    // Get the difference in milliseconds
    const differenceInMilliseconds = now.getTime() - start.getTime();

    // Calculate the difference in days
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    // Calculate the difference in months
    const months =
      now.getMonth() -
      start.getMonth() +
      12 * (now.getFullYear() - start.getFullYear());

    // If less than a month, return days
    if (months < 1) return `${days}d`;

    // If less than a year, return months
    if (months < 12) return `${months}m`;

    // Otherwise, calculate years and months
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    return `${years}y ${remainingMonths}m`;
  };

  const duration = employeeData?.hireDate ? calculateDuration(hireDate) : 'N/A';

  return (
    <div className="p-1 md:p-4 rounded-md  h-full">
      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white mb-4">
        <div className="mb-5">
          <FormHeading icon={<HiMiniBriefcase className="w-4" />} text="Job" />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            onChange={() => console.log('')}
            label="Hire Date"
            value={hireDate}
          />
          <FormField
            onChange={() => console.log('')}
            label="Duration"
            value={duration}
          />
        </div>
      </div>

      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
        <div className="mb-5">
          <FormHeading
            icon={<HiMiniBriefcase className="w-4" />}
            text="Employment Status"
          />
        </div>
        <InfoGrid
          headers={['Effective Date', 'Work Type', 'Note']}
          values={[
            [
              `${employeeData?.effectiveDate || 'N/A'}`,
              `${employeeData?.employmentType || 'N/A'}`,
              '',
            ],
          ]}
        />
      </div>

      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
        <div className="mb-5">
          <FormHeading
            icon={<HiMiniBriefcase className="w-4" />}
            text="Job Information"
          />
        </div>

        <InfoGrid
          cols={6}
          headers={[
            'Effective Date',
            'Location',
            'Division',
            'Department',
            'Job Title',
            'Reporting Message',
          ]}
          values={[
            [
              `${employeeData?.effectiveDate || 'N/A'}`,
              `${employeeData?.location.country}, ${employeeData?.location.state}`,
              `${employeeData?.location.country}`,
              `${employeeData?.department.name || 'N/A'}`,
              `${employeeData?.tittle || 'N/A'}`,
              `${employeeData?.reportingManagerId || 'N/A'}`,
            ],
          ]}
        />
      </div>
      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
        <div className="mb-5">
          <FormHeading
            icon={<HiMiniBriefcase className="w-4" />}
            text="Payment"
          />
        </div>

        <InfoGrid
          cols={6}
          headers={[
            'Effective Date',
            'Payrate',
            'Schedule',
            'Pay Type',
            'Overtime',
            'Note',
          ]}
          values={[
            [
              `${employeeData?.effectiveDate || 'N/A'}`,
              `${employeeData?.salary || 'N/A'}`,
              `${employeeData?.paymentSchedule || 'N/A'}`,
              'Salary',
              'Exempt',
              '',
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default EmploymentSection;
