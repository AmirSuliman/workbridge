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

const EmploymentSection = ({
  errors,
  resetField,
  register,
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
            Hire Date*
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
            Effective Date*
            <input
              type="date"
              className={`form-input`}
              {...register('effectiveDate')}
              readOnly={!editEmployee}
            />
            {errors?.effectiveDate && (
              <p className="form-error">{errors?.effectiveDate.message}</p>
            )}
          </label>
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
          {/* <label className="form-label">
            Note
            <input
              type="text"
              className={`form-input`}
              {...register('note')}
              readOnly={!editEmployee}
            />
            {errors?.note && <p className="form-error">{errors?.note.message}</p>}
          </label> */}
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
              'Effective Date',
              'Location',
              'Division',
              'Department',
              'Job Title',
              'Reporting Manager',
            ]}
            values={[
              [
                `${
                  employeeData?.effectiveDate
                    ? employeeData?.effectiveDate.split('T')[0] || 'N/A'
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
          <article>
            <Label text="Reporting Manager*" />
            {isUserPanel ? (
              <input
                value={`${employeeData?.manager?.firstName} ${employeeData?.manager?.lastName}`}
                className="form-input"
                readOnly
              ></input>
            ) : (
              <EmployeesDropdown
                errors={errors}
                register={register}
                resetField={resetField}
                reportingManagerId={employeeData.reportingManagerId}
              />
            )}
          </article>
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
      {/* <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
      <div className="mb-5">
        <FormHeading
          icon={<HiMiniBriefcase className="w-4" />}
          text="Payment"
        />
      </div>

      {!editEmployee ? (
        <InfoGrid
          cols={6}
          headers={[
            'Effective Date',
            'Payrate',
            'Schedule',
            'Pay Type',
            'Overtime',
            'Note',
          ]}
          values={
            employeeData.payments
              ? employeeData?.payments?.map((payment) => [
                  payment.effectiveDate.split('T')[0] || 'N/A',
                  payment.payRate || 'N/A',
                  payment.paymentSchedule || 'N/A',
                  payment.payType || 'N/A',
                  payment.overtime ? 'Liable' : 'Exempt',
                  payment.note || 'N/A',
                ])
              : ['', '', '', '', '', '']
          }
        />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <article>
            <Label text="Compensation*" />
            <input
              type="text"
              placeholder="Add annual compensation amount"
              className="form-input"
              {...register('salary', {
                valueAsNumber: true,
              })}
            />
            {errors?.salary && (
              <span className="form-error">{errors?.salary.message}</span>
            )}
          </article>
          <article>
            <Label text="Pay type" />
            <select className="form-input" {...register('payType')}>
              <option value="">Select PayType</option>
              <option value="Salary">Salary</option>
              <option value="Contract">Contract</option>
            </select>
            {errors?.payType && (
              <span className="form-error">{errors?.payType.message}</span>
            )}
          </article>
          <article>
            <Label text="Schedule*" />
            <select className="form-input" {...register('paymentSchedule')}>
              <option value="">Select Schedule</option>
              <option value="Weekly">Weekly</option>
              <option value="Biweekly">Biweekly</option>
              <option value="Once a month">Once a month</option>
            </select>
            {errors?.paymentSchedule && (
              <span className="form-error">
                {errors?.paymentSchedule.message}
              </span>
            )}
          </article>
        </div>
      )}
    </div> */}
    </main>
  );
};

export default EmploymentSection;
