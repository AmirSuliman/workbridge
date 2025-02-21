import React, { useEffect } from 'react';
import {
  resetInterviewState,
  scheduleInterview,
} from '@/store/slices/interviewInviteSlice';
import { AppDispatch, RootState } from '@/store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';

interface JobApplication {
  jobApplication: {
    data: {
      items: { id: number }[];
    };
  };
  heading: React.ReactNode;
}

const SendInvite: React.FC<JobApplication> = ({ jobApplication, heading }) => {
  const jobApplicationId = jobApplication?.data?.items[0]?.id;
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.interview
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    const combinedDateTime = `${data.date}T${data.time}`;
    const payload = {
      ...data,
      date: combinedDateTime,
    };

    dispatch(scheduleInterview({ id: jobApplicationId, data: payload }));
  };

  useEffect(() => {
    if (success) {
      toast.success('Invite sent successfully!');
      dispatch(resetInterviewState());
      reset();

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    if (error) {
      toast.error(
        typeof error === 'string' ? error : error.message || 'Unknown error'
      );
      console.error(typeof error === 'string' ? error : error.message);
      reset();
    }
  }, [success, error, dispatch, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {heading}
      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Send Interview Invite</span>
        <select
          className="outline-none opacity-50 rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
          {...register('type', { required: 'Invite type is required' })}
        >
          <option value="">Select invite type</option>
          <option value="teams">MS Teams</option>
          <option value="zoom">Zoom</option>
        </select>
        {errors.type?.message && (
          <p className="text-red-500 text-sm">{String(errors.type.message)}</p>
        )}
      </label>

      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Date</span>
        <input
          type="date"
          {...register('date', {
            required: 'Date is required',
            validate: (value) => {
              const selectedDate = new Date(value);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return selectedDate >= today || 'Date cannot be in the past.';
            },
          })}
          className="outline-none opacity-50 rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
        {errors.date?.message && (
          <p className="text-red-500 text-sm">{String(errors.date.message)}</p>
        )}
      </label>

      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Time</span>
        <input
          type="time"
          {...register('time', {
            required: 'Time is required',
          })}
          className="outline-none opacity-50 rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
        {errors.time?.message && (
          <p className="text-red-500 text-sm">{String(errors.time.message)}</p>
        )}
      </label>
      <Button
        name={loading ? '' : 'Send Interview Invite'}
        icon={
          loading && (
            <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
          )
        }
        className="w-full max-w-xl mx-auto col-span-full mt-12"
        type="submit"
      />
    </form>
  );
};

export default SendInvite;
