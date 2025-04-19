import axiosInstance from '@/lib/axios';
import { useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface QuestionProp {
  id: number;
  question: string;
  responses: {
    id: number;
    surveyEmployeeId: number;
    employeeId: number;
    response?: string;
    rating?: number;
  }[];
}

const Questions = () => {
  const [questions, setQuestions] = useState<QuestionProp[]>([]);
  const searchParams = useSearchParams();
  const params = useParams(); // Get route parameters
  const survey = searchParams.get('survey');
  const employee = searchParams.get('employee');
  const departmentHeadId = searchParams.get('departmentHeadId');

  useEffect(() => {
    const getQuestions = async () => {
      if (!survey || !departmentHeadId) {
        console.warn('Missing Survey ID, Employee ID, or Department ID');
        return;
      }

      try {
        const response = await axiosInstance.get(
          `/survey/${survey}/responses/${departmentHeadId}`
        );
        setQuestions(response.data.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    getQuestions();
  }, [survey, employee, departmentHeadId]);

  return (
    <div className='p-6 bg-white border rounded-[10px] mt-8'>
      <h1 className='font-medium text-[18px]'>Questions</h1>
      {questions.length > 0 ? (
        questions.map((question) => (
          <div
            key={question.id}
            className='flex flex-col items-start gap-6 w-full mt-8'
          >
            <div className='flex flex-col gap-1 w-full'>
              <span className='text-gray-400 text-[14px]'>Question</span>
              <div className='p-3 w-full border rounded text-[12px]'>
                {question.question}
              </div>
            </div>
            <div className='flex flex-col gap-1 w-full'>
              <span className='text-gray-400 text-[14px]'>Answer</span>
              <div className='p-3 w-full border rounded text-[12px]'>
                {question.responses?.[0]?.response
                  ? question.responses[0].response
                  : question.responses?.[0]?.rating !== undefined
                    ? `${question.responses[0].rating}/5`
                    : 'No response available'}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No questions available </div>
      )}
    </div>
  );
};

export default Questions;
