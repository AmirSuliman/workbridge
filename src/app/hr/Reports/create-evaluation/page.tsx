'use client';

import Button from '@/components/Button';
import DepartmentDropdown from '@/components/DropDowns/DepratmentsDropdown';
import EmployeesDropdown from '@/components/DropDowns/EmployeesDropdown';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiLoaderCircle } from 'react-icons/bi';
import { FiPlusCircle } from 'react-icons/fi';

const CreateEvaluation = () => {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const [departmentId, setDepartmentId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-[22px] font-medium">Create Evaluation Survey</h1>
        <div className="flex flex-row items-center gap-3">
          <button className="p-2 px-2 bg-black rounded text-white text-[14px]">
            Save Draft
          </button>
          <button>Cancel</button>
        </div>
      </div>

      <div className=" bg-white rounded-[10px] border mt-8">
        <h1 className="text-[18px] font-medium p-6">Department</h1>
        <div className="flex items-center gap-4 p-6">
          <label className=" flex flex-col gap-1">
            <span className="text-gray-400">Department*</span>
            <DepartmentDropdown
              errors={errors}
              register={register}
              resetField={resetField}
              departmentId={departmentId}
            />
          </label>

          <label className=" flex flex-col gap-1">
            <span className="text-gray-400">Select Employee or Manager*</span>
            <EmployeesDropdown
              errors={errors}
              register={register}
              resetField={resetField}
              reportingManagerId={employeeId}
            />
          </label>
          <label className="flex items-center gap-2 mt-auto mb-3  ">
            <input
              type="checkbox"
              {...register('isReportingEmployee')}
              className="appearance-none border-2 border-black checked:bg-black text-white size-4 rounded"
            />
            Evaluative Reporting Employees
          </label>
        </div>
        <div className="h-[1.5px] w-full bg-gray-300 " />

        <h1 className="text-[18px] font-medium p-6 mt-6">Questions</h1>
        <div className="flex flex-row items-center gap-8  p-6">
          <label className=" flex flex-col gap-1">
            <span className="text-gray-400">Question</span>
            <input
              type="text "
              placeholder="Add your question"
              className=" border p-3 rounded w-[450px]"
            />
          </label>
          <label className="flex items-center gap-2 mt-auto mb-3  ">
            <input
              type="checkbox"
              name=""
              id=""
              className="appearance-none border-2 border-black checked:bg-black text-white size-4 rounded"
            />
            Allow response
          </label>
        </div>
        <div className="p-8 mb-24">
          <button className="bg-black text-white p-3 px-10 rounded flex flex-row items-center gap-3">
            <FiPlusCircle /> Add Question
          </button>
        </div>
      </div>
      <Button
        name={loading ? '' : 'Send Interview Invite'}
        icon={
          loading && (
            <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
          )
        }
        className="w-full max-w-xl mx-auto col-span-full mt-12"
        type="submit"
      />
    </form>
  );
};
export default CreateEvaluation;
