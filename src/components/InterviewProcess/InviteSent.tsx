import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import Button from '../Button';

interface ErrorResponse {
  message: string;
}

const InviteSent = ({ jobApplication, heading, buttonText }) => {
  const jobData = jobApplication.data.items[0];
  const meetingDate = new Date(jobData?.meetingDate);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York',
  }).format(meetingDate); // Example: "4:33 AM" in EST

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await axiosInstance.post('review', {
        ...data,
        ratingScore: parseFloat(data.ratingScore),
        jobApplicationId: jobData.id,
      });
      setLoading(false);
      toast.success('Rating added successfuly!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // Check if it's an AxiosError
      if ((error as AxiosError<ErrorResponse>).response) {
        const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(
          axiosError.response?.data?.message || 'Failed to send review.'
        );
      } else {
        toast.error('Failed to send review.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {heading}
      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Send Interview Invite</span>
        <input
          type="text"
          name="invite"
          readOnly
          value={jobData.interviewUrl}
          className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
      </label>
      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Date</span>
        <input
          type="text"
          name="date"
          readOnly
          value={jobData?.meetingDate?.split('T')[0]}
          className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
      </label>
      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Time</span>
        <input
          type="text"
          name="time"
          readOnly
          value={formattedTime}
          className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
      </label>

      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Interview Rating</span>
        <select
          {...register('ratingScore', {
            required: 'Rating is required.',
            validate: (value) =>
              (value >= 1 && value <= 10) || 'Rating must be between 1 and 10.',
          })}
          className="opacity-50 outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        >
          <option value="">Select a rating</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Below Average</option>
          <option value="3">3 - Average</option>
          <option value="4">4 - Fair</option>
          <option value="5">5 - Good</option>
          <option value="6">6 - Satisfactory</option>
          <option value="7">7 - Very Good</option>
          <option value="8">8 - Great</option>
          <option value="9">9 - Excellent</option>
          <option value="10">10 - Outstanding</option>
        </select>
        {errors.ratingScore?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.ratingScore.message)}
          </p>
        )}
      </label>

      {/* this div is for UI purposes */}
      <div className="hidden lg:block"></div>
      <div className="hidden lg:block"></div>

      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Notes</span>
        <textarea
          rows={5}
          placeholder="Add notes for interview"
          className="opacity-50 outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full resize-none"
          {...register('notes')}
        ></textarea>
        {errors.notes?.message && (
          <p className="text-red-500 text-sm">{String(errors.notes.message)}</p>
        )}
      </label>
      {/* this div is for UI purposes */}
      <div className="hidden lg:block"></div>
      <div className="hidden lg:block"></div>
      <Button
        name={loading ? '' : buttonText}
        icon={
          loading && (
            <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
          )
        }
        className="w-full max-w-xl mx-auto col-span-full mt-12 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        // disabled={isFuture}
      />
    </form>
  );
};
export default InviteSent;
