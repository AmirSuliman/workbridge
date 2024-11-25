'use client';
import { getEmployeeInfo } from '@/services/getEmployeeInfo';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiMiniGlobeAmericas, HiMiniHomeModern } from 'react-icons/hi2';
import BasicInfoIcon from '../icons/basic-info-icon';
import FormField from './FormField';
import FormHeading from './FormHeading';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEmployeeData,
  setEmployeeError,
} from '@/store/slices/employeeInfoSlice';
import { RootState } from '@/store/store';

const UserInfoSection: React.FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const employeeData = useSelector((state: RootState) => state.employee.data);
  const error = useSelector((state: RootState) => state.employee.error);

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      if (!session?.user.accessToken || !session?.user.userId) {
        dispatch(setEmployeeError('Invalid session or employee ID'));
        return;
      }

      try {
        const { data } = await getEmployeeInfo(
          session.user.accessToken,
          session.user.userId
        );
        dispatch(setEmployeeData(data));
        console.log('employee data: ', data);
      } catch (err: any) {
        console.error('Error fetching employee data:', err);
        dispatch(
          setEmployeeError(
            err.message || 'An error occurred while fetching employee data.'
          )
        );
      }
    };

    fetchEmployeeInfo();
  }, [session?.user.accessToken, session?.user.id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 rounded-md border-[1px] border-gray-border bg-white h-full">
      {/* Basic Information */}
      <div className="my-5">
        <FormHeading
          icon={<BasicInfoIcon classNames="w-4" />}
          text="Basic Information"
        />
        <div className="grid sm:grid-cols-3 gap-4 my-5">
          <FormField
            onChange={() => {}}
            label="First Name"
            value={employeeData.firstName || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Middle Name"
            value={employeeData.middleName || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Surname"
            value={employeeData.lastName || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Birthday"
            value={employeeData.birthday || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Gender"
            value={employeeData.gender || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Marital Status"
            value={employeeData.marritialStatus || 'N/A'}
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
            value={employeeData.location.street1 || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Street 2"
            value={employeeData.location.street2 || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Zip"
            value={employeeData.location.zipCode || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="City"
            value={employeeData.location.city || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Country"
            value={employeeData.location.country || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label=" State"
            value={employeeData.location.state || 'N/A'}
          />
        </div>
      </div>
      <hr />
      <div className="my-5">
        <FormHeading icon={<FaPhoneAlt className="w-4" />} text="Contact" />
        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          <FormField
            onChange={() => {}}
            label="Phone"
            value={employeeData.phoneNumber || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Work Phone"
            value={employeeData.workPhone || 'N/A'}
          />
        </div>
      </div>
      <hr />
      <div className="my-5">
        <FormHeading
          icon={<HiMiniGlobeAmericas className="w-4" />}
          text="Social Links"
        />
        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          <FormField
            onChange={() => {}}
            label="LinkedIn"
            value={employeeData.linkedin || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Facebook"
            value={employeeData.facebook || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Instagram"
            value={employeeData.instagram || 'N/A'}
          />
          <FormField
            onChange={() => {}}
            label="Personal Website"
            value={employeeData.website || 'N/A'}
          />
        </div>
      </div>
    </div>
  );
};
export default UserInfoSection;
