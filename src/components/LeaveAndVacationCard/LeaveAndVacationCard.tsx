import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import IconWithBg from '../Announcements/IconWithBg';
import Button from '../Button';
import InfoTooltip from '../common/InfoTooltip';
import DaysCard from './DaysCard';

const LeaveAndVacationCard = ({
  title,
  bgColor,
  icon,
  description,
  daysNum,
  name,
  tooltipText,
}: {
  title: string;
  bgColor: string;
  icon: React.ReactNode;
  description: string;
  daysNum: string;
  name: string;
  tooltipText: string;
}) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.myInfo);
  const role = user?.user?.role;

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  const navigateToTimeRequestTab = () => {
    router.push(
      `${
        isUserPanel ? '/user/my-information?tab=2' : '/hr/my-information?tab=2'
      }`
    );
  };

  return (
    <div className='border-[0.5px] border-[#E8E8E8] bg-[#F5F6FA] p-4 rounded space-y-2 w-full'>
      <div className='flex items-center gap-2'>
        <IconWithBg bgColor={bgColor} icon={icon} />
        <h3 className='text-sm'>{title}</h3>
        <div className='flex justify-end'>
          <InfoTooltip text={tooltipText} />
        </div>
      </div>
      <div className='flex justify-between items-center gap-2'>
        <p className='text-xs opacity-50'>{description}</p>
        <DaysCard daysNum={daysNum} />
      </div>

      <div onClick={navigateToTimeRequestTab} className='w-full h-fit '>
        <Button
          disabled={daysNum === '0'}
          name={name}
          icon=''
          bg='#0F172A'
          textColor='white'
          className='w-full mt-8 disabled:opacity-70 disabled:cursor-not-allowed'
        />
      </div>
    </div>
  );
};
export default LeaveAndVacationCard;
