import SendInvite from '@/components/InterviewProcess/SendInvite/SendInvite';
import Stepper from '@/components/InterviewProcess/Stepper';

const page = () => {
  return (
    <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4 space-y-2">
      <Stepper />
      <SendInvite />
    </section>
  );
};
export default page;
