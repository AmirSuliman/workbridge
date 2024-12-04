'use client';

import { RootState } from '@/store/store';
import { HiMiniBriefcase } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
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

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   // watch,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: employeeData || undefined,
  // });

  // const onSubmit = async (data: any) => {
  //   try {
  //     const { data: updatedData } = await axiosInstance.put(
  //       `/employee/${empId}`,
  //       data
  //     );
  //     dispatch(setEmployeeData(updatedData));
  //     alert('Employee information updated successfully!');
  //   } catch (err) {
  //     console.error('Error updating employee data:', err);
  //     dispatch(setEmployeeError('Failed to update employee information.'));
  //   }
  // };
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
              defaultValue={hireDate || 'N/A'}
            />
            {errors.hireDate && (
              <p className="text-red-500">hireDate is required</p>
            )}
          </label>
          {/* <FormField
            onChange={() => console.log('')}
            label="Hire Date"
            value={hireDate}
          /> */}
          <FormField
            onChange={() => console.log('')}
            label="Duration"
            value={duration}
          />
        </div>
      </div>

      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
        <div className="mb-5">
          <FormHeading
            icon={<HiMiniBriefcase className="w-4" />}
            text="Employment Status"
          />
        </div>
        <InfoGrid
          headers={['Effective Date', 'Work Type', 'Note']}
          values={[
            [
              `${employeeData?.effectiveDate || 'N/A'}`,
              `${employeeData?.employmentType || 'N/A'}`,
              '',
            ],
          ]}
        />
      </div>

      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
        <div className="mb-5">
          <FormHeading
            icon={<HiMiniBriefcase className="w-4" />}
            text="Job Information"
          />
        </div>

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
      </div>
      <div className="p-3 sm:p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5">
        <div className="mb-5">
          <FormHeading
            icon={<HiMiniBriefcase className="w-4" />}
            text="Payment"
          />
        </div>

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
