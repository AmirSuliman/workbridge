import IconWithBg from '../SingleAnnouncement/IconWithBg';
import DaysCard from './DaysCard';
import Button from '../Button';
import React from 'react';
import { useRouter } from 'next/navigation';

const LeaveAndVacationCard = ({
  title,
  bgColor,
  icon,
  description,
  daysNum,
  name,
}: {
  title: string;
  bgColor: string;
  icon: React.ReactNode;
  description: string;
  daysNum: string;
  name: string;
}) => {
  const router = useRouter();

  const navigateToTimeRequestTab = () => {
    router.push('/hr/my-information?tab=2'); // Pass tab index via query param
  };
  return (
    <div className="border-[0.5px] border-[#E8E8E8] bg-[#F5F6FA] p-4 rounded space-y-2 w-full">
      <div className="flex items-center gap-2">
        <IconWithBg bgColor={bgColor} icon={icon} />
        <h3 className="text-sm">{title}</h3>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p className="text-xs opacity-50">{description}</p>
        <DaysCard daysNum={daysNum} />
      </div>

      <div onClick={navigateToTimeRequestTab} className="w-fit h-fit">
        <Button name={name} icon="" bg="black" textColor="white" />
      </div>
    </div>
  );
};
export default LeaveAndVacationCard;
