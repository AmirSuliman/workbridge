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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      surveyId,
      managerId: managerId,
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
      onSurveyUpdate('Completed'); // Update employee's survey status
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
      <h1 className="text-[18px] font-medium">Yearly Evaluation Form</h1>
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
            {questions[currentQuestionIndex].responseType === 'Text' && (
              <input
                type="text"
                className="border p-2 rounded w-full"
                {...register(`responseText_${currentQuestionIndex}`)}
              />
            )}
            {questions[currentQuestionIndex].responseType === 'Rating' && (
              <select className="border p-2 rounded w-full" {...register(`rating_${currentQuestionIndex}`)}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            )}
          </label>
          
          <Button
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            name={isSubmitting ? '' : 'Submit'}
            icon={isSubmitting && <BiLoaderCircle className="h-5 w-5 animate-spin" />}
          />
        </>
      )}
    </div>
  );
};

export default Response;
