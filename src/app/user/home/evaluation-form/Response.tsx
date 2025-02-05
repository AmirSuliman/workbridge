import Button from '@/components/Button';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';

const Response = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const surveyId = searchParams.get('survey');
  const employeeId = searchParams.get('employee');

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/survey/${surveyId}`, {
          params: { associations: true },
        });
        console.log('questions response: ', response.data.data.questions);
        setQuestions(response.data.data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
    if (session?.user?.accessToken) {
      getQuestions(); // Fetch questions only if accessToken is available
    }
  }, [surveyId, session]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      surveyId: surveyId,
      managerId: employeeId,
      responses: questions.map((question, index) => ({
        questionId: question.id,
        responseText: data[`responseText_${index}`],
        rating: data[`rating_${index}`],
      })),
    };

    try {
      const response = await axiosInstance.post(`/survey/response`, payload, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      console.log('post response: ', response.data);
      toast.success('Evaluation successfull!');
    } catch (error) {
      console.log(error);
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
    <div className="mt-4 w-full">
      <div className="bg-white p-6 mt-5 rounded-[10px] border w-full">
        <div className="w-full flex flex-row items-center justify-between">
          <h1 className="text-[18px] font-medium">Yearly Evaluation Form</h1>
          <h2 className="text-[18px] font-medium">
            Question {currentQuestionIndex + 1} out of {questions.length}
          </h2>
        </div>

        {currentQuestion && (
          <label className="mt-4 flex flex-col ">
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
                  {...register(`responseText_${currentQuestionIndex}`)}
                />
              )}
              {currentQuestion.responseType === 'Rating' && (
                <select
                  className="border p-2 rounded w-full"
                  {...register(`rating_${currentQuestionIndex}`)}
                >
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
          {/* <button
            disabled={isSubmitting}
            type="button"
            className="text-[14px] p-2 border rounded px-4 bg-black text-white"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button> */}
          {currentQuestionIndex + 1 === questions.length && (
            <Button
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              name={isSubmitting ? '' : 'Submit'}
              icon={
                isSubmitting && (
                  <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
                )
              }
              // className="ml-auto mr-0 text-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Response;
