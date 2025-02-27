import Button from '@/components/Button';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { useSearchParams } from 'next/navigation';

const DepartmentResponse = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { data: session } = useSession();
  const [departmentId, setDepartmentId] = useState(null);
  const [departmentHeadId, setDepartmentHeadId] = useState(null);
  const [responses, setResponses] = useState({}); 

  const searchParams = useSearchParams();
  const surveyId = searchParams.get('survey');

  useEffect(() => {
    if (!surveyId) return;

    const getQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/survey/${surveyId}`, {
          params: { associations: true },
        });

        const departmentData = response.data.data.departments[0];
        setDepartmentId(departmentData.id);
        setDepartmentHeadId(departmentData.department_head_data.id);
        setQuestions(response.data.data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
  }, [surveyId]);

  // Handle response change in state
  const handleResponseChange = (index, type, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [index]: {
        ...prevResponses[index],
        [type]: value,
      },
    }));
  };

  const onSubmit = async () => {
    const payload = {
      surveyId,
      departmentId,
      departmentHeadId,
      responses: questions.map((question, index) => ({
        questionId: question.id,
        responseText: responses[index]?.responseText || '',
        rating: responses[index]?.rating || null,
      })),
    };
  
    try {
      await axiosInstance.post(`/survey/response/department`, payload, {
        headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
      });
      toast.success('Evaluation successful!');
  
      // Reset the form state
      setResponses({});
      setCurrentQuestionIndex(0);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Some error occurred');
      } else {
        toast.error('Some error occurred');
      }
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="mt-2 w-full">
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className="text-[18px] font-medium">Yearly Evaluation Form</h1>
        <h2 className="text-[18px] font-medium">
          Question {currentQuestionIndex + 1} out of {questions.length}
        </h2>
      </div>

      {currentQuestion && (
        <label className="mt-4 flex flex-col">
          <span className="text-[16px] text-gray-400 mb-1">Question</span>
          <div className="border p-3 rounded text-[18px]">
            {currentQuestion.question}
          </div>
        </label>
      )}

      <label className="mt-4 flex flex-col w-full">
        <span className="text-[16px] text-gray-400 mb-1">Answers</span>
        {currentQuestion && (
          <div className="mt-2">
            {currentQuestion.responseType === 'Text' && (
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={responses[currentQuestionIndex]?.responseText || ''}
                onChange={(e) =>
                  handleResponseChange(currentQuestionIndex, 'responseText', e.target.value)
                }
              />
            )}
            {currentQuestion.responseType === 'Rating' && (
              <select
                className="border p-2 rounded w-full"
                value={responses[currentQuestionIndex]?.rating || ''}
                onChange={(e) =>
                  handleResponseChange(currentQuestionIndex, 'rating', e.target.value)
                }
              >
                 <option value="">Select a rating</option>
                {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </label>

      <div className="flex flex-row items-center justify-end mt-32 gap-4">
        <button
          type="button"
          className="text-[14px] p-2 border rounded px-4 bg-white"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          type="button"
          className="text-[14px] p-2 border rounded px-4 bg-white"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
        {currentQuestionIndex + 1 === questions.length && (
          <Button
            disabled={false}
            onClick={onSubmit}
            name={'Submit'}
            icon={false && <BiLoaderCircle className="h-5 w-5 animate-spin" />}
          />
        )}
      </div>
    </div>
  );
};

export default DepartmentResponse;
