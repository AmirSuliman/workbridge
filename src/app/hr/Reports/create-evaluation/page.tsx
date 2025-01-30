'use client';

import Button from '@/components/Button';
import DepartmentDropdown from '@/components/DropDowns/DepratmentsDropdown';
import EmployeesDropdown from '@/components/DropDowns/EmployeesDropdown';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FiPlusCircle } from 'react-icons/fi';

interface User {
  employeeId: number | null;
}

const CreateEvaluation = () => {
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState<User>();
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      // console.log('session: ', session);
      // setEmployeeId(session?.user?.employeeId);
    };

    fetchSession();
  }, []);
  console.log(employeeId);

  const {
    register,
    resetField,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   questions: [{ question: '', allowResponse: false }],
    // },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data) => {
    const payload = {
      status: 'In Progress',
      sendBy: employeeId,
      departmentId: data.departmentId,
      isReportingEmployee: data.isReportingEmployee,
      questions: data.questions,
    };
    console.log('payload: ', payload);
    try {
      setLoading(true);
      const response = await axiosInstance.post('/survey/', payload);
      console.log('response: ', response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Failed to create survey.');
      } else {
        toast.error('Failed to create survey.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-[22px] font-medium">Create Evaluation Survey</h1>
        <div className="flex flex-row items-center gap-3">
          {/* <button className="p-2 px-2 bg-black rounded text-white text-[14px]">
            Save Draft
          </button> */}
          <input
            type="submit"
            value="Draft"
            className="p-2 px-2 bg-black rounded text-white text-[14px]"
          />
          <button>Cancel</button>
        </div>
      </div>

      <div className=" bg-white rounded-[10px] border mt-8">
        <h1 className="text-[18px] font-medium p-6">Department</h1>
        <div className="flex items-center gap-4 p-6">
          <label className=" flex flex-col gap-1">
            <span className="form-label">Department*</span>
            <DepartmentDropdown
              errors={errors}
              register={register}
              resetField={resetField}
              departmentId={null}
            />
          </label>

          <label className=" flex flex-col gap-1">
            <span className="form-label">Select Employee or Manager*</span>
            <EmployeesDropdown
              errors={errors}
              register={register}
              resetField={resetField}
              reportingManagerId={null}
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
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row items-center gap-8 p-6">
            <label className="flex flex-col gap-1 flex-1">
              <span className="form-label">Question</span>
              <input
                type="text"
                placeholder="Add your question"
                className="form-input"
                {...register(`questions.${index}.question`, { required: true })}
              />
              {errors.questions?.[index]?.question && (
                <span className="text-red-500 text-sm">
                  Question is required
                </span>
              )}
            </label>
            <label className="flex items-center gap-2 mt-auto mb-3">
              <input
                type="checkbox"
                {...register(`questions.${index}.allowResponse`)}
                className="appearance-none border-2 border-black checked:bg-black text-white size-4 rounded"
              />
              Allow response
            </label>
            {index !== 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="p-8 mb-24">
          <button
            type="button"
            onClick={() => append({ question: '', allowResponse: false })}
            className="bg-black text-white p-3 px-10 rounded flex flex-row items-center gap-3"
          >
            <FiPlusCircle /> Add Question
          </button>
        </div>
      </div>
      <Button
        name={loading ? '' : 'Send Evaluation Survey'}
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
