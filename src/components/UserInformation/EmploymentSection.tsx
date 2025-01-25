'use client';

import { Label } from '@/app/hr/employees/components/Helpers';
import { HiMiniBriefcase } from 'react-icons/hi2';
import DepratmentDropdown from '../DropDowns/DepratmentsDropdown';
import EmployeesDropdown from '../DropDowns/EmployeesDropdown';
import FormField from './FormField';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';

const EmploymentSection = ({
  errors,
  register,
  editEmployee,
  employeeData,
}) => {
  // console.log('employeeData: ', employeeData);
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

  return (
    <main className="rounded-md  h-full">
      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white mb-4">
        <div className="mb-5">
          <FormHeading icon={<HiMiniBriefcase className="w-4" />} text="Job" />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Hire Date*
            <input
              type="date"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('hireDate')}
              readOnly={!editEmployee}
            />
            {errors.hireDate && (
              <p className="text-red-500">{errors.hireDate.message}</p>
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
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Effective Date
            <input
              type="date"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('effectiveDate')}
              readOnly={!editEmployee}
            />
            {errors.effectiveDate && (
              <p className="text-red-500">{errors.effectiveDate.message}</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Employment Type
            <select
              className="p-3 rounded-md bg-transparent border w-full text-sm text-black"
              {...register('employmentType')}
            >
              <option value="">Select Type</option>
              <option value="Fulltime">Full-Time</option>
              <option value="Part Time">Part-Time</option>
              <option value="Freelance">Freelance</option>
            </select>
            {errors.employmentType && (
              <p className="text-red-500 text-xs">
                {errors.employmentType.message}
              </p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Note
            <input
              type="text"
              className={`p-3 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('note')}
              readOnly={!editEmployee}
            />
            {errors.note && (
              <p className="text-red-500 text-xs">{errors.note.message}</p>
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
                `${employeeData?.location?.country || ''}, ${
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
            <Label text="Department*" /> <br />{' '}
            <DepratmentDropdown
              errors={errors}
              register={register}
              departmentId={employeeData.id}
            />
          </article>
          <article>
            <Label text="Reporting Manager*" /> <br />
            <EmployeesDropdown
              errors={errors}
              register={register}
              reportingManagerId={employeeData.reportingManagerId}
            />
          </article>
          <article>
            <Label text="Job Title*" /> <br />
            <input
              type="text"
              placeholder="Add job title"
              className="p-2 rounded-md bg-transparent border w-full"
              {...register('tittle')}
            />
            {errors.tittle && (
              <span className="text-red-500">{errors.tittle.message}</span>
            )}
          </article>
        </div>
      </div>
      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
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
              <Label text="Compensation*" /> <br />
              <input
                type="text"
                placeholder="Add annual compensation amount"
                className="p-2 rounded-md bg-transparent border w-full"
                {...register('salary', {
                  valueAsNumber: true,
                })}
              />
              {errors.salary && (
                <span className="text-red-500">{errors.salary.message}</span>
              )}
            </article>
            <article>
              <Label text="Pay type*" /> <br />
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-black"
                {...register('payType')}
              >
                <option value="">Select PayType</option>
                <option value="Salary">Salary</option>
                <option value="Contract">Contract</option>
              </select>
              {errors.payType && (
                <span className="text-red-500 text-xs">
                  {errors.payType.message}
                </span>
              )}
            </article>
            <article>
              <Label text="Schedule*" /> <br />
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-black"
                {...register('paymentSchedule')}
              >
                <option value="">Select Schedule</option>
                <option value="Weekly">Weekly</option>
                <option value="Biweekly">Biweekly</option>
                <option value="Once a month">Once a month</option>
              </select>
              {errors.paymentSchedule && (
                <span className="text-red-500">
                  {errors.paymentSchedule.message}
                </span>
              )}
            </article>
          </div>
        )}
      </div>
    </main>
  );
};

export default EmploymentSection;
