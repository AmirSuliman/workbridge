import { PiListChecksLight } from 'react-icons/pi';
import InviteSent from './InviteSent';
import SendInvite from './SendInvite';
import Stepper from './Stepper';
import OfferAndNegotiation from './OfferAndNegotiation';

const InterviewLayout = ({ jobApplication }) => {
  const jobData = jobApplication?.data?.items[0] || {};
  const stage = jobData?.stage || 'Applied';

  const meetingDate = new Date(jobData?.meetingDate);
  const currentDate = new Date();
  const isToday = meetingDate.toDateString() === currentDate.toDateString();
  const isFuture = meetingDate > currentDate;

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
        {/* {stage === 'Negotiation' && (isFuture || isToday) && (
          <InviteSent
            jobApplication={jobApplication}
            heading={
              <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
                <PiListChecksLight size={24} />
                Offer and Negotiation
              </h2>
            }
            buttonText="Continue to Offer and Negotiation"
          />
        )} */}
        {/* <TechnicalInterviewInviteSent/> */}
        {/* <SecondRoundSendInvite /> */}
        {/* <SecondRoundInviteSent /> */}
        {/* <OfferApproval /> */}
        {/* <Onboarding /> */}
      </section>
    </>
  );
};
export default InterviewLayout;
