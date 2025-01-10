'use client';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiMiniGlobeAmericas, HiMiniHomeModern } from 'react-icons/hi2';
import BasicInfoIcon from '../icons/basic-info-icon';
import FormHeading from './FormHeading';

const UserInfoSection = ({ errors, register, editEmployee }) => {
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
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">First Name is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Middle Name</h6>
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('middleName')}
              readOnly={!editEmployee}
            />
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Surname</h6>
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('lastName', { required: true })}
              readOnly={!editEmployee}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">Last Name is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Birthday</h6>
            <input
              type={editEmployee ? 'date' : 'text'}
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('birthday', { required: true })}
              readOnly={!editEmployee}
            />
            {errors.birthday && (
              <p className="text-red-500 text-xs">Birthday is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Gender</h6>
            {editEmployee ? (
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm "
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value="" className='font-bold'>Select Gender</option>
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
              />
            )}
            {errors.gender && (
              <p className="text-red-500 text-xs">gender is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-[#abaeb4] text-xs mb-1">Marital Status</h6>
            {editEmployee ? (
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm "
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
              />
            )}
            {errors.marritialStatus && (
              <p className="text-red-500 text-xs">Marritial Status is required</p>
            )}
          </div>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Email
            <input
              type="email"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('email', { required: true })}
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
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.street1', { required: true })}
              readOnly={!editEmployee}
            />
            {errors.location?.street1 && (
              <p className="text-red-500 text-xs">street1 is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Street 2
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.street2')}
              readOnly={!editEmployee}
            />
            {errors.location?.street2 && (
              <p className="text-red-500 text-xs">{errors.location?.street2.message}</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Zip
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.zipCode', { required: true })}
              readOnly={!editEmployee}
            />
            {errors.location?.zipCode && (
              <p className="text-red-500 text-xs">zipCode is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            City
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.city', { required: true })}
              readOnly={!editEmployee}
            />
            {errors.location?.city && (
              <p className="text-red-500 text-xs">city is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Country
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.country', { required: true })}
              readOnly={!editEmployee}
            />
            {errors.location?.country && (
              <p className="text-red-500 text-xs">country is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            State
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('location.state', { required: true })}
              readOnly={!editEmployee}
            />
            {errors.location?.state && (
              <p className="text-red-500 text-xs">state is required</p>
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
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">phone is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Work Phone
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('workPhone', { required: true })}
              readOnly={!editEmployee}
            />
            {errors.workPhone && (
              <p className="text-red-500 text-xs">workPhone is required</p>
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
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('linkedin')}
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
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('facebook')}
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
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('instagram')}
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
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('website')}
              readOnly={!editEmployee}
            />
            {errors.website && (
              <p className="text-red-500 text-xs">{errors.website.message}</p>
            )}
          </label>
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
