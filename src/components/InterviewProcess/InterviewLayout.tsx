'use client'
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import { PiListChecksLight } from 'react-icons/pi';
import InviteSent from './InviteSent';
import SendInvite from './SendInvite';
import Stepper from './Stepper';
import OfferAndNegotiation from './OfferAndNegotiation';
import OfferApproval from './OfferApproval';

interface ApiResponse {
  data: {
    offer?: {
      id: number;
      token: string;
    };
  };
}
const InterviewLayout = ({ jobApplication }) => {
  const jobData = jobApplication?.data?.items[0] || {};
  const stage = jobData?.stage || 'Applied';
  const jobApplicationId = jobApplication?.data?.items?.[0]?.id;
  console.log(jobApplicationId, 'id');
  const meetingDate = new Date(jobData?.meetingDate);
  const currentDate = new Date();
  const isToday = meetingDate.toDateString() === currentDate.toDateString();
  const isFuture = meetingDate > currentDate;
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchJobApplicationData = async () => {
    if (!jobApplicationId) return;

    try {
      const response = await axiosInstance.get(`/jobApplication/${jobApplicationId}`, {
        params: {
          associations: true,
        },
      });
      setApiData(response.data);
      console.log('API Response:', response.data);
    } catch (err) {
      console.error('Error fetching job application data:', err);
      setError('Failed to fetch job application data.');
    }
  };

  fetchJobApplicationData();
}, [jobApplicationId]);

  const offer = apiData?.data?.offer;
  console.log('Offer:', offer);

  const token = offer?.token;
  const offerId = offer?.id;
  console.log(token, 'token to be used');
  console.log(offerId, 'offerId to be used');

  
  return (
    <>
      <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4 space-y-2 my-4">
        <Stepper jobApplication={jobApplication} />
        <br />
        <hr />
        <br />
        {stage === 'Applied' && (
          <SendInvite
            heading={
              <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
                <PiListChecksLight size={24} />
                First Round
              </h2>
            }
            jobApplication={jobApplication}
          />
        )}
        {stage === 'First' && (
          <InviteSent
            jobApplication={jobApplication}
            heading={
              <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
                <PiListChecksLight size={24} />
                First Round
              </h2>
            }
            buttonText="Continue to Technical Interview"
          />
        )}
        {stage === 'Technical' && !(isToday || isFuture) && (
          <SendInvite
            heading={
              <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
                <PiListChecksLight size={24} />
                Technical Interview
              </h2>
            }
            jobApplication={jobApplication}
          />
        )}
        {stage === 'Technical' && (isFuture || isToday) && (
          <InviteSent
            jobApplication={jobApplication}
            heading={
              <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
                <PiListChecksLight size={24} />
                Technical Interview
              </h2>
            }
            buttonText="Continue to Second Round"
          />
        )}
        {stage === 'Second' && !(isToday || isFuture) && (
          <SendInvite
            heading={
              <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
                <PiListChecksLight size={24} />
                Second Round
              </h2>
            }
            jobApplication={jobApplication}
          />
        )}
        {stage === 'Second' && (isFuture || isToday) && (
          <InviteSent
            jobApplication={jobApplication}
            heading={
              <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
                <PiListChecksLight size={24} />
                Second Round
              </h2>
            }
            buttonText="Continue to Offer and Negotiation"
          />
        )}
        {stage === 'Negotiation' ||
          (stage === 'Offer' && (
            <OfferAndNegotiation jobApplication={jobApplication} />
          ))}

        {/* <TechnicalInterviewInviteSent/> */}
        {/* <SecondRoundSendInvite /> */}
        {/* <SecondRoundInviteSent /> */}
        {/* <OfferApproval /> */}
        {(stage === 'Onboarding' || stage === 'Rejected' || stage === 'Offer') && (
  <OfferApproval
    jobApplication={jobApplication}
    offerId={offerId}
    token={token}
  />
)}

        {/* <Onboarding /> */}
      </section>
    </>
  );
};
export default InterviewLayout;
