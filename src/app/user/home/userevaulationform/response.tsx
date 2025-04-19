import axiosInstance from '@/lib/axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Response = () => {
  const [questions, setQuestions] = useState<any[]>([]);

  const searchParams = useSearchParams();
  const surveyId = searchParams.get('survey');
  const employeeId = searchParams.get('employee');

  useEffect(() => {
    if (!surveyId || !employeeId) return;

    const fetchSurveyResponses = async () => {
      try {
        const response = await axiosInstance.get(
          `/survey/${surveyId}/responses/${employeeId}`
        );
        setQuestions(response.data.data.questions);
      } catch (error) {}
    };

    fetchSurveyResponses();
  }, [surveyId, employeeId]);

  return (
    <div className='mt-2 w-full'>
      <h1 className='text-[18px] font-medium mb-4'>Yearly Evaluation Form</h1>
      {questions.map((question, index) => (
        <div key={question.id} className='mb-6'>
          <label className='flex flex-col'>
            <span className='text-[16px] text-gray-400 mb-1'>
              Question {index + 1}
            </span>
            <div className='border p-3 rounded text-[18px]'>
              {question.question}
            </div>
          </label>
          <label className='mt-2 flex flex-col'>
            <span className='text-[16px] text-gray-400 mb-1'>Answer</span>
            <div className='border p-3 rounded text-[18px]'>
              {question.responses.length > 0
                ? question.responses[0].response || ''
                : 'No response given'}
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Response;
