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

  const stages = ['Applied', 'Technical', 'Second', 'Negotiation', 'Offer', 'Onboarding'];
  const currentIndex = stages.indexOf(currentStage);

  return (
    <>
      <div className="flex items-center">
        <IconWithBg
          className={`size-[40px] ${
            currentIndex === 0 ? 'bg-black text-white' : currentIndex > 0 ? 'bg-green-500 text-white' : ''
          }`}
          icon={<PiListChecksLight size={24} />}
          onClick={() => handleNavigation('Applied')}
        />
        <StepLine className={`${currentIndex >= 1 ? 'bg-green-500' : ''}`} />
        <IconWithBg
          className={`size-[40px] ${
            currentIndex === 1 ? 'bg-black text-white' : currentIndex > 1 ? 'bg-green-500 text-white' : ''
          }`}
          icon={<PiListNumbersFill size={24} />}
          onClick={() => handleNavigation('Technical')}
        />
        <StepLine className={`${currentIndex >= 2 ? 'bg-green-500' : ''}`} />
        <IconWithBg
          className={`size-[40px] ${
            currentIndex === 2 ? 'bg-black text-white' : currentIndex > 2 ? 'bg-green-500 text-white' : ''
          }`}
          icon={<PiListChecksFill size={24} />}
          onClick={() => handleNavigation('Second')}
        />
        <StepLine className={`${currentIndex >= 3 ? 'bg-green-500' : ''}`} />
        <IconWithBg
          className={`size-[40px] ${
            currentIndex === 3 ? 'bg-black text-white' : currentIndex > 3 ? 'bg-green-500 text-white' : ''
          }`}
          icon={<IoDocumentTextOutline size={24} />}
          onClick={() => handleNavigation('Negotiation')}
        />
        <StepLine className={`${currentIndex >= 4 ? 'bg-green-500' : ''}`} />
        <IconWithBg
          className={`size-[40px] ${
            currentIndex === 4 ? 'bg-black text-white' : currentIndex > 4 ? 'bg-green-500 text-white' : ''
          }`}
          icon={<IoDocumentTextOutline size={24} />}
          onClick={() => handleNavigation('Offer')}
        />
        <StepLine className={`${currentIndex >= 5 ? 'bg-green-500' : ''}`} />
        <IconWithBg
          className={`size-[40px] ${
            currentIndex === 5 ? 'bg-black text-white' : ''
          }`}
          icon={<FaRegHandshake size={24} />}
          onClick={() => handleNavigation('Onboarding')}
        />
      </div>
      <div className="flex items-center justify-between">
        <p
          className={`cursor-pointer ${currentStage === 'Applied' ? 'font-semibold' : ''}`}
          onClick={() => handleNavigation('Applied')}
        >
          First Round
        </p>
        <p
          className={`cursor-pointer ${currentStage === 'Technical' ? 'font-semibold' : ''}`}
          onClick={() => handleNavigation('Technical')}
        >
          Technical Interview
        </p>
        <p
          className={`cursor-pointer ${currentStage === 'Second' ? 'font-semibold' : ''}`}
          onClick={() => handleNavigation('Second')}
        >
          Second Round
        </p>
        <p
          className={`cursor-pointer ${currentStage === 'Negotiation' ? 'font-semibold' : ''}`}
          onClick={() => handleNavigation('Negotiation')}
        >
          Offer and Negotiation
        </p>
        <p
          className={`cursor-pointer ${currentStage === 'Offer' ? 'font-semibold' : ''}`}
          onClick={() => handleNavigation('Offer')}
        >
          Offer Approval
        </p>
        <p
          className={`cursor-pointer ${currentStage === 'Onboarding' ? 'font-semibold' : ''}`}
          onClick={() => handleNavigation('Onboarding')}
        >
          Onboarding
        </p>
      </div>
    </>
  );
};

export default Stepper;
