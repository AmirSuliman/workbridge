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
  // const stage = jobApplication.jobApplication.data.items[0].stage;
  // const stage = '';
  return (
    <>
      <div className="flex items-center">
        <IconWithBg
          className="size-18 bg-black text-white"
          icon={<PiListChecksLight size={24} />}
        />
        <StepLine
          // className={`${stage === 'Second' ? 'bg-black' : 'bg-background'}`}
          className={'bg-background'}
        />
        <IconWithBg
          className="size-14"
          icon={<PiListNumbersFill size={24} />}
        />
        <StepLine />
        <IconWithBg className="size-14" icon={<PiListChecksFill size={24} />} />
        <StepLine />
        <IconWithBg
          className="size-14"
          icon={<IoDocumentTextOutline size={24} />}
        />
        <StepLine />
        <IconWithBg
          className="size-14"
          icon={<IoDocumentTextOutline size={24} />}
        />
        <StepLine />
        <IconWithBg className="size-14" icon={<FaRegHandshake size={24} />} />
      </div>
      <div className="flex items-center justify-between [&_p]:text-base [&_p]:opacity-50">
        <p className="hover:font-semibold hover:opacity-100">First Round</p>
        <p className="hover:font-semibold hover:opacity-100">
          Technical Interview
        </p>
        <p className="hover:font-semibold hover:opacity-100">Second Round</p>
        <p className="hover:font-semibold hover:opacity-100">
          Offer and Negotiation
        </p>
        <p className="hover:font-semibold hover:opacity-100">Offer Approval</p>
        <p className="hover:font-semibold hover:opacity-100">Onboarding</p>
      </div>
    </>
  );
};
export default Stepper;
