import Button from '@/components/Button';
import { useTabsContext } from '@/components/common/TabsComponent/TabsContainer';
import axiosInstance from '@/lib/axios';
import { getAllEmployees } from '@/services/getAllEmployees';
import { Department, EmployeeData } from '@/types/employee';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiFillContacts } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import { Heading, Label } from '../Helpers';

const Employment = ({ loader }: { loader: boolean }) => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const { activeTab, setActiveTab } = useTabsContext();

  const {
    register,
    formState: { errors },
  } = useFormContext<EmployeeData>();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getAllEmployees(1, 1000);
        console.log('Employees API Response: ', data);
        setEmployees(data.items);
      } catch (error) {
        console.error('Error fetching employees: ', error);
      }
    };
    const fetchDepartments = async () => {
      try {
        const { data } = await axiosInstance.get('/departments');
        console.log('Departments API Response: ', data);
        setDepartments(data.data.items);
      } catch (error) {
        console.error('Error fetching Departments: ', error);
      }
    };
    fetchDepartments();
    fetchEmployees();
  }, []);

  return (
    <>
      <section className="bg-white rounded-lg border">
        {/* employment block */}
        <div className="border-b p-4 pb-12">
          <Heading icon={<AiFillContacts />} text="Employment" />
          <div className="grid grid-cols-3 gap-4">
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
            <article>
              <Label text="Department*" /> <br />
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
                {...register('departmentId', {
                  required: 'Department is required',
                })}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={Number(department.id)}>
                    {department.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <span className="text-red-500">
                  {errors.departmentId.message}
                </span>
              )}
            </article>
            <article>
              <Label text="Reporting Manager*" /> <br />
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
                {...register('reportingManagerId', {
                  required: 'Reporting Manager is required',
                })}
              >
                <option value="">Select Manager</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={Number(employee.id)}>
                    {employee.firstName} {employee.lastName} - {employee.tittle}
                  </option>
                ))}
              </select>
              {errors.reportingManagerId && (
                <span className="text-red-500">
                  {errors.reportingManagerId.message}
                </span>
              )}
            </article>
            <article>
              <Label text="Employment Type*" /> <br />
              <select
                className="p-3 rounded-md bg-transparent border w-full text-sm text-[#abaeb4]"
                {...register('employmentType', {
                  required: 'Employment Type is required',
                })}
              >
                <option value="">Select Type</option>
                <option value="Fulltime">Full-Time</option>
                <option value="Part Time">Part-Time</option>
                <option value="Freelance">Freelance</option>
              </select>
              {errors.employmentType && (
                <span className="text-red-500">
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
            <article>
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
