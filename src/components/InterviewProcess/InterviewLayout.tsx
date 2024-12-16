import { PiListChecksLight } from 'react-icons/pi';
import InviteSent from './InviteSent';
import SendInvite from './SendInvite';
import Stepper from './Stepper';

const InterviewLayout = ({ jobApplication }) => {
  const stage = jobApplication?.data?.items?.[0]?.stage || 'Applied';
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
        {stage === 'First' && <InviteSent jobApplication={jobApplication} />}
        {stage === 'Technical' && (
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
        {/* {stage === 'Technical' && (
          <InviteSent jobApplication={jobApplication} />
        )} */}
        {/* <TechnicalInterviewInviteSent/> */}
        {/* <SecondRoundSendInvite /> */}
        {/* <SecondRoundInviteSent /> */}
        {/* <OfferAndNegotiation /> */}
        {/* <OfferApproval /> */}
        {/* <Onboarding /> */}
      </section>
      {/* <Button name={renderButtonName()} className="w-full max-w-xl mx-auto" /> */}
    </>
  );
};
export default InterviewLayout;
