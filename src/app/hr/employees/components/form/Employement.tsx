import Button from '@/components/Button';
import { useTabsContext } from '@/components/common/TabsComponent/TabsContainer';
import DepratmentDropdown from '@/components/DropDowns/DepratmentsDropdown';
import EmployeesDropdown from '@/components/DropDowns/EmployeesDropdown';
import { EmployeeData } from '@/types/employee';
import { useFormContext } from 'react-hook-form';
import { AiFillContacts } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import { Heading, Label } from '../Helpers';

const Employment = ({ loader }: { loader: boolean }) => {
  const { activeTab, setActiveTab } = useTabsContext();

  const {
    register,
    formState: { errors },
  } = useFormContext<EmployeeData>();

  // const handleNext = async () => {
  //   const fieldNamesForTab = [
  //     'firstName',
  //     'lastName',
  //     'departmentId',
  //     'email',
  //     'middleName',
  //     'salary',
  //     'tittle',
  //     'gender',
  //     'marritialStatus',
  //     'paymentSchedule',
  //     'payType',
  //     'effectiveDate',
  //     'overtime',
  //     'note',
  //     'profilePictureUrl',
  //     'linkedin',
  //     'instagram',
  //     'website',
  //     'facebook',
  //     'hireDate',
  //     'birthday',
  //     'phoneNumber',
  //     'workPhone',
  //     'reportingManagerId',
  //     'employmentType',
  //     'street1',
  //     'street2',
  //     'zipCode',
  //     'city',
  //     'country',
  //     'state',
  //   ];
  //   await trigger(fieldNamesForTab as (keyof EmployeeData)[]);
  //   // if (isValid) {
  //   //   setActiveTab(activeTab + 1);
  //   // }
  // };
  return (
    <>
      <section className="bg-white rounded-lg border">
        {/* employment block */}
        <div className="border-b p-4 pb-12">
          <Heading icon={<AiFillContacts />} text="Employment" />
          <div className="grid grid-cols-3 gap-4">
            <article>
              <Label text="Job Title*" />
              <input
                type="text"
                placeholder="Add job title"
                className="form-input"
                {...register('tittle')}
              />
              {errors.tittle && (
                <span className="form-error">{errors.tittle.message}</span>
              )}
            </article>
            <article>
              <Label text="Department*" />
              <DepratmentDropdown
                departmentId={null}
                register={register}
                errors={errors}
              />
            </article>
            <article>
              <Label text="Reporting Manager*" />
              <EmployeesDropdown
                reportingManagerId={null}
                register={register}
                errors={errors}
              />
            </article>
            <article>
              <Label text="Employment Type*" />
              <select className="form-input" {...register('employmentType')}>
                <option value="">Select Employment Type</option>
                <option value="Fulltime">Full-Time</option>
                <option value="Part Time">Part-Time</option>
                <option value="Freelance">Freelance</option>
              </select>
              {errors.employmentType && (
                <span className="form-error">
                  {errors.employmentType.message}
                </span>
              )}
            </article>
          </div>
        </div>
        {/* payment block */}
        <div className="p-4 pb-12">
          <Heading icon={<AiFillContacts />} text="Payment" />
          <div className="grid grid-cols-3 gap-4">
            <article>
              <Label text="Compensation*" />
              <input
                type="number"
                placeholder="Add annual compensation amount"
                className="form-input"
                {...register('salary', { valueAsNumber: true })}
              />
              {errors.salary && (
                <span className="form-error">{errors.salary.message}</span>
              )}
            </article>
            <article>
              <Label text="Pay type*" />
              <select className="form-input" {...register('payType')}>
                <option value="">Select PayType</option>
                <option value="Salary">Salary</option>
                <option value="Contract">Contract</option>
              </select>
              {errors.payType && (
                <span className="form-error">{errors.payType.message}</span>
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
              {errors.paymentSchedule && (
                <span className="form-error">
                  {errors.paymentSchedule.message}
                </span>
              )}
            </article>
            <article>
              <Label text="Hire Date*" />
              <input
                type="date"
                className="form-input"
                {...register('hireDate')}
              />
              {errors.hireDate && (
                <span className="form-error">{errors.hireDate.message}</span>
              )}
            </article>
            <article>
              <Label text="Effective Date*" />
              <input
                type="date"
                className="form-input"
                {...register('effectiveDate')}
              />
              {errors.effectiveDate && (
                <span className="form-error">
                  {errors.effectiveDate.message}
                </span>
              )}
            </article>
          </div>
        </div>
      </section>
      <article className="flex justify-end mt-6 gap-x-4">
        <Button
          type="button"
          name="Back"
          bg="white"
          textColor="black"
          className="px-16"
          onClick={() => setActiveTab(activeTab - 1)}
        />
        <Button
          // onClick={handleNext}
          type="submit"
          name={loader ? '' : 'Finish'}
          disabled={loader}
          className="px-16"
          icon={
            loader && (
              <BiLoaderCircle className="h-8 w-8 duration-100 animate-spin" />
            )
          }
          // onClick={() => setActiveTab(activeTab + 1)}
        />
      </article>
    </>
  );
};

export default Employment;
