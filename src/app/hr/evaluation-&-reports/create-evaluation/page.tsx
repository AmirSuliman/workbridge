'use client';
import Button from '@/components/Button';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FiPlusCircle } from 'react-icons/fi';
import ManagersDropdown from './ManagersDropdown';
import DepartmentDropdown from './DepartmentDropdown';

interface InnerUser {
  active: boolean;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  permissions: string[];
  profilePictureUrl: string;
  role: string;
  roleId: number;
  userId: string;
  accessToken: string;
  employeeId?: number;
}

interface Session {
  user: InnerUser;
}

interface User {
  employeeId: number | null;
}

const CreateEvaluation = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState<User>();
  const [isEvaluativeReportingEmployee, setIsEvaluativeReportingEmployee] =
    useState(false);
  const [departmentIds, setDepartmentIds] = useState<number[]>([]);
  const [managerIds, setManagerIds] = useState<number[]>([]);
  const [deadline, setDeadline] = useState<string>(''); 

  const fetchSession = async (): Promise<Session | null> => {
    const session = await getSession();
    return session;
  };

  useEffect(() => {
    const fetchSessionAndSetEmployeeId = async () => {
      const session = await fetchSession();
      if (session?.user?.employeeId) {
        setEmployeeId({ employeeId: session.user.employeeId });
      } else {
        setEmployeeId({ employeeId: null });
      }
    };

    fetchSessionAndSetEmployeeId();
  }, []);

  const {
    reset,
    register,
    resetField,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data, status) => {
    const transformedQuestions = data.questions.map((question) => ({
      ...question,
      responseType: question.responseType ? 'text' : 'Rating',
    }));
  
    const type = managerIds.length > 0 ? 'Manager' : 'Department';
    const payload = {
      sendBy: employeeId?.employeeId || null,
      departmentIds: departmentIds.length > 0 ? departmentIds : null,
      title: 'Survey Title',
      type: type,
      isReportingEmployee: isEvaluativeReportingEmployee,
      status: status,
      questions: transformedQuestions,
      employeeId: data.reportingManagerId,
      managerIds: managerIds.length > 0 ? managerIds : null,
      deadline: deadline || null,
    };
  
    try {
      setLoading(true);
      const response = await axiosInstance.post('/survey/', payload);
      console.log('Survey Created Response:', response.data);
  
      // Always send the survey if status is 'In Progress'
      const surveyId = response.data?.data?.survey?.id;
      if (surveyId && status === 'In Progress') {
        const sendPayload = {
          surveyId: surveyId,
          departmentIds: departmentIds.length > 0 ? departmentIds : null,
          managerIds: managerIds.length > 0 ? managerIds : null,
        };
  
        await axiosInstance.post('/survey/send/', sendPayload);
      }
  
      setLoading(false);
      toast.success(
        `${status === 'Draft' ? 'Draft saved' : 'Survey sent'} successfully!`
      );
  
      // Reset form fields for both Draft and Sent states
      reset(); // Clears the form inputs
      setDepartmentIds([]); // Clear department selection
      setManagerIds([]); // Clear manager selection
      setIsEvaluativeReportingEmployee(false); // Reset checkbox
      setDeadline('');
  
      // Reset form field values in React Hook Form
      setValue('isReportingEmployee', false);
      setValue('departmentIds', []);
      setValue('managerIds', []);
      setValue('deadline', '');
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Failed to create survey.');
      } else {
        toast.error('Failed to create survey.');
      }
    }
  };
  

  return (
    <form>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-[22px] font-medium">Create Evaluation Survey</h1>
        <div className="flex flex-row items-center gap-3">
          <button
            disabled={loading}
            onClick={handleSubmit((data) => onSubmit(data, 'Draft'))}
            className="p-2 px-2 bg-[#0F172A] rounded text-white text-[14px]"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      <div className=" bg-white rounded-[10px] border mt-8">
        <h1 className="text-[18px] font-medium p-6">Department</h1>
        <div className="flex items-center gap-4 p-6">
          {!isEvaluativeReportingEmployee ? (
            <label className=" flex flex-col gap-1">
              <span className="form-label">Department*</span>
              <DepartmentDropdown
                departmentId={departmentIds}
                setValue={setValue}
                errors={errors}
                onSelect={(selectedIds) => setDepartmentIds(selectedIds)}
              />
            </label>
          ) : (
            <label className=" flex flex-col gap-1">
              <span className="form-label">Select Employee or Manager*</span>
              <ManagersDropdown
                errors={errors}
                register={register}
                resetField={resetField}
                reportingManagerId={null}
                onSelect={(selectedIds) => setManagerIds(selectedIds)}
              />
            </label>
          )}

          <label className="flex items-center gap-2 mt-auto mb-3">
            <input
              type="checkbox"
              {...register('isReportingEmployee')}
              className="appearance-none border-2 border-black checked:bg-black text-white size-4 rounded"
              onChange={(e) => {
                const isChecked = e.target.checked;
                setIsEvaluativeReportingEmployee(isChecked);
                setValue('isReportingEmployee', isChecked);
              }}
            />
            Evaluative Reporting Employees
          </label>
          
        </div>
        <div className="p-6 w-[350px]">
  <label className="flex flex-col gap-1 ">
    <span className="form-label">Deadline*</span>
    <input
      type="date"
      value={deadline}
      onChange={(e) => setDeadline(e.target.value)}
      className="form-input p-2"
      required
    />
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
                {...register(`questions.${index}.responseType`)}
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
            onClick={() => append({ question: '', responseType: false })}
            className="bg-[#0F172A] text-white p-3 px-10 rounded flex flex-row items-center gap-3"
          >
            <FiPlusCircle /> Add Question
          </button>
        </div>
      </div>
      <Button
        onClick={handleSubmit((data) => onSubmit(data, 'In Progress'))}
        name={loading ? '' : 'Send Evaluation Survey'}
        icon={
          loading && (
            <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
          )
        }
        className="w-full max-w-xl mx-auto col-span-full mt-12"
        type="submit"
        disabled={loading}
      />
    </form>
  );
};

export default CreateEvaluation;
