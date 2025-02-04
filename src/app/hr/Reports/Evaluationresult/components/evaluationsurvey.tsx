'use client';
import ScreenLoader from '@/components/common/ScreenLoader';
import axiosInstance from '@/lib/axios';
import { SurveyProps } from '@/types/common';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Evaluationsurvey = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [survey, setSurvey] = useState<SurveyProps>();
  const searchParams = useSearchParams();
  const surveyId = searchParams.get('survey');
  console.log('survey id: ', survey);

  useEffect(() => {
    const getSurvey = async () => {
      try {
        const response = await axiosInstance.get(`/survey/${surveyId}`);
        console.log('single survey res:', response.data);
        setSurvey(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getSurvey();
  }, [surveyId]);

  return (
    <div className="bg-white p-6 border rounded-[10px]">
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <>
          <div className="flex flex-row items-center justify-between w-full ">
            <h1 className="font-medium text-[18px]">Evaluation Survey</h1>
            <button
              className={`${
                survey?.status === 'Completed'
                  ? 'text-[#00B87D] bg-[#D5F6DD]'
                  : 'text-black bg-[#0F172A1A]'
              }  p-1 px-3 text-[12px] font-medium rounded`}
            >
              {survey?.status}
            </button>
          </div>

          <div className="flex flex-row w-full sm:w-[70%] mt-10 gap-4">
            <label className="flex flex-col gap-1 w-full ">
              <span className="text-gray-400 text-[14px]">Sent by</span>
              <div className="p-3 w-full border rounded text-[14px]">
                {survey?.sendBy}
              </div>
            </label>
            <label className="flex flex-col gap-1 w-full ">
              <span className="text-gray-400 text-[14px]">Date</span>
              <div className="p-3 w-full border rounded text-[14px]">
                {new Date(survey?.createdAt || '').toLocaleDateString()}
              </div>
            </label>
          </div>
          <div className="flex flex-row w-full sm:w-[70%] mt-6 gap-4 mb-10">
            <label className="flex flex-col gap-1 w-full ">
              <span className="text-gray-400 text-[14px]">Department </span>
              <div className="p-3 w-full border rounded text-[14px]">
                {survey?.departmentId}
              </div>
            </label>
            <label className="flex flex-col gap-1 w-full ">
              <span className="text-gray-400 text-[14px]">
                Employee/Manager
              </span>
              <div className="p-3 w-full border rounded text-[14px]">
                {survey?.employeeId}
              </div>
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default Evaluationsurvey;
