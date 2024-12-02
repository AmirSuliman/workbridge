'use client';
import React from 'react';
import { AiFillContacts } from 'react-icons/ai';
import { Heading, Label } from '../Helpers';
import { MdOutlineFileUpload } from 'react-icons/md';
import Button from '@/components/Button';
import { useFormContext } from 'react-hook-form';
import { useTabsContext } from '@/components/common/TabsComponent/TabsContainer';
import { useRouter } from 'next/navigation';
import { EmployeeData } from '@/types/employee';

const BasicInfo = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
  } = useFormContext<EmployeeData>();
  const { activeTab, setActiveTab } = useTabsContext();
  return (
    <div>
      <section className="bg-white rounded-lg border">
        {/* Basic Information Block */}
        <div className="border-b p-4 pb-12">
          <Heading icon={<AiFillContacts />} text="Basic Information" />
          <Label text="Profile Picture" />
          <article className="w-[30%] p-10 rounded-md border border-dashed hover:bg-slate-200 cursor-pointer">
            <label
              htmlFor="profilePicture"
              className="flex items-center justify-center gap-x-2 cursor-pointer"
            >
              <span>Upload a profile picture</span>
              <MdOutlineFileUpload />
            </label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              className="hidden"
              {...register('profilePictureUrl', {
                required: 'Profile picture is required',
              })}
            />
          </article>
          {errors.profilePictureUrl && (
            <span className="text-red-500">
              {errors.profilePictureUrl.message}
            </span>
          )}
          <p className="text-sm py-8 text-[#abaeb4]">
            Make sure profile image is a valid image format (.jpg, .png)
          </p>
          <div className="grid grid-cols-3 gap-4">
            <article>
              <Label text="First Name" /> <br />
              <input
                type="text"
                placeholder="Add first name"
                className="p-2 rounded-md bg-transparent border w-full"
                {...register('firstName', {
                  required: 'First name is required',
                })}
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}
            </article>
            <article>
              <Label text="Middle Name" /> <br />
              <input
                type="text"
                placeholder="Add middle name"
                className="p-2 rounded-md bg-transparent border w-full"
                {...register('middleName', {
                  required: 'Middle name is required',
                })}
              />
              {errors.middleName && (
                <span className="text-red-500">
                  {errors.middleName.message}
                </span>
              )}
            </article>
            <article>
              <Label text="Last Name" /> <br />
              <input
                type="text"
                placeholder="Add last name"
                className="p-2 rounded-md bg-transparent border w-full"
                {...register('lastName', {
                  required: 'Last name is required',
                })}
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}
            </article>
            <article>
              <Label text="Birthday" /> <br />
              <input
                type="date"
                placeholder="Add birthday"
                className="p-2 rounded-md bg-transparent border w-full"
                {...register('birthday', {
                  required: 'Birthday is required',
                })}
              />
              {errors.birthday && (
                <span className="text-red-500">{errors.birthday.message}</span>
              )}
            </article>
            <article>
              <Label text="Gender" /> <br />
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <span className="text-red-500">{errors.gender.message}</span>
              )}
            </article>
            <article>
              <Label text="Marital Status" /> <br />
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
                {...register('marritialStatus', {
                  required: 'Marital status is required',
                })}
              >
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
              {errors.marritialStatus && (
                <span className="text-red-500">
                  {errors.marritialStatus.message}
                </span>
              )}
            </article>
          </div>
        </div>
        {/* Address Block */}
        <div className="p-4 pb-12 border-b">
          <Heading icon={<AiFillContacts />} text="Address" />
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                name: 'street1',
                label: 'Street 1',
                message: 'Street 1 is required',
              },
              {
                name: 'street2',
                label: 'Street 2',
                message: 'Street 2 is required',
              },
              { name: 'zip', label: 'Zip', message: 'Zip is required' },
              { name: 'city', label: 'City', message: 'City is required' },
              {
                name: 'country',
                label: 'Country',
                message: 'Country is required',
              },
              { name: 'state', label: 'State', message: 'State is required' },
            ].map((field) => (
              <article key={field.name}>
                <Label text={field.label} /> <br />
                <input
                  type="text"
                  placeholder={`Add ${field.label.toLowerCase()}`}
                  className="p-2 rounded-md bg-transparent border w-full"
                  {...register(field.name as keyof EmployeeData, {
                    required: field.message,
                  })}
                />
                {errors[field.name] && (
                  <span className="text-red-500">
                    {errors[field.name].message}
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
        {/* Social Links Block */}
        <div className="p-4 pb-12">
          <Heading icon={<AiFillContacts />} text="Social Links" />
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                name: 'linkedin',
                label: 'LinkedIn',
                message: 'LinkedIn is required',
              },
              {
                name: 'facebook',
                label: 'Facebook',
                message: 'Facebook is required',
              },
              {
                name: 'instagram',
                label: 'Instagram',
                message: 'Instagram is required',
              },
              {
                name: 'website',
                label: 'Personal Website',
                message: 'Personal website is required',
              },
            ].map((field) => (
              <article key={field.name}>
                <Label text={field.label} /> <br />
                <input
                  type="text"
                  placeholder={`Add ${field.label.toLowerCase()}`}
                  className="p-2 rounded-md bg-transparent border w-full"
                  {...register(field.name as keyof EmployeeData, {
                    required: field.message,
                  })}
                />
                {errors[field.name] && (
                  <span className="text-red-500">
                    {errors[field.name].message}
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <article className="flex justify-end mt-6 gap-x-4">
        <Button
          type="button"
          name="Cancel"
          bg="white"
          textColor="black"
          className="px-16"
          onClick={() => router.push('/hr/employees')}
        />
        <Button
          type="button"
          name="Next"
          className="px-16"
          onClick={() => setActiveTab(activeTab + 1)}
        />
      </article>
    </div>
  );
};

export default BasicInfo;
