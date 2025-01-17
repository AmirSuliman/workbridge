'use client';
import ProfilePicture from '@/app/hr/employees/components/ProfilePicture';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiMiniGlobeAmericas, HiMiniHomeModern } from 'react-icons/hi2';
import BasicInfoIcon from '../icons/basic-info-icon';
import FormHeading from './FormHeading';

const UserInfoSection = ({
  errors,
  register,
  previewUrl,
  employeeData,
  editEmployee,
  handleFileChange,
}) => {
  return (
    <main className="p-4 rounded-md border-[1px] border-gray-border bg-white h-full">
      {/* Basic Information */}
      <div className="my-5">
        <FormHeading
          text="Basic Information"
          icon={<BasicInfoIcon classNames="w-4" />}
        />
        {editEmployee && (
          <ProfilePicture
            errors={errors}
            previewUrl={previewUrl}
            handleFileChange={handleFileChange}
          />
        )}
        <div className="grid sm:grid-cols-3 gap-4 my-5">
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">First Name</h6>
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('firstName', { required: true })}
              defaultValue={employeeData?.firstName || ''}
              readOnly={!editEmployee}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">First Name is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Middle Name</h6>
            <input
              type="text"
              readOnly={!editEmployee}
              {...register('middleName')}
              defaultValue={employeeData?.middleName || ''}
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
            />
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Surname</h6>
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('lastName', { required: true })}
              defaultValue={employeeData?.lastName || ''}
              readOnly={!editEmployee}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">Last Name is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Birthday</h6>
            <input
              type="date"
              className="p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md"
              {...register('birthday', { required: true })}
              defaultValue={
                employeeData?.birthday
                  ? new Date(employeeData.birthday).toISOString().split('T')[0]
                  : ''
              }
              readOnly={!editEmployee}
            />
            {errors.birthday && (
              <p className="text-red-500 text-xs">{errors.birthday.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Gender</h6>
            <select
              className="p-3 rounded-md bg-transparent border w-full text-sm "
              {...register('gender', { required: 'Gender is required' })}
              defaultValue={employeeData?.gender || ''}
            >
              <option value="" className="font-bold">
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {errors.gender && (
              <p className="text-red-500 text-xs">gender is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Marital Status</h6>
            <select
              className="p-3 rounded-md bg-transparent border w-full text-sm "
              {...register('marritialStatus', {
                required: 'Marital status is required',
              })}
              defaultValue={employeeData?.marritialStatus || ''}
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Enganged">Enganged</option>
              <option value="Prefer not say">Prefer not to say</option>
            </select>

            {errors.marritialStatus && (
              <p className="text-red-500 text-xs">
                Marritial Status is required
              </p>
            )}
          </div>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Email
            <input
              type="email"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('email', { required: true })}
              defaultValue={employeeData?.email || ''}
              readOnly={!editEmployee}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </label>
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
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.street1', { required: true })}
              defaultValue={employeeData?.location?.street1 || ''}
              readOnly={!editEmployee}
            />
            {errors.location?.street1 && (
              <p className="text-red-500 text-xs">
                {errors.location?.street1.message}
              </p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Street 2
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.street2')}
              defaultValue={employeeData?.location?.street2 || ''}
              readOnly={!editEmployee}
            />
            {errors.location?.street2 && (
              <p className="text-red-500 text-xs">
                {errors.location?.street2.message}
              </p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Zip
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.zipCode', { required: true })}
              defaultValue={employeeData?.location?.zipCode || ''}
              readOnly={!editEmployee}
            />
            {errors.location?.zipCode && (
              <p className="text-red-500 text-xs">
                {errors.location?.zipCode.message}
              </p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            City
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.city', { required: true })}
              defaultValue={employeeData?.location?.city || ''}
              readOnly={!editEmployee}
            />
            {errors.location?.city && (
              <p className="text-red-500 text-xs">
                {errors.location?.city.message}
              </p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Country
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.country', { required: true })}
              defaultValue={employeeData?.location?.country || ''}
              readOnly={!editEmployee}
            />
            {errors.location?.country && (
              <p className="text-red-500 text-xs">
                {errors.location?.country.message}
              </p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            State
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.state', { required: true })}
              defaultValue={employeeData?.location?.state || ''}
              readOnly={!editEmployee}
            />
            {errors.location?.state && (
              <p className="text-red-500 text-xs">
                {errors.location?.state.message}
              </p>
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
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('phoneNumber', {
                required: 'Phone number is required',
              })}
              defaultValue={employeeData?.phoneNumber || ''}
              readOnly={!editEmployee}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Work Phone
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('workPhone', {
                required: 'Work phone number is required',
              })}
              defaultValue={employeeData?.workPhone || ''}
              readOnly={!editEmployee}
            />
            {errors.workPhone && (
              <p className="text-red-500 text-xs">{errors.workPhone.message}</p>
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
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            LinkedIn
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('linkedin')}
              defaultValue={employeeData?.linkedin || ''}
              readOnly={!editEmployee}
            />
            {errors.linkedin && (
              <p className="text-red-500 text-xs">{errors.linkedin.message}</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Facebook
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('facebook')}
              defaultValue={employeeData?.facebook || ''}
              readOnly={!editEmployee}
            />
            {errors.facebook && (
              <p className="text-red-500 text-xs">{errors.facebook.message}</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Instagram
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('instagram')}
              defaultValue={employeeData?.instagram || ''}
              readOnly={!editEmployee}
            />
            {errors.instagram && (
              <p className="text-red-500 text-xs">{errors.instagram.message}</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Personal Website
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('website')}
              defaultValue={employeeData?.website || ''}
              readOnly={!editEmployee}
            />
            {errors.website && (
              <p className="text-red-500 text-xs">{errors.website.message}</p>
            )}
          </label>
        </div>
      </div>
    </main>
  );
};
export default UserInfoSection;
