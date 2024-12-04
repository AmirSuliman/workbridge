'use client';
import { getEmployeeInfo } from '@/services/getEmployeeInfo';
import {
  setEmployeeData,
  setEmployeeError,
} from '@/store/slices/employeeInfoSlice';
import { RootState } from '@/store/store';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiMiniGlobeAmericas, HiMiniHomeModern } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import BasicInfoIcon from '../icons/basic-info-icon';
import FormField from './FormField';
import FormHeading from './FormHeading';

const UserInfoSection = ({ errors, register, editEmployee }) => {
  const { empId } = useParams();
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
          empId || session.user.userId
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
  }, [
    dispatch,
    empId,
    session?.user.accessToken,
    session?.user.id,
    session?.user.userId,
  ]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-4 rounded-md border-[1px] border-gray-border bg-white h-full">
      {/* Basic Information */}
      <div className="my-5">
        <FormHeading
          icon={<BasicInfoIcon classNames="w-4" />}
          text="Basic Information"
        />
        <div className="grid sm:grid-cols-3 gap-4 my-5">
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">First Name</h6>
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('firstName', { required: true })}
              readOnly={!editEmployee}
              defaultValue={employeeData.firstName || 'N/A'}
            />
            {errors.firstName && (
              <p className="text-red-500">First Name is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Middle Name</h6>
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('middleName')}
              readOnly={!editEmployee}
              defaultValue={employeeData.middleName || 'N/A'}
            />
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Surname</h6>
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('lastName', { required: true })}
              readOnly={!editEmployee}
              defaultValue={employeeData.lastName || 'N/A'}
            />
            {errors.lastName && (
              <p className="text-red-500">Last Name is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Birthday</h6>
            <input
              type={editEmployee ? 'date' : 'text'}
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('birthday', { required: true })}
              readOnly={!editEmployee}
              defaultValue={employeeData.birthday || 'N/A'}
            />
            {errors.birthday && (
              <p className="text-red-500">Birthday is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Gender</h6>
            {editEmployee ? (
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            ) : (
              <input
                type="text"
                className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
                {...register('gender', { required: true })}
                readOnly={!editEmployee}
                defaultValue={employeeData.gender || 'N/A'}
              />
            )}
            {errors.gender && (
              <p className="text-red-500">gender is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Marital Status</h6>
            {editEmployee ? (
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
                {...register('marritialStatus', {
                  required: 'Marital status is required',
                })}
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Enganged">Enganged</option>
                <option value="Divorced">Divorced</option>
              </select>
            ) : (
              <input
                type="text"
                className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
                {...register('marritialStatus', { required: true })}
                readOnly={!editEmployee}
                defaultValue={employeeData.marritialStatus || 'N/A'}
              />
            )}
            {errors.marritialStatus && (
              <p className="text-red-500">Marritial Status is required</p>
            )}
          </div>
        </div>
      </div>
      <hr className="text-white" />
      <div className="my-5">
        <FormHeading
          icon={<HiMiniHomeModern className="w-4" />}
          text="Address"
        />
        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Street 1
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.street1', { required: true })}
              readOnly={!editEmployee}
              defaultValue={employeeData.location.street1 || 'N/A'}
            />
            {errors.location?.street1 && (
              <p className="text-red-500">street1 is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Street 2
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.street2', { required: true })}
              readOnly={!editEmployee}
              defaultValue={employeeData.location.street2 || 'N/A'}
            />
            {errors.location?.street2 && (
              <p className="text-red-500">street2 is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Zip
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.zipCode', { required: true })}
              readOnly={!editEmployee}
              defaultValue={employeeData.location.zipCode || 'N/A'}
            />
            {errors.location?.zipCode && (
              <p className="text-red-500">zipCode is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            City
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.city', { required: true })}
              readOnly={!editEmployee}
              defaultValue={employeeData.location.city || 'N/A'}
            />
            {errors.location?.city && (
              <p className="text-red-500">city is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Country
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.country', { required: true })}
              readOnly={!editEmployee}
              defaultValue={employeeData.location.country || 'N/A'}
            />
            {errors.location?.country && (
              <p className="text-red-500">country is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            State
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.state', { required: true })}
              readOnly={!editEmployee}
              defaultValue={employeeData.location.state || 'N/A'}
            />
            {errors.location?.state && (
              <p className="text-red-500">state is required</p>
            )}
          </label>
        </div>
      </div>
      <hr />
      <div className="my-5">
        <FormHeading icon={<FaPhoneAlt className="w-4" />} text="Contact" />
        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Phone
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('phoneNumber', { required: true })}
              readOnly={!editEmployee}
              defaultValue={employeeData.phoneNumber || 'N/A'}
            />
            {errors.phoneNumber && (
              <p className="text-red-500">phone is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Work Phone
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('phoneNumber', { required: true })}
              readOnly={!editEmployee}
              defaultValue={employeeData.workPhone || 'N/A'}
            />
            {errors.workPhone && (
              <p className="text-red-500">workPhone is required</p>
            )}
          </label>
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

      {/* {editEmployee && (
        <Button
          name="Save Changes"
          type="button"
          className="bg-black text-white block mx-auto"
        />
      )} */}
    </main>
  );
};
export default UserInfoSection;
