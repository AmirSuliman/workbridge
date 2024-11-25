'use client';

import { IMAGES } from '@/constants/images';
import { RootState } from '@/store/store';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { CiMobile3 } from 'react-icons/ci';
import { FaEdit, FaPhoneAlt, FaRegCalendar } from 'react-icons/fa';
import { HiOutlineHashtag } from 'react-icons/hi';
import { HiMiniBriefcase } from 'react-icons/hi2';
import { IoLocationSharp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Button from '../Button';
import FacebookIcon from '../icons/fb-icon';
import InstagramIcon from '../icons/instagram-icon';
import LinkedinIcon from '../icons/linkedin-icon';
import ProfileInfoItem from './ProfileInfoItem';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});
const ProfileCard = () => {
  const employeeData = useSelector((state: RootState) => state.employee.data);

  const hireDate = employeeData?.hireDate
    ? employeeData.hireDate.split('T')[0]
    : 'N/A';

  const calculateDuration = (startDate: string | undefined): string => {
    if (!startDate) return 'N/A';

    const start = new Date(startDate);
    const now = new Date();

    // Get the difference in milliseconds
    const differenceInMilliseconds = now.getTime() - start.getTime();

    // Calculate the difference in days
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    // Calculate the difference in months
    const months =
      now.getMonth() -
      start.getMonth() +
      12 * (now.getFullYear() - start.getFullYear());

    // If less than a month, return days
    if (months < 1) return `${days}d`;

    // If less than a year, return months
    if (months < 12) return `${months}m`;

    // Otherwise, calculate years and months
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    return `${years}y ${remainingMonths}m`;
  };

  const duration = employeeData?.hireDate ? calculateDuration(hireDate) : 'N/A';

  console.log('employeeData: ', employeeData);

  return (
    <article
      className={`bg-white shadow-md rounded-md border border-gray-border p-4 pb-6 ${inter.className}`}
    >
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <Image
            className="rounded-full max-w-[6rem] object-contain"
            src={employeeData?.profilePictureUrl || IMAGES.placeholderAvatar}
            height={1000}
            width={1000}
            alt={'User Image'}
          />
          {/* social Icons */}
          <div className="mt-2 flex gap-1 items-center ">
            {employeeData?.facebook && (
              <a
                href={employeeData?.facebook || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon classNames="size-6" />
              </a>
            )}
            {employeeData?.linkedin && (
              <a
                href={employeeData?.linkedin || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon classNames="size-6" />
              </a>
            )}
            {employeeData?.instagram && (
              <a
                href={employeeData?.instagram || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon classNames="size-6" />
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between flex-wrap">
            <div className="flex flex-col">
              <h1 className={`text-lg`}>{`${employeeData?.firstName || ''} ${
                employeeData?.lastName || ''
              }`}</h1>
              <p className="text-xs text-gray-500">
                {employeeData?.tittle || 'N/A'}
              </p>
            </div>
            <div className="h-5">
              <Button
                classNames={'!bg-dark-navy !text-white !text-xs'}
                icon={<FaEdit />}
                name="Edit Profile"
              />
            </div>
          </div>
          <div className="flex mt-3 gap-4 flex-wrap">
            <ProfileInfoItem
              icon={CiMobile3}
              text={employeeData?.phoneNumber || 'N/A'}
              title="Phone Number"
            />
            <ProfileInfoItem
              icon={FaPhoneAlt}
              text={employeeData?.workPhone || 'N/A'}
              title="Work Number"
            />
            <ProfileInfoItem
              icon={MdEmail}
              text={employeeData?.email || 'N/A'}
              title="Email"
            />
          </div>
          <div className="flex mt-3 gap-4 flex-wrap">
            <ProfileInfoItem
              icon={HiOutlineHashtag}
              text={employeeData?.userId.toString() || 'N/A'}
              title="Identification No."
            />
            <ProfileInfoItem
              icon={FaRegCalendar}
              text={hireDate}
              title="Hire Date"
            />
            <ProfileInfoItem
              icon={FaRegCalendar}
              text={duration}
              title="Duration"
            />
            <ProfileInfoItem
              icon={HiMiniBriefcase}
              text={employeeData?.employmentType || 'N/A'}
              title="Work Type"
            />
            <ProfileInfoItem
              icon={HiMiniBriefcase}
              text={employeeData?.tittle || 'N/A'}
              title="Job Title"
            />
            <ProfileInfoItem
              icon={IoLocationSharp}
              text={
                `${employeeData?.location.country}, ${employeeData?.location.state}` ||
                'N/A'
              }
              title="Location"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProfileCard;
