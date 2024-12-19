'use client';

import { API_ROUTES } from '@/constants/apiRoutes';
import axiosInstance from '@/lib/axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiListChecksLight } from 'react-icons/pi';
import Button from '../Button';
import GenerateOffer from './GenerateOffer';

const OfferAndNegotiation = ({ jobApplication }) => {
  console.log(jobApplication);
  const stage = jobApplication?.data?.items?.[0]?.stage || 'Applied';
  const jobApplicationId = jobApplication?.data?.items?.[0]?.id;
  const [showOffer, setShowOffer] = useState(false);
  const handlePopup = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowOffer(!showOffer);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axiosInstance.post(API_ROUTES.POST_OFFER, {
        ...data,
        jobApplicationId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
        <PiListChecksLight size={24} />
        Offer and Negotiation
      </h2>
      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Start Date</span>
        <input
          type="date"
          {...register('startDate', { required: 'Start date is required' })}
          className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
        {errors.startDate?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.startDate.message)}
          </p>
        )}
      </label>
      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Compensation</span>
        <input
          type="text"
          {...register('compensation', {
            required: 'compensation is required',
          })}
          placeholder="$98,000"
          className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
        {errors.compensation?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.compensation.message)}
          </p>
        )}
      </label>
      <div className="w-fit h-fit mt-auto mb-0" onClick={handlePopup}>
        <Button
          type="submit"
          disabled={stage === 'Offer'}
          name={`${stage === 'Offer' ? 'Offer Sent!' : 'Generate Offer'}`}
          className={`${
            stage === 'Offer' ? 'bg-transparent !text-black' : 'Generate Offer'
          }`}
        />
      </div>
      {showOffer && (
        <GenerateOffer
          setShowOffer={setShowOffer}
          jobApplication={jobApplication}
        />
      )}

      <Button
        type="button"
        disabled={stage === 'Negotiation'}
        name={`Continue to Offer Approval`}
        className={`w-full max-w-xl mx-auto col-span-full mt-12 ${
          stage === 'Negotiation' && 'opacity-50'
        }`}
      />
    </form>
  );
};
export default OfferAndNegotiation;
