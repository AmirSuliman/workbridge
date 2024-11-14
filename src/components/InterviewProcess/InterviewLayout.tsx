import Button from '../Button';
import InviteSent from './InviteSent';
import OfferAndNegotiation from './OfferAndNegotiation';
import SendInvite from './SendInvite';
import Stepper from './Stepper';

const InterviewLayout = () => {
  const renderButtonName = () => {
    // const text = 'Send Interview Invite';
    // const text = 'Continue to Technical Interview';
    // const text = 'Continue to Second Round';
    // const text = 'Continue to Offer and Negotiation';
    const text = 'Continue to Offer Approval';

    return text;
  };
  return (
    <>
      <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4 space-y-2 my-4">
        <Stepper />
        <br />
        <hr />
        <br />
        {/* <SendInvite /> */}
        {/* <InviteSent /> */}
        <OfferAndNegotiation />
      </section>
      <Button name={renderButtonName()} className="w-full max-w-xl mx-auto" />
    </>
  );
};
export default InterviewLayout;
