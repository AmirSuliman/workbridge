'use client';
import React, { useState } from 'react';
import { AiFillContacts } from 'react-icons/ai';
import { Heading, Label } from '../Helpers';
import { MdOutlineFileUpload } from 'react-icons/md';
import Button from '@/components/Button';
import { useFormContext } from 'react-hook-form';
import { useTabsContext } from '@/components/common/TabsComponent/TabsContainer';
import { useRouter } from 'next/navigation';
import { EmployeeData } from '@/types/employee';
import Image from 'next/image';

const BasicInfo = () => {
  const router = useRouter();
  const { activeTab, setActiveTab } = useTabsContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<EmployeeData>();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a blob URL for the uploaded file
      const blobUrl = URL.createObjectURL(file);
      setPreviewUrl(blobUrl); // Update the preview URL state
      setValue('profilePictureUrl', blobUrl); // Set the blob URL to the form value
    }
  };
  const handleNext = async () => {
    const isValid = await trigger(); 
    if (isValid) {
      setActiveTab(activeTab + 1); 
    } 
  };

  return (
    <div>
      <section className="bg-white rounded-lg border">
        {/* Basic Information Block */}
        <div className="border-b p-4 pb-12">
          <Heading icon={<AiFillContacts />} text="Basic Information" />
          <Label text="Profile Picture" />
          {!previewUrl ? ( // Render upload input if no preview is available
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
                onChange={handleFileChange}
              />
            </article>
          ) : (
            <div className="mt-4">
              <Image
                width={300}
                height={150}
                src={previewUrl}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full border"
              />
            </div>
          )}
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
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
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Enganged">Enganged</option>
                <option value="Divorced">Divorced</option>
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
              {
                name: 'email',
                label: 'Email',
                message: 'Email is required',
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
          onClick={handleNext}
        />
      </article>
    </div>
  );
};

export default BasicInfo;
