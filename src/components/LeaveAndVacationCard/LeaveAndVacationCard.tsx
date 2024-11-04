import { PiUmbrellaLight } from 'react-icons/pi';
import IconWithBg from '../SingleAnnouncement/IconWithBg';
import DaysCard from './DaysCard';
import Button from '../Button';
import React from 'react';

const LeaveAndVacationCard = ({
  title,
  bgColor,
  icon,
  description,
  daysNum,
  name,
}: {
  title: String;
  bgColor: String;
  icon: React.ReactNode;
  description: String;
  daysNum: String;
  name: string;
}) => {
  return (
    <div className="border-[0.5px] border-[#E8E8E8] bg-[#F5F6FA] p-4 rounded space-y-2">
      <div className="flex items-center gap-2">
        <IconWithBg bgColor={bgColor} icon={icon} />
        <h3 className="text-sm">{title}</h3>
      </div>
      <div className="flex justify-between items-center gap-2">
        <p className="text-xs opacity-50">{description}</p>
        <DaysCard daysNum={daysNum} />
      </div>

      <div className="">
        <Button name={name} icon="" bg="black" textColor="white" />
      </div>
    </div>
  );
};
export default LeaveAndVacationCard;
