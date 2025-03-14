import IconWithBg from '../SingleAnnouncement/IconWithBg';
import DaysCard from './DaysCard';
import Button from '../Button';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

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
  const [role, setRole] = useState<string>();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role);
    };

    fetchSession();
  }, []);

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  const navigateToTimeRequestTab = () => {
    router.push(
      `${
        isUserPanel ? '/user/my-information?tab=2' : '/hr/my-information?tab=2'
      }`
    );
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

      <div onClick={navigateToTimeRequestTab} className="w-full h-fit ">
        <Button
          disabled={daysNum === '0'}
          name={name}
          icon=""
          bg="#0F172A"
          textColor="white"
          className="w-full mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};
export default LeaveAndVacationCard;
