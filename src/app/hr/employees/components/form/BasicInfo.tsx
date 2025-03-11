'use client';
import Button from '@/components/Button';
import { useTabsContext } from '@/components/common/TabsComponent/TabsContainer';
import { EmployeeData } from '@/types/employee';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { AiFillContacts } from 'react-icons/ai';
import { Heading, Label } from '../Helpers';
import ProfilePicture from '../ProfilePicture';
import FormHeading from '@/components/UserInformation/FormHeading';
import { FaPhoneAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';

interface Country {
  id: number;
  country: string;
  code: string;
}

const BasicInfo = ({ previewUrl, handleFileChange }) => {
  const router = useRouter();
  const { activeTab, setActiveTab } = useTabsContext();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axiosInstance.get('/countries');
        if (countriesResponse.data?.data?.items) {
          setCountries(countriesResponse.data.data.items);
        }
        console.log('countries: ', countriesResponse.data?.data?.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      'location.street1',
      'location.street2',
      'location.zipCode',
      'location.country',
      'location.state',
      'location.city',
      'phoneNumber',
      'workPhone',
      'profilePictureUrl',
      'linkedin',
      'instagram',
      'website',
      'facebook',
      'isManager',
      'countryId',
      // 'paymentSchedule',
      // 'payType',
      // 'effectiveDate',
      // 'overtime',
      // 'note',
      // 'hireDate',
      // 'reportingManagerId',
      // 'employmentType',
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

          <label className="flex items-center gap-2 mb-4">
            <input type="checkbox" {...register('isManager')} />
            <span className="form-label">Is Manager?</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <article>
              <Label text="First Name*" />
              <input
                type="text"
                placeholder="Add first name"
                className="form-input"
                {...register('firstName', {
                  required: 'First name is required',
                })}
              />
              {errors.firstName && (
                <span className="form-error">{errors.firstName.message}</span>
              )}
            </article>
            <article>
              <Label text="Middle Name" />
              <input
                type="text"
                placeholder="Add middle name"
                className="form-input"
                {...register('middleName')}
              />
              {errors.middleName && (
                <span className="form-error">{errors.middleName.message}</span>
              )}
            </article>
            <article>
              <Label text="Last Name*" />
              <input
                type="text"
                placeholder="Add last name"
                className="form-input"
                {...register('lastName', {
                  required: 'Last name is required',
                })}
              />
              {errors.lastName && (
                <span className="form-error">{errors.lastName.message}</span>
              )}
            </article>
            <article>
              <Label text="Birthday" />
              <input
                type="date"
                placeholder="Add birthday"
                className="form-input"
                {...register('birthday', {
                  required: 'Birthday is required',
                })}
              />
              {errors.birthday && (
                <span className="form-error">{errors.birthday.message}</span>
              )}
            </article>
            <article>
              <Label text="Gender*" />
              <select className="form-input" {...register('gender')}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <span className="form-error">{errors.gender.message}</span>
              )}
            </article>
            <article>
              <Label text="Marital Status*" />
              <select className="form-input" {...register('marritialStatus')}>
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Enganged">Engaged </option>
                <option value="Prefer not say">Prefer not to say</option>
              </select>
              {errors.marritialStatus && (
                <span className="form-error">
                  {errors.marritialStatus.message}
                </span>
              )}
            </article>
            <article>
              <Label text="Country*" />
              <select
                {...register('countryId', {
                  valueAsNumber: true,
                  required: 'Country is required',
                })}
                className="border p-2 rounded  focus:outline-none"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.country}
                  </option>
                ))}
              </select>
              {errors.countryId && (
                <span className="form-error">{errors.countryId.message}</span>
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
                type: 'text',
                name: 'location.street1',
                label: 'Street 1',
              },
              {
                type: 'text',
                name: 'location.street2',
                label: 'Street 2',
              },
              {
                type: 'text',
                name: 'location.zipCode',
                label: 'Zip',
              },
              {
                type: 'text',
                name: 'location.city',
                label: 'City*',
              },
              {
                type: 'text',
                name: 'location.country',
                label: 'Country*',
              },
              {
                type: 'text',
                name: 'location.state',
                label: 'State',
              },
            ].map((field) => (
              <article key={field.name}>
                <Label text={field.label} />
                <input
                  type={field.type}
                  placeholder={`Add ${field.label.toLowerCase().split('*')[0]}`}
                  className="form-input"
                  {...register(field.name as keyof EmployeeData)}
                />
                {errors.location &&
                  errors.location[field.name.split('.')[1]] && (
                    <span className="form-error">
                      {errors.location[field.name.split('.')[1]]?.message}
                    </span>
                  )}
              </article>
            ))}
          </div>
        </div>

        <div className="p-4 pb-12 border-b">
          <FormHeading icon={<FaPhoneAlt className="w-4" />} text="Contact" />
          <div className="grid sm:grid-cols-3 gap-4 mt-5">
            <label className="form-label">
              Phone
              <input
                type="text"
                className={`form-input`}
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && (
                <p className="form-error">{errors.phoneNumber.message}</p>
              )}
            </label>
            <label className="form-label">
              Work Phone
              <input
                type="text"
                className={`form-input`}
                {...register('workPhone')}
              />
              {errors.workPhone && (
                <p className="form-error">{errors.workPhone.message}</p>
              )}
            </label>
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
              },
              {
                name: 'facebook',
                label: 'Facebook',
              },
              {
                name: 'instagram',
                label: 'Instagram',
              },
              {
                name: 'website',
                label: 'Personal Website',
              },
              {
                name: 'email',
                label: 'Email*',
              },
            ].map((field) => (
              <article key={field.name}>
                <Label text={field.label} />
                <input
                  type="text"
                  placeholder={`Add ${field.label.toLowerCase().split('*')[0]}`}
                  className="form-input"
                  {...register(field.name as keyof EmployeeData)}
                />
                {errors[field.name] && (
                  <span className="form-error">
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
          className=" !px-16 !w-[200px] !text-[14px] !p-2"
          onClick={() => router.push('/hr/employees')}
        />
        <Button
          type="button"
          name="Next"
          className="!px-16 !w-[200px] !text-[14px] !p-2"
          onClick={handleNext}
        />
      </article>
    </div>
  );
};

export default BasicInfo;
