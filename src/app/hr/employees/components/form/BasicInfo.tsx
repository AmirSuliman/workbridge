'use client';
import Button from '@/components/Button';
import { useTabsContext } from '@/components/common/TabsComponent/TabsContainer';
import { EmployeeData } from '@/types/employee';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { AiFillContacts } from 'react-icons/ai';
import { Heading, Label } from '../Helpers';
import ProfilePicture from '../ProfilePicture';

const BasicInfo = ({ previewUrl, handleFileChange }) => {
  const router = useRouter();
  const { activeTab, setActiveTab } = useTabsContext();

  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<EmployeeData>();

  const handleNext = async () => {
    const fieldNamesForTab = [
      'firstName',
      'lastName',
      'email',
      'birthday',
      'gender',
      'marritialStatus',
      'street1',
      'street2',
      'country',
      'state',
      'city',
    ];
    const isValid = await trigger(fieldNamesForTab as (keyof EmployeeData)[]);
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
          <ProfilePicture
            previewUrl={previewUrl}
            handleFileChange={handleFileChange}
            errors={errors}
          />
          <div className="grid grid-cols-3 gap-4">
            <article>
              <Label text="First Name*" /> <br />
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
                {...register('middleName')}
              />
              {errors.middleName && (
                <span className="text-red-500">
                  {errors.middleName.message}
                </span>
              )}
            </article>
            <article>
              <Label text="Last Name*" /> <br />
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
              <Label text="Birthday*" /> <br />
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
              <Label text="Gender*" /> <br />
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-black"
                {...register('gender', { required: 'Gender is required' })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <span className="text-red-500">{errors.gender.message}</span>
              )}
            </article>
            <article>
              <Label text="Marital Status*" /> <br />
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-black"
                {...register('marritialStatus', {
                  required: 'Marital status is required',
                })}
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Enganged">Enganged</option>
                <option value="Prefer not say">Prefer not to say</option>
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
                label: 'Street 1*',
                message: 'Street 1 is required',
              },
              {
                name: 'street2',
                label: 'Street 2',
                message: '',
              },
              { name: 'zip', label: 'Zip*', message: 'Zip is required' },
              { name: 'city', label: 'City*', message: 'City is required' },
              {
                name: 'country',
                label: 'Country*',
                message: 'Country is required',
              },
              { name: 'state', label: 'State*', message: 'State is required' },
            ].map((field) => (
              <article key={field.name}>
                <Label text={field.label} /> <br />
                <input
                  type="text"
                  placeholder={`Add ${field.label.toLowerCase().split('*')[0]}`}
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
                message: '',
              },
              {
                name: 'facebook',
                label: 'Facebook',
                message: '',
              },
              {
                name: 'instagram',
                label: 'Instagram',
                message: '',
              },
              {
                name: 'website',
                label: 'Personal Website',
                message: '',
              },
              {
                name: 'email',
                label: 'Email*',
                message: 'Email is required',
              },
            ].map((field) => (
              <article key={field.name}>
                <Label text={field.label} /> <br />
                <input
                  type="text"
                  placeholder={`Add ${field.label.toLowerCase().split('*')[0]}`}
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
