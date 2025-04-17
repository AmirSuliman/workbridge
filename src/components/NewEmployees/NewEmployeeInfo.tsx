import { FaLocationDot } from 'react-icons/fa6';
import { GoArrowUpRight } from 'react-icons/go';
import Button from '../Button';
import UserImgPlaceholder from '../LeaveRequests/UserImgPlaceholder';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

interface NewEmployeeInfoProps {
  name: string;
  title: string;
  img?: string;
  location: string;
  startDate: string;
  id: number;
}

const NewEmployeeInfo = ({
  name,
  title,
  img,
  location,
  startDate,
  id,
}: NewEmployeeInfoProps) => {
  const [role, setRole] = useState<string>();
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role);
    };
    fetchSession();
  }, []);

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  return (
    <article className='flex items-start gap-4 pt-4'>
      {img ? (
        <img src={img} className='size-[70px] rounded-full' />
      ) : (
        <UserImgPlaceholder className='size-[50px]' name={name} />
      )}
      <main className='mt-1'>
        <p className='text-base'>{name}</p>
        <p className='text-xs'>{title}</p>
        <p className='flex items-center gap-2 text-xs opacity-50'>
          <FaLocationDot />
          {location} - Started: <span>{`  ${startDate}`}</span>
        </p>
        <Link
          href={
            isUserPanel
              ? `/user/employees/employee-info/${id}`
              : `/hr/employees/employee-info/${id}`
          }
        >
          <button className='border rounded-[3px] p-1 px-2 flex flex-row gap-2 mt-3 items-center text-[10px]'>
            {' '}
            See more <GoArrowUpRight />{' '}
          </button>
        </Link>
      </main>
    </article>
  );
};
export default NewEmployeeInfo;
