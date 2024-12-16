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
  // stage === 'Technical
  return (
    <>
      <div className="flex items-center">
        <IconWithBg
          className="size-[40px] bg-black text-white"
          icon={<PiListChecksLight size={24} />}
        />
        <StepLine
          className={`${
            stage === 'Technical' ? 'bg-black border-black' : 'bg-background'
          }`}
          // className={'bg-background'}
        />
        <IconWithBg
          className={`size-[40px] ${
            stage === 'Technical'
              ? 'bg-black text-white'
              : 'bg-background text-balance'
          }`}
          icon={<PiListNumbersFill size={24} />}
        />
        <StepLine />
        <IconWithBg
          className="size-[40px]"
          icon={<PiListChecksFill size={24} />}
        />
        <StepLine />
        <IconWithBg
          className="size-[40px]"
          icon={<IoDocumentTextOutline size={24} />}
        />
        <StepLine />
        <IconWithBg
          className="size-[40px]"
          icon={<IoDocumentTextOutline size={24} />}
        />
        <StepLine />
        <IconWithBg
          className="size-[40px]"
          icon={<FaRegHandshake size={24} />}
        />
      </div>
      <div className="flex items-center justify-between [&_p]:text-base [&_p]:opacity-50">
        <p
          className={`hover:font-semibold hover:opacity-100 ${
            stage === 'First' || stage === 'Technical'
              ? 'font-semibold !opacity-100'
              : ''
          }`}
        >
          First Round
        </p>
        <p
          className={`hover:font-semibold hover:opacity-100 ${
            stage === 'Technical' ? 'font-semibold !opacity-100' : ''
          }`}
        >
          Technical Interview
        </p>
        <p
          className={`hover:font-semibold hover:opacity-100 ${
            stage === '' ? '' : ''
          }`}
        >
          Second Round
        </p>
        <p
          className={`hover:font-semibold hover:opacity-100 ${
            stage === '' ? '' : ''
          }`}
        >
          Offer and Negotiation
        </p>
        <p
          className={`hover:font-semibold hover:opacity-100 ${
            stage === '' ? '' : ''
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
