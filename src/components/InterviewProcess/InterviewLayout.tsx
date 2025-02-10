'use client';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import { PiListChecksLight } from 'react-icons/pi';
import InviteSent from './InviteSent';
import SendInvite from './SendInvite';
import Stepper from './Stepper';
import OfferAndNegotiation from './OfferAndNegotiation';
import OfferApproval from './OfferApproval';
import Onboarding from './Onboarding';
import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
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
  const initialStage = jobData?.stage || 'Applied';
  const jobApplicationId = jobData?.id;
  const searchParams = useSearchParams();
  const candidateId = searchParams.get('candidate');
  const meetingDate = new Date(jobData?.meetingDate);
  const currentDate = new Date();
  const isToday = meetingDate.toDateString() === currentDate.toDateString();
  const isFuture = meetingDate > currentDate;

  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState(initialStage);

  useEffect(() => {
    const fetchJobApplicationData = async () => {
      if (!jobApplicationId) return;

      try {
        const response = await axiosInstance.get(
          `/jobApplication/${jobApplicationId}`,
          {
            params: { associations: true },
          }
        );
        setApiData(response.data);
      } catch (err) {
        console.error('Error fetching job application data:', err);
        setError('Failed to fetch job application data.');
      }
    };

    fetchJobApplicationData();
  }, [jobApplicationId]);

  const offer = apiData?.data?.offer;
  const token = offer?.token;
  const offerId = offer?.id;

  useEffect(() => {
    if (jobData?.stage) {
      setCurrentStage(jobData.stage);
    }
  }, [jobData]);

  return (
    <>
      <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4 space-y-2 my-4">
        <Stepper
          jobApplication={jobApplication}
          currentStage={currentStage}
          onTabChange={setCurrentStage}
        />
        <br />
        <hr />
        <br />

        {currentStage === 'Applied' && (
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

        {currentStage === 'First' && (
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

        {currentStage === 'Technical' && !(isToday || isFuture) && (
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

        {currentStage === 'Technical' && (isFuture || isToday) && (
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

        {currentStage === 'Second' && !(isToday || isFuture) && (
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

        {currentStage === 'Second' && (isFuture || isToday) && (
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

        {['Negotiation'].includes(currentStage) && (
          <OfferAndNegotiation jobApplication={jobApplication} />
        )}

        {['Rejected', 'Offer'].includes(currentStage) && (
          <OfferApproval
            jobApplication={jobApplication}
            offerId={offerId}
            token={token}
          />
        )}
        {['Onboarding'].includes(currentStage) && (
          <Onboarding jobId={jobApplicationId} candidateId={candidateId} />
        )}
      </section>
    </>
  );
};

export default InterviewLayout;
