'use client';

import { IMAGES } from '@/constants/images';
import { RootState } from '@/store/store';
import { EmployeeData } from '@/types/employee';
import { CiMobile3 } from 'react-icons/ci';
import { FaEdit, FaPhoneAlt, FaRegCalendar } from 'react-icons/fa';
import { HiOutlineHashtag } from 'react-icons/hi';
import { HiMiniBriefcase } from 'react-icons/hi2';
import { IoLocationSharp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';

import Image from 'next/image';
import Button from '../Button';
import FacebookIcon from '../icons/fb-icon';
import InstagramIcon from '../icons/instagram-icon';
import LinkedinIcon from '../icons/linkedin-icon';
import ProfileInfoItem from './ProfileInfoItem';
import { BiLoaderCircle } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import imageLoader from '../../../imageLoader';
import UploadProfilePicture from '../UserInformation/UploadProfilePicture';
import { calculateDuration } from '@/lib/calculateDuration';
import { formatDate } from '@/utils/misc';

const ProfileCard = ({
  setEditEmployee,
  editEmployee,
  employeeData,
  onSubmit,
  loading,
}: {
  setEditEmployee: (value: boolean) => void;
  employeeData: EmployeeData;
  onSubmit;
  editEmployee: boolean;
  loading?: boolean;
}) => {
  const { country = '', state = '' } = employeeData?.location || {};

  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const { empId } = useParams(); // This id is used to view any employee's info
  const [imgSrc, setImgSrc] = useState(
    employeeData?.profilePictureUrl || IMAGES?.placeholderAvatar
  );

  useEffect(() => {
    setImgSrc(employeeData?.profilePictureUrl || IMAGES?.placeholderAvatar);
  }, [employeeData?.profilePictureUrl]);

  const hireDate = employeeData?.hireDate
    ? formatDate(employeeData.hireDate)
    : '';

  const logedInUser = useSelector((state: RootState) => state.myInfo?.user);
  const userRole = logedInUser?.role;
  const isUserPanel = userRole === 'ViewOnly' || userRole === 'Manager';

  const duration = employeeData?.hireDate ? calculateDuration(hireDate) : '';

  return (
    <article
      className={`bg-white shadow-md rounded-md border border-gray-border p-4 pb-6 `}
    >
      <div className='flex gap-4'>
        <div className='flex flex-col items-center'>
          <div className='relative w-fit h-fit group rounded-full'>
            {/* if User panel then show this button to let the user update their profile picture only */}
            {/* if empId exist then don't show the component  */}
            {!empId && isUserPanel && <UploadProfilePicture />}

            <Image
              src={imgSrc}
              alt='Avatar'
              width={128}
              height={128}
              quality={80}
              placeholder='blur'
              blurDataURL={IMAGES?.placeholderAvatar.src}
              className='w-12 h-10 sm:w-32 sm:h-28 shrink-0 grow-0 rounded-full object-cover'
              onError={() => {
                setImgSrc(IMAGES?.placeholderAvatar);
              }}
              loading='lazy'
            />
          </div>
          {/* social Icons */}
          <div className='mt-2 flex gap-1 items-center '>
            {employeeData?.facebook && (
              <a
                href={employeeData?.facebook || '#'}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FacebookIcon classNames='size-6' />
              </a>
            )}
            {employeeData?.linkedin && (
              <a
                href={employeeData?.linkedin || '#'}
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedinIcon classNames='size-6' />
              </a>
            )}
            {employeeData?.instagram && (
              <a
                href={employeeData?.instagram || '#'}
                target='_blank'
                rel='noopener noreferrer'
              >
                <InstagramIcon classNames='size-6' />
              </a>
            )}
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between flex-wrap'>
            <div className='flex flex-col'>
              <h1 className={`text-[18px] sm:text-[24px]`}>{`${
                employeeData?.firstName || ''
              } ${employeeData?.lastName || ''}`}</h1>
              <p className='text-[12px] sm:text-[16px] text-gray-500'>
                {employeeData?.tittle || ''}
              </p>
            </div>
            {/* hide buttons for all tabs except for 0, 1 and root (no tab) */}
            {(!tab || tab === '0' || tab === '1') && (
              <div className='flex items-center gap-4'>
                {!isUserPanel &&
                  (loading ? (
                    <Button
                      type='button'
                      className={'!bg-dark-navy !text-white !text-xs'}
                      icon={
                        <BiLoaderCircle className='h-5 w-5 duration-100 animate-spin' />
                      }
                      name=''
                    />
                  ) : !editEmployee ? (
                    <Button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        setEditEmployee(true);
                      }}
                      className={'!bg-dark-navy !text-white !text-xs'}
                      icon={<FaEdit />}
                      name={'Edit Profile'}
                    />
                  ) : (
                    <Button
                      onClick={onSubmit}
                      type='submit'
                      className={'!bg-dark-navy !text-white !text-xs'}
                      icon=''
                      name={'Save Changes'}
                    />
                  ))}
                {editEmployee && (
                  <button
                    type='button'
                    className='text-[12px]'
                    onClick={(e) => {
                      e.preventDefault();
                      setEditEmployee(false);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
          <div className='flex mt-3 gap-8 flex-wrap'>
            <ProfileInfoItem
              icon={CiMobile3}
              text={employeeData?.phoneNumber || ''}
              title='Phone Number'
            />
            <ProfileInfoItem
              icon={FaPhoneAlt}
              text={employeeData?.workPhone || ''}
              title='Work Number'
            />
            <ProfileInfoItem
              icon={MdEmail}
              text={employeeData?.email || ''}
              title='Email'
            />
          </div>
          <div className='flex mt-4 gap-8 flex-wrap'>
            <ProfileInfoItem
              icon={HiOutlineHashtag}
              text={employeeData?.userId?.toString() || ''}
              title='Identification No.'
            />
            <ProfileInfoItem
              icon={FaRegCalendar}
              text={hireDate}
              title='Hire Date'
            />
            <ProfileInfoItem
              icon={FaRegCalendar}
              text={duration}
              title='Duration'
            />
            <ProfileInfoItem
              icon={HiMiniBriefcase}
              text={employeeData?.employmentType || ''}
              title='Work Type'
            />
            <ProfileInfoItem
              icon={HiMiniBriefcase}
              text={employeeData?.tittle || ''}
              title='Job Title'
            />
            <ProfileInfoItem
              icon={IoLocationSharp}
              text={
                // if country and state are equal then show only the country
                // if state exist then prefix it with the comma (,)
                country === state
                  ? `${country}`
                  : `${country}${state ? ', ' + state : ''}`
              }
              title='Location'
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProfileCard;
