'use client';

import { Label } from '@/app/hr/employees/components/Helpers';
import { RootState } from '@/store/store';
import { HiMiniBriefcase } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import DepratmentDropdown from '../DropDowns/DepratmentsDropdown';
import EmployeesDropdown from '../DropDowns/EmployeesDropdown';
import FormField from './FormField';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';

const EmploymentSection = ({ errors, register, editEmployee }) => {
  const employeeData = useSelector((state: RootState) => state.employee.data);
  const hireDate = employeeData?.hireDate
    ? employeeData.hireDate.split('T')[0]
    : 'N/A';

  const calculateDuration = (startDate: string | undefined): string => {
    if (!startDate) return 'N/A';

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
  const duration = employeeData?.hireDate ? calculateDuration(hireDate) : 'N/A';

  return (
    <main className="p-1 md:p-4 rounded-md  h-full">
      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white mb-4">
        <div className="mb-5">
          <FormHeading icon={<HiMiniBriefcase className="w-4" />} text="Job" />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Hire Date
            <input
              type={editEmployee ? 'date' : 'text'}
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('hireDate', { required: true })}
              readOnly={!editEmployee}
            />
            {errors.hireDate && (
              <p className="text-red-500">hireDate is required</p>
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
              type={editEmployee ? 'date' : 'text'}
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              {...register('effectiveDate', { required: true })}
              readOnly={!editEmployee}
            />
            {errors.effectiveDate && (
              <p className="text-red-500">effectiveDate is required</p>
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Employment Type
            {editEmployee ? (
              <>
                <select
                  className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
                  {...register('employmentType', {
                    required: 'Employment Type is required',
                  })}
                >
                  <option value="Fulltime">Select Type</option>
                  <option value="Fulltime">Full-Time</option>
                  <option value="Part Time">Part-Time</option>
                  <option value="Freelance">Freelance</option>
                </select>
                {errors.employmentType && (
                  <span className="text-red-500">
                    {errors.employmentType.message}
                  </span>
                )}
              </>
            ) : (
              <input
                type="text"
                className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
                {...register('employmentType', { required: true })}
                readOnly={!editEmployee}
              />
            )}
          </label>
          <label className="text-[#abaeb4] text-xs flex flex-col gap-1">
            Note
            <input
              type="text"
              className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md `}
              // {...register('effectiveDate', { required: true })}
              readOnly={!editEmployee}
            />
            {/* {errors.effectiveDate && (
              <p className="text-red-500">effectiveDate is required</p>
            )} */}
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

        {!editEmployee ? (
          <InfoGrid
            cols={6}
            headers={[
              'Effective Date',
              'Location',
              'Division',
              'Department',
              'Job Title',
              'Reporting Message',
            ]}
            values={[
              [
                `${employeeData?.effectiveDate || 'N/A'}`,
                `${employeeData?.location.country || ''}, ${
                  employeeData?.location.state || ''
                }`,
                `${employeeData?.location.country}`,
                `${employeeData?.department.name || 'N/A'}`,
                `${employeeData?.tittle || 'N/A'}`,
                `${employeeData?.reportingManagerId || 'N/A'}`,
              ],
            ]}
          />
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            <article>
              <Label text="Department*" /> <br />{' '}
              <DepratmentDropdown register={register} errors={errors} />
            </article>
            <article>
              <Label text="Reporting Manager*" /> <br />
              <EmployeesDropdown register={register} errors={errors} />
            </article>
            <article>
              <Label text="Job Title*" /> <br />
              <input
                type="text"
                placeholder="Add job title"
                className="p-2 rounded-md bg-transparent border w-full"
                {...register('tittle', {
                  required: 'Job title is required',
                })}
              />
              {errors.tittle && (
                <span className="text-red-500">{errors.tittle.message}</span>
              )}
            </article>
          </div>
        )}
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
            values={[
              [
                `${employeeData?.effectiveDate || 'N/A'}`,
                `${employeeData?.salary || 'N/A'}`,
                `${employeeData?.paymentSchedule || 'N/A'}`,
                'Salary',
                'Exempt',
                '',
              ],
            ]}
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
                  required: 'Compensation is required',
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
                className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
                {...register('payType', {
                  required: 'Paytype is required',
                })}
              >
                <option value="">Select PayType</option>
                <option value="Salary">Salary</option>
                <option value="Contract">Contract</option>
              </select>
              {errors.payType && (
                <span className="text-red-500">{errors.payType.message}</span>
              )}
            </article>
            <article>
              <Label text="Schedule*" /> <br />
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
                {...register('paymentSchedule', {
                  required: 'Schedule is required',
                })}
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
            {/* <article>
              <Label text="Effective Date*" /> <br />
              <input
                type="date"
                className="p-2 rounded-md bg-transparent border w-full"
                {...register('effectiveDate', {
                  required: 'Effective Date is required',
                })}
              />
              {errors.effectiveDate && (
                <span className="text-red-500">
                  {errors.effectiveDate.message}
                </span>
              )}
            </article> */}
          </div>
        )}
      </div>
      {/* {editEmployee && (
        <Button
          name="Save Changes"
          type="submit"
          className="bg-black text-white block mx-auto"
        />
      )} */}
    </main>
  );
};

export default EmploymentSection;
