import Button from '@/components/Button';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';

const Response = ({ surveyId, employeeId, managerId, onSurveyUpdate }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/survey/${surveyId}`, {
          params: { associations: true },
        });
        setQuestions(response.data.data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
  }, [surveyId]);

  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      surveyId,
      managerId,
      employeeId,
      responses: questions.map((question, index) => ({
        questionId: question.id,
        responseText: data[`responseText_${index}`],
        rating: data[`rating_${index}`],
      })),
    };

    try {
      await axiosInstance.post(`/survey/response`, payload, {
        headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
      });
      toast.success('Evaluation successful!');
      setIsSubmitted(true);
      onSurveyUpdate('Completed'); 
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Some error occurred');
      } else {
        toast.error('Some error occurred');
      }
    }
  };

  return (
    <div className="mt-2 w-full">
      {isSubmitted ? (
        <div className="text-center p-6 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Survey Submitted Successfully</h2>
          <p className="text-gray-500">Thank you for completing the survey!</p>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-row items-center justify-between">
            <h1 className="text-[18px] font-medium">Yearly Evaluation Form</h1>
            <h2 className="text-[18px] font-medium">
              Question {currentQuestionIndex + 1} out of {questions.length}
            </h2>
          </div>

          {questions.length > 0 && (
            <>
              <label className="mt-4 flex flex-col">
                <span className="text-[16px] text-gray-400 mb-1">Question</span>
                <div className="border p-3 rounded text-[18px]">
                  {questions[currentQuestionIndex].question}
                </div>
              </label>

              <label className="mt-4 flex flex-col w-full">
                <span className="text-[16px] text-gray-400 mb-1">Answers</span>
                <div className="mt-2">
                  {questions[currentQuestionIndex].responseType === 'Text' && (
                    <input
                      type="text"
                      className="border p-2 rounded w-full"
                      {...register(`responseText_${currentQuestionIndex}`)}
                    />
                  )}
                  {questions[currentQuestionIndex].responseType === 'Rating' && (
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
              </label>
            </>
          )}

          <div className="flex flex-row items-center justify-end mt-32 gap-4">
            <button
              type="button"
              className="text-[14px] p-2 border rounded px-4 bg-white"
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              type="button"
              className="text-[14px] p-2 border rounded px-4 bg-white"
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
            {currentQuestionIndex + 1 === questions.length && (
              <Button
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                name={isSubmitting ? '' : 'Submit'}
                icon={isSubmitting && <BiLoaderCircle className="h-5 w-5 animate-spin" />}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};


export default Response;
