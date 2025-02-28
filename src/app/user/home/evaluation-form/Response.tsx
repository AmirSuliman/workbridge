import Button from '@/components/Button';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';

const Response = ({ surveyId, employeeId, managerId, onSurveyUpdate }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responses, setResponses] = useState({});
  const { data: session } = useSession();
  const [validationSchema, setValidationSchema] = useState(yup.object().shape({}));

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/survey/${surveyId}`, {
          params: { associations: true },
        });
        setQuestions(response.data.data.questions);

        // Dynamically create validation schema
        const schema: Record<string, yup.AnySchema> = response.data.data.questions.reduce((acc, question) => {
          if (question.responseType === 'Text') {
            acc[`responseText_${question.id}`] = yup.string().trim().required('This field is required');
          } else if (question.responseType === 'Rating') {
            acc[`rating_${question.id}`] = yup.number().nullable().required('Please select a rating');
          }
          return acc;
        }, {});
        

        setValidationSchema(yup.object().shape(schema));
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
  }, [surveyId]);

  type FormValues = {
    [key: string]: string | number | null;
  };
  
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
    trigger,  // <-- Add this here
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });
  

  // Handle input changes and update responses state
  const handleInputChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const onSubmit = async () => {
    const payload = {
      surveyId,
      managerId,
      employeeId,
      responses: questions.map((question) => ({
        questionId: question.id,
        responseText: responses[`responseText_${question.id}`] || '',
        rating: responses[`rating_${question.id}`] || null,
      })),
    };
  
    try {
      await axiosInstance.post(`/survey/response`, payload, {
        headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
      });
      toast.success('Evaluation successful!');
      setIsSubmitted(true);
      onSurveyUpdate('Completed');
  
      // Reset form and clear responses state
      reset();
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
                    <Controller
                      name={`responseText_${questions[currentQuestionIndex].id}`}
                      control={control}
                      defaultValue={responses[`responseText_${questions[currentQuestionIndex].id}`] || ""}
                      render={({ field }) => (
                        <>
                          <input
                            type="text"
                            className="border p-2 rounded w-full"
                            {...field}
                            value={responses[`responseText_${questions[currentQuestionIndex].id}`] || ""}
                            onChange={(e) => {
                              field.onChange(e);
                              handleInputChange(`responseText_${questions[currentQuestionIndex].id}`, e.target.value);
                            }}
                          />
                          {errors[`responseText_${questions[currentQuestionIndex].id}`] && (
                            <p className="text-red-500 text-sm">
                              {errors[`responseText_${questions[currentQuestionIndex].id}`]?.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  )}

{questions[currentQuestionIndex].responseType === 'Rating' && (
  <Controller
    name={`rating_${questions[currentQuestionIndex].id}`}
    control={control}
    defaultValue={responses[`rating_${questions[currentQuestionIndex].id}`] || null}
    render={({ field }) => (
      <>
        <select
          className="border p-2 rounded w-full"
          {...field}
          value={field.value ?? ""}
          onChange={(e) => {
            const value = e.target.value ? parseFloat(e.target.value) : null;
            field.onChange(value);
            handleInputChange(`rating_${questions[currentQuestionIndex].id}`, value);
          }}
        >
          <option value="">Select a rating</option>
          {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors[`rating_${questions[currentQuestionIndex].id}`] && (
          <p className="text-red-500 text-sm">
            {errors[`rating_${questions[currentQuestionIndex].id}`]?.message || 'Please select a rating'}
          </p>
        )}
      </>
    )}
  />
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
  onClick={async () => {
    const question = questions[currentQuestionIndex];
    const responseKey = question.responseType === 'Text' 
      ? `responseText_${question.id}` 
      : `rating_${question.id}`;

    const isValid = await trigger(responseKey); 

    if (isValid) {
      setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1));
    }
  }}
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
