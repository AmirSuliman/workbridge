'use client';
import ProfilePicture from '@/app/hr/employees/components/ProfilePicture';
import { FaPhoneAlt } from 'react-icons/fa';
import { HiMiniGlobeAmericas, HiMiniHomeModern } from 'react-icons/hi2';
import BasicInfoIcon from '../icons/basic-info-icon';
import FormHeading from './FormHeading';
import { Controller } from 'react-hook-form';

const UserInfoSection = ({
  errors,
  control,
  register,
  previewUrl,
  editEmployee,
  handleFileChange,
}) => {
  console.log('Form errors user info: ', errors);

  return (
    <main className="p-4 rounded-md border-[1px] border-gray-border bg-white h-full">
      {/* Basic Information */}
      <div className="my-5">
        <FormHeading
          text="Basic Information"
          icon={<BasicInfoIcon classNames="w-4" />}
        />
        {editEmployee && (
          <Controller
            name="profilePictureUrl"
            control={control}
            render={({ field }) => (
              <ProfilePicture
                errors={errors}
                previewUrl={previewUrl}
                handleFileChange={handleFileChange}
              />
            )}
          />
        )}
        {editEmployee && (
          <label className="flex items-center gap-2 my-4">
            <input type="checkbox" {...register('isManager')} />
            <span className="form-label">Is Manager?</span>
          </label>
        )}
        <div className="grid sm:grid-cols-3 gap-4 my-5">
          <div className="flex flex-col">
            <h6 className="form-label">First Name*</h6>
            <input
              type="text"
              className={`form-input`}
              {...register('firstName')}
              readOnly={!editEmployee}
            />
            {errors?.firstName && (
              <p className="form-error">{errors?.firstName.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="form-label">Middle Name</h6>
            <input
              type="text"
              readOnly={!editEmployee}
              {...register('middleName')}
              className={`form-input`}
            />
          </div>
          <div className="flex flex-col">
            <h6 className="form-label">Surname*</h6>
            <input
              type="text"
              className={`form-input`}
              {...register('lastName')}
              readOnly={!editEmployee}
            />
            {errors?.lastName && (
              <p className="form-error">{errors?.lastName.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="form-label">Birthday*</h6>
            <input
              type="date"
              className="form-input"
              {...register('birthday')}
              readOnly={!editEmployee}
            />
            {errors?.birthday && (
              <p className="form-error">{errors?.birthday.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="form-label">Gender*</h6>
            {editEmployee ? (
              <select className="form-input" {...register('gender')}>
                <option value="" className="font-bold">
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <input
                type="text"
                className={`form-input`}
                {...register('gender')}
                readOnly={!editEmployee}
              />
            )}

            {errors?.gender && (
              <p className="form-error">{errors?.gender.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="form-label">Marital Status*</h6>
            {editEmployee ? (
              <select className="form-input" {...register('marritialStatus')}>
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Enganged">Engaged</option>
                <option value="Prefer not say">Prefer not to say</option>
              </select>
            ) : (
              <input
                type="text"
                className={`form-input`}
                {...register('marritialStatus')}
                readOnly={!editEmployee}
              />
            )}
            {errors?.marritialStatus && (
              <p className="form-error">{errors?.marritialStatus.message}</p>
            )}
          </div>
          <label className="form-label">
            Email*
            <input
              type="email"
              className={`form-input`}
              {...register('email')}
              readOnly={!editEmployee}
            />
            {errors?.email && (
              <p className="text-red-500">{errors?.email.message}</p>
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
          <label className="form-label">
            Street 1*
            <input
              type="text"
              className={`form-input`}
              {...register('location.street1')}
              readOnly={!editEmployee}
            />
            {errors?.location && errors?.location?.street1 && (
              <p className="form-error">{errors?.location?.street1.message}</p>
            )}
          </label>
          <label className="form-label">
            Street 2
            <input
              type="text"
              className={`form-input`}
              {...register('location.street2')}
              readOnly={!editEmployee}
            />
            {errors?.location && errors?.location?.street2 && (
              <p className="form-error">{errors?.location?.street2.message}</p>
            )}
          </label>
          <label className="form-label">
            Zip*
            <input
              type="number"
              className={`form-input`}
              {...register('location.zipCode', { valueAsNumber: true })}
              readOnly={!editEmployee}
            />
            {errors?.location?.zipCode && (
              <p className="form-error">{errors?.location?.zipCode.message}</p>
            )}
          </label>
          <label className="form-label">
            City*
            <input
              type="text"
              className={`form-input`}
              {...register('location.city')}
              readOnly={!editEmployee}
            />
            {errors?.location?.city && (
              <p className="form-error">{errors?.location?.city.message}</p>
            )}
          </label>
          <label className="form-label">
            Country*
            <input
              type="text"
              className={`form-input`}
              {...register('location.country')}
              readOnly={!editEmployee}
            />
            {errors?.location?.country && (
              <p className="form-error">{errors?.location?.country.message}</p>
            )}
          </label>
          <label className="form-label">
            State*
            <input
              type="text"
              className={`form-input`}
              {...register('location.state')}
              readOnly={!editEmployee}
            />
            {errors?.location?.state && (
              <p className="form-error">{errors?.location?.state.message}</p>
            )}
          </label>
        </div>
      </div>
      <hr />
      <div className="my-5">
        <FormHeading icon={<FaPhoneAlt className="w-4" />} text="Contact" />
        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          <label className="form-label">
            Phone*
            <input
              type="number"
              className={`form-input`}
              {...register('phoneNumber', { valueAsNumber: true })}
              readOnly={!editEmployee}
            />
            {errors?.phoneNumber && (
              <p className="form-error">{errors?.phoneNumber.message}</p>
            )}
          </label>
          <label className="form-label">
            Work Phone*
            <input
              type="number"
              className={`form-input`}
              {...register('workPhone', { valueAsNumber: true })}
              readOnly={!editEmployee}
            />
            {errors?.workPhone && (
              <p className="form-error">{errors?.workPhone.message}</p>
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
          <label className="form-label">
            LinkedIn
            <input
              type="text"
              className={`form-input`}
              {...register('linkedin')}
              readOnly={!editEmployee}
            />
            {errors?.linkedin && (
              <p className="form-error">{errors?.linkedin.message}</p>
            )}
          </label>
          <label className="form-label">
            Facebook
            <input
              type="text"
              className={`form-input`}
              {...register('facebook')}
              readOnly={!editEmployee}
            />
            {errors?.facebook && (
              <p className="form-error">{errors?.facebook.message}</p>
            )}
          </label>
          <label className="form-label">
            Instagram
            <input
              type="text"
              className={`form-input`}
              {...register('instagram')}
              readOnly={!editEmployee}
            />
            {errors?.instagram && (
              <p className="form-error">{errors?.instagram.message}</p>
            )}
          </label>
          <label className="form-label">
            Personal Website
            <input
              type="text"
              className={`form-input`}
              {...register('website')}
              readOnly={!editEmployee}
            />
            {errors?.website && (
              <p className="form-error">{errors?.website.message}</p>
            )}
          </label>
        </div>
      </div>
    </main>
  );
};
export default UserInfoSection;
