import React from 'react';
import Image from 'next/image';
import DaysStatBox from './DaysStatBox';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

interface RequestCardProps {
  type: 'vacation' | 'sick';
  totalDays: number;
  totalDaysUsed: number;
  onClick: () => void;
  icon?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

const RequestCard: React.FC<RequestCardProps> = ({
  type,
  totalDays,
  totalDaysUsed,
  onClick,
  icon,
  imageSrc,
  imageAlt,
}) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const { empId } = useParams(); // This id is used to view any employee's info

  const title = type === 'vacation' ? 'Request Vacation' : 'Request Sick Leave';
  const buttonText =
    type === 'vacation' ? 'Request Vacation' : 'Request Sick leave';
  const subtitle =
    type === 'vacation'
      ? 'Requests must be made at least 2 weeks prior to submission'
      : '';

  return (
    <div className='flex items-center justify-between border border-gray-border rounded-[10px] bg-white p-4 gap-2 w-full'>
      <div className='flex flex-col justify-between gap-[2rem] w-full h-full mr-auto'>
        <div>
          <div className='flex gap-2 items-center mb-2 w-full'>
            <div
              className={`flex items-center justify-center rounded-full ${icon && 'p-1 bg-[#00B87D]'}`}
            >
              {icon
                ? icon
                : imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={imageAlt || 'icon'}
                      width={25}
                      height={25}
                    />
                  )}
            </div>
            <h3 className='text-dark-navy font-[500] text-sm'>{title}</h3>
          </div>
          {subtitle && (
            <p className='font-[400] text-[#878b94] text-xs'>{subtitle}</p>
          )}
        </div>

        {userRole === 'Manager' && empId ? null : (
          <button
            type='button'
            onClick={onClick}
            className={`text-white bg-dark-navy py-2 w-full max-w-[15rem] rounded text-xs xl:text-sm ${
              totalDays === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={totalDays === 0}
          >
            {buttonText}
          </button>
        )}
      </div>

      <DaysStatBox value={totalDaysUsed} label='days used' />
      <DaysStatBox value={totalDays} label='days left' />
    </div>
  );
};

export default RequestCard;
