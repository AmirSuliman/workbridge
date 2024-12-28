import {
  PiListChecksFill,
  PiListChecksLight,
  PiListNumbersFill,
} from 'react-icons/pi';
import IconWithBg from '../SingleAnnouncement/IconWithBg';
import StepLine from './StepLine';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { FaRegHandshake } from 'react-icons/fa';

const Stepper = ({ jobApplication, currentStage, onTabChange }) => {
  const handleNavigation = (targetStage) => {
    if (onTabChange) {
      onTabChange(targetStage);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <IconWithBg
          className={`size-[40px] ${currentStage === 'Applied' ? 'bg-black text-white' : ''}`}
          icon={<PiListChecksLight size={24} />}
          onClick={() => handleNavigation('Applied')}
        />
        <StepLine className={`${['Technical', 'Second', 'Negotiation', 'Offer', 'Onboarding', 'Rejected'].includes(currentStage) ? 'bg-black' : ''}`} />
        <IconWithBg
          className={`size-[40px] ${['Technical', 'Second', 'Negotiation', 'Offer', 'Onboarding', 'Rejected'].includes(currentStage) ? 'bg-black text-white' : ''}`}
          icon={<PiListNumbersFill size={24} />}
          onClick={() => handleNavigation('Technical')}
        />
        <StepLine className={`${['Second', 'Negotiation', 'Offer', 'Onboarding', 'Rejected'].includes(currentStage) ? 'bg-black' : ''}`} />
        <IconWithBg
          className={`size-[40px] ${['Second', 'Negotiation', 'Offer', 'Onboarding', 'Rejected'].includes(currentStage) ? 'bg-black text-white' : ''}`}
          icon={<PiListChecksFill size={24} />}
          onClick={() => handleNavigation('Second')}
        />
        <StepLine className={`${['Negotiation', 'Offer', 'Onboarding', 'Rejected'].includes(currentStage) ? 'bg-black' : ''}`} />
        <IconWithBg
          className={`size-[40px] ${['Negotiation', 'Offer', 'Onboarding', 'Rejected'].includes(currentStage) ? 'bg-black text-white' : ''}`}
          icon={<IoDocumentTextOutline size={24} />}
          onClick={() => handleNavigation('Negotiation')}
        />
        <StepLine className={`${['Onboarding', 'Rejected', 'Offer'].includes(currentStage) ? 'bg-black' : ''}`} />
        <IconWithBg
          className={`size-[40px] ${['Onboarding', 'Rejected', 'Offer'].includes(currentStage) ? 'bg-black text-white' : ''}`}
          icon={<IoDocumentTextOutline size={24} />}
          onClick={() => handleNavigation('Offer')}
        />
        <StepLine />
        <IconWithBg
          className="size-[40px]"
          icon={<FaRegHandshake size={24} />}
          onClick={() => handleNavigation('Onboarding')}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className={`cursor-pointer ${currentStage === 'Applied' ? 'font-semibold' : ''}`} onClick={() => handleNavigation('Applied')}>
          First Round
        </p>
        <p className={`cursor-pointer ${['Technical'].includes(currentStage) ? 'font-semibold' : ''}`} onClick={() => handleNavigation('Technical')}>
          Technical Interview
        </p>
        <p className={`cursor-pointer ${['Second'].includes(currentStage) ? 'font-semibold' : ''}`} onClick={() => handleNavigation('Second')}>
          Second Round
        </p>
        <p className={`cursor-pointer ${['Negotiation'].includes(currentStage) ? 'font-semibold' : ''}`} onClick={() => handleNavigation('Negotiation')}>
          Offer and Negotiation
        </p>
        <p className={`cursor-pointer ${['Offer', 'Onboarding', 'Rejected'].includes(currentStage) ? 'font-semibold' : ''}`} onClick={() => handleNavigation('Offer')}>
          Offer Approval
        </p>
        <p className="cursor-pointer" onClick={() => handleNavigation('Onboarding')}>
          Onboarding
        </p>
      </div>
    </>
  );
};

export default Stepper;
