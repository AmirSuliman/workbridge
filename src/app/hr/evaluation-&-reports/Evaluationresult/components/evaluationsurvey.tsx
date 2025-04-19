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
  const { managerId } = useParams();

  useEffect(() => {
    const getSurvey = async () => {
      try {
        const response = await axiosInstance.get(`/survey/${surveyId}`, {
          params: { associations: true },
        });
        setSurvey(response.data.data);
      } catch (error) {
        console.error('Error fetching survey:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (surveyId) getSurvey();
  }, [surveyId]);

  // Find the manager matching `managerId`
  const selectedManager = survey?.managers?.find(
    (manager) => String(manager.id) === String(managerId)
  );

  return (
    <div className='bg-white p-6 border rounded-[10px]'>
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <>
          <div className='flex flex-row items-center justify-between w-full'>
            <h1 className='font-medium text-[18px]'>Evaluation Survey</h1>
            <button
              className={`${
                selectedManager?.SurveyEmployee?.status === 'Completed'
                  ? 'text-[#00B87D] bg-[#D5F6DD]'
                  : 'text-black bg-[#0F172A1A]'
              } p-1 px-3 text-[12px] font-medium rounded`}
            >
              {selectedManager?.SurveyEmployee?.status || 'N/A'}
            </button>
          </div>

          <div className='flex flex-row w-full sm:w-[70%] mt-10 gap-4'>
            <label className='flex flex-col gap-1 w-full'>
              <span className='text-gray-400 text-[14px]'>Sent by</span>
              <div className='p-3 w-full border rounded text-[14px]'>
                {`${survey?.user?.firstName} ${survey?.user?.lastName}`}
              </div>
            </label>
            <label className='flex flex-col gap-1 w-full'>
              <span className='text-gray-400 text-[14px]'>Date</span>
              <div className='p-3 w-full border rounded text-[14px]'>
                {survey?.createdAt
                  ? new Date(survey.createdAt).toLocaleDateString()
                  : 'N/A'}
              </div>
            </label>
          </div>

          {selectedManager ? (
            <div className='flex flex-row w-full sm:w-[70%] mt-6 gap-4 mb-10'>
              <label className='flex flex-col gap-1 w-full'>
                <span className='text-gray-400 text-[14px]'>Department</span>
                <div className='p-3 w-full border rounded text-[14px]'>
                  {selectedManager.department?.name || 'N/A'}
                </div>
              </label>
              <label className='flex flex-col gap-1 w-full'>
                <span className='text-gray-400 text-[14px]'>Manager</span>
                <div className='p-3 w-full border rounded text-[14px]'>
                  {`${selectedManager.firstName} ${selectedManager.lastName}`}
                </div>
              </label>
            </div>
          ) : (
            <div className='p-3 mt-6 border rounded text-[14px] text-red-500'>
              No matching manager found.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Evaluationsurvey;
