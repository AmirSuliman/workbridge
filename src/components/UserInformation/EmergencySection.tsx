'use client';
import React from 'react';
import BasicInfoIcon from '../icons/basic-info-icon';
import FormHeading from './FormHeading';
import FormField from './FormField';
import { HiMiniHomeModern } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const EmergencySection: React.FC = () => {
  const employeeData = useSelector((state: RootState) => state.employee.data);

  return (
    <div className="p-4 rounded-md border-[1px] border-gray-border bg-white h-full">
      {/* Basic Information */}
      <div className="my-5">
        <FormHeading
          icon={<BasicInfoIcon classNames="w-4" />}
          text="Emergency Contact"
        />
        <div className="grid sm:grid-cols-3 gap-4 my-5">
          <FormField
            onChange={() => {}}
            label="First Name"
            value={employeeData?.firstName || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Middle Name"
            value={employeeData?.middleName || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Surname"
            value={employeeData?.lastName || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Phone"
            value={employeeData?.phoneNumber || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Work Phone"
            value={employeeData?.workPhone || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Email"
            value={employeeData?.email || 'N/A'}
          />
        </div>
      </div>
      <hr className="text-white" />
      <div className="my-5">
        <FormHeading
          icon={<HiMiniHomeModern className="w-4" />}
          text="Address"
        />
        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          <FormField
            onChange={() => {}}
            label="Street 1"
            value={employeeData?.location.street1 || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Street 2"
            value={employeeData?.location.street2 || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Zip"
            value={employeeData?.location.zipCode || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="City"
            value={employeeData?.location.city || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Country"
            value={employeeData?.location.country || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="State"
            value={employeeData?.location.state || 'N/A'}
          />
        </div>
      </div>
    </div>
  );
};
export default EmergencySection;
