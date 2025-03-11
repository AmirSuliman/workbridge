'use client';

import { Label } from '@/app/hr/employees/components/Helpers';
import { HiMiniBriefcase } from 'react-icons/hi2';
import DepratmentDropdown from '../DropDowns/DepratmentsDropdown';
import EmployeesDropdown from '../DropDowns/EmployeesDropdown';
import FormField from './FormField';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const EmploymentSection = ({
  errors,
  register,
  resetField,
  editEmployee,
  employeeData,
}) => {
  const hireDate = employeeData?.hireDate
    ? employeeData.hireDate.split('T')[0]
    : 'N/A';

  const calculateDuration = (startDate: string | undefined): string => {
    if (!startDate) return '';

    const start = new Date(startDate);
    const now = new Date();
    // Get the difference in milliseconds
    const differenceInMilliseconds = now.getTime() - start.getTime();
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const months =
      now.getMonth() -
      start.getMonth() +
      12 * (now.getFullYear() - start.getFullYear());
    if (months < 1) return `${days}d`;
    if (months < 12) return `${months}m`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years}y ${remainingMonths}m`;
  };
  const duration = employeeData?.hireDate ? calculateDuration(hireDate) : '';

  const [role, setRole] = useState<string>();
  const { empId } = useParams(); // This id is used to view any employee's info

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role);
    };

    fetchSession();
  }, []);

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  return (
    <main className="rounded-md  h-full">
      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white mb-4">
        <div className="mb-5">
          <FormHeading icon={<HiMiniBriefcase className="w-4" />} text="Job" />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <label className="form-label">
            Hire Date
            <input
              type="date"
              className={`form-input`}
              {...register('hireDate')}
              readOnly={!editEmployee}
            />
            {errors?.hireDate && (
              <p className="form-error">{errors?.hireDate.message}</p>
            )}
          </label>
          {!editEmployee && (
            <FormField
              onChange={() => console.log('')}
              label="Duration"
              value={duration}
            />
          )}
        </div>
      </div>

      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
        <div className="mb-5">
          <FormHeading
            icon={<HiMiniBriefcase className="w-4" />}
            text="Employment Status"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="form-label">
            Employment Type*
            {editEmployee ? (
              <select className="form-input" {...register('employmentType')}>
                <option value="">Select Type</option>
                <option value="Fulltime">Full-Time</option>
                <option value="Part Time">Part-Time</option>
                <option value="Freelance">Freelance</option>
              </select>
            ) : (
              <input
                type="text"
                className={`form-input`}
                {...register('employmentType')}
                readOnly={!editEmployee}
              />
            )}
            {errors?.employmentType && (
              <p className="form-error">{errors?.employmentType.message}</p>
            )}
          </label>
        </div>
      </div>

      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
        <div className="mb-5">
          <FormHeading
            icon={<HiMiniBriefcase className="w-4" />}
            text="Job Information"
          />
        </div>

        <div className={`${editEmployee ? 'hidden' : 'block'}`}>
          <InfoGrid
            cols={6}
            headers={[
              'Hire Date',
              'Location',
              'Division',
              'Department',
              'Job Title',
              'Reporting Manager',
            ]}
            values={[
              [
                `${
                  employeeData?.hireDate
                    ? employeeData?.hireDate.split('T')[0] || 'N/A'
                    : 'N/A'
                }`,
                employeeData?.location?.country ===
                employeeData?.location?.state
                  ? `${employeeData?.location?.country || ''}`
                  : `${employeeData?.location?.country || ''}, ${
                      employeeData?.location?.state || ''
                    }`,
                `${employeeData?.location?.country}`,
                `${employeeData?.department?.name || 'N/A'}`,
                `${employeeData?.tittle || 'N/A'}`,
                `${employeeData?.manager?.firstName} ${employeeData?.manager?.lastName}`,
              ],
            ]}
          />
        </div>
        <div
          className={`${editEmployee ? 'grid md:grid-cols-3 gap-4' : 'hidden'}`}
        >
          <article>
            <Label text="Department*" />{' '}
            <DepratmentDropdown
              errors={errors}
              register={register}
              resetField={resetField}
              departmentId={employeeData.id}
            />
          </article>

          {/* If role is admin and empId not coming from the search params */}
          {role === 'SuperAdmin' && !empId ? (
            ''
          ) : (
            <article>
              <Label text="Reporting Manager" />
              <EmployeesDropdown
                errors={errors}
                register={register}
                resetField={resetField}
                reportingManagerId={employeeData.reportingManagerId}
              />
            </article>
          )}
          <article>
            <Label text="Job Title*" />
            <input
              type="text"
              placeholder="Add job title"
              className="form-input"
              {...register('tittle')}
            />
            {errors?.tittle && (
              <span className="form-error">{errors?.tittle.message}</span>
            )}
          </article>
        </div>
      </div>
    </main>
  );
};

export default EmploymentSection;
