import {
  PiListChecksFill,
  PiListChecksLight,
  PiListNumbersFill,
} from 'react-icons/pi';
import IconWithBg from '../SingleAnnouncement/IconWithBg';
import StepLine from './StepLine';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { FaRegHandshake } from 'react-icons/fa';

const Stepper = ({ jobApplication }) => {
  const stage = jobApplication?.data?.items?.[0]?.stage || 'Applied';

  return (
    <>
      <div className="flex items-center">
        <IconWithBg
          className="size-[40px] bg-black text-white"
          icon={<PiListChecksLight size={24} />}
        />
        <StepLine
          className={`${
            stage === 'Technical' ||
            stage === 'Second' ||
            stage === 'Negotiation' ||
            stage === 'Offer' ||
            stage === 'Onboarding'
              ? 'bg-black border-black'
              : 'bg-background'
          }`}
        />
        <IconWithBg
          className={`size-[40px] ${
            stage === 'Technical' ||
            stage === 'Second' ||
            stage === 'Negotiation' ||
            stage === 'Offer' ||
            stage === 'Onboarding'
              ? 'bg-black text-white'
              : 'bg-background text-balance'
          }`}
          icon={<PiListNumbersFill size={24} />}
        />
        <StepLine
          className={`${
            stage === 'Second' ||
            stage === 'Negotiation' ||
            stage === 'Offer' ||
            stage === 'Onboarding'
              ? 'bg-black border-black'
              : 'bg-background'
          }`}
        />
        <IconWithBg
          className={`size-[40px] ${
            stage === 'Second' ||
            stage === 'Negotiation' ||
            stage === 'Offer' ||
            stage === 'Onboarding'
              ? 'bg-black text-white'
              : 'bg-background text-balance'
          }`}
          icon={<PiListChecksFill size={24} />}
        />
        <StepLine
          className={`${
            stage === 'Negotiation' ||
            stage === 'Offer' ||
            stage === 'Onboarding'
              ? 'bg-black border-black'
              : 'bg-background'
          }`}
        />
        <IconWithBg
          className={`size-[40px] ${
            stage === 'Negotiation' ||
            stage === 'Offer' ||
            stage === 'Onboarding'
              ? 'bg-black text-white'
              : 'bg-background text-balance'
          }`}
          icon={<IoDocumentTextOutline size={24} />}
        />
        <StepLine
          className={`${
            stage === 'Onboarding' ? 'bg-black border-black' : 'bg-background'
          }`}
        />
        <IconWithBg
          className={`size-[40px] ${
            stage === 'Onboarding'
              ? 'bg-black text-white'
              : 'bg-background text-balance'
          }`}
          icon={<IoDocumentTextOutline size={24} />}
        />
        <StepLine />
        <IconWithBg
          className="size-[40px]"
          icon={<FaRegHandshake size={24} />}
        />
      </div>
      <div className="flex items-center justify-between [&_p]:text-center [&_p]:text-base [&_p]:opacity-50">
        <p className={`font-semibold !opacity-100`}>First Round</p>
        <p
          className={`hover:font-semibold hover:opacity-100 ${
            stage === 'Technical' ||
            stage === 'Second' ||
            stage === 'Negotiation' ||
            stage === 'Offer' ||
            stage === 'Onboarding'
              ? 'font-semibold !opacity-100'
              : ''
          }`}
        >
          Technical Interview
        </p>
        <p
          className={`hover:font-semibold hover:opacity-100 ${
            stage === 'Second' ||
            stage === 'Negotiation' ||
            stage === 'Offer' ||
            stage === 'Onboarding'
              ? 'font-semibold !opacity-100'
              : ''
          }`}
        >
          Second Round
        </p>
        <p
          className={`hover:font-semibold hover:opacity-100 ${
            stage === 'Second' ||
            stage === 'Negotiation' ||
            stage === 'Offer' ||
            stage === 'Onboarding'
              ? 'font-semibold !opacity-100'
              : ''
          }`}
        >
          Offer and Negotiation
        </p>
        <p
          className={`hover:font-semibold hover:opacity-100 ${
            stage === 'Onboarding' ? 'font-semibold !opacity-100' : ''
          }`}
        >
          Offer Approval
        </p>
        <p
          className={`hover:font-semibold hover:opacity-100 ${
            stage === '' ? '' : ''
          }`}
        >
          Onboarding
        </p>
      </div>
    </>
  );
};
export default Stepper;
