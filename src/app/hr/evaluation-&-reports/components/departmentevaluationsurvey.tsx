'use client';
import ScreenLoader from '@/components/common/ScreenLoader';
import axiosInstance from '@/lib/axios';
import { SurveyProps } from '@/types/common';
import { useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Evaluationsurvey = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [survey, setSurvey] = useState<SurveyProps | null>(null);
  
  const searchParams = useSearchParams();
  const surveyId = searchParams.get('survey');
  const { departmentId } = useParams();

  console.log('Survey ID:', surveyId);
  console.log('Department ID:', departmentId);

  useEffect(() => {
    const getSurvey = async () => {
      try {
        const response = await axiosInstance.get(`/survey/${surveyId}`, {
          params: { associations: true },
        });
        console.log('Survey Response:', response.data);
        setSurvey(response.data.data);
      } catch (error) {
        console.error('Error fetching survey:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (surveyId) getSurvey();
  }, [surveyId]);

  // Find the department matching `departmentId`
  const selectedDepartment = survey?.departments?.find(
    (department) => String(department.id) === String(departmentId)
  );

  return (
    <div className="bg-white p-6 border rounded-[10px]">
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <>
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="font-medium text-[18px]">Evaluation Survey</h1>
            <button
              className={`${
                survey?.status === 'Completed'
                  ? 'text-[#00B87D] bg-[#D5F6DD]'
                  : 'text-black bg-[#0F172A1A]'
              } p-1 px-3 text-[12px] font-medium rounded`}
            >
              {survey?.status}
            </button>
          </div>

          <div className="flex flex-row w-full sm:w-[70%] mt-10 gap-4">
            <label className="flex flex-col gap-1 w-full">
              <span className="text-gray-400 text-[14px]">Sent by</span>
              <div className="p-3 w-full border rounded text-[14px]">
                {`${survey?.user?.firstName} ${survey?.user?.lastName}`}
              </div>
            </label>
            <label className="flex flex-col gap-1 w-full">
              <span className="text-gray-400 text-[14px]">Date</span>
              <div className="p-3 w-full border rounded text-[14px]">
                {survey?.createdAt
                  ? new Date(survey.createdAt).toLocaleDateString()
                  : 'N/A'}
              </div>
            </label>
          </div>

          {selectedDepartment ? (
            <div className="flex flex-row w-full sm:w-[70%] mt-6 gap-4 mb-10">
              <label className="flex flex-col gap-1 w-full">
                <span className="text-gray-400 text-[14px]">Department</span>
                <div className="p-3 w-full border rounded text-[14px]">
                  {selectedDepartment.name || 'N/A'}
                </div>
              </label>
              <label className="flex flex-col gap-1 w-full">
                <span className="text-gray-400 text-[14px]">
                  Department Head
                </span>
                <div className="p-3 w-full border rounded text-[14px]">
                  {selectedDepartment.department_head_data
                    ? `${selectedDepartment.department_head_data.firstName} ${selectedDepartment.department_head_data.lastName}`
                    : 'N/A'}
                </div>
              </label>
            </div>
          ) : (
            <div className="p-3 mt-6 border rounded text-[14px] text-red-500">
              No matching department found.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Evaluationsurvey;
