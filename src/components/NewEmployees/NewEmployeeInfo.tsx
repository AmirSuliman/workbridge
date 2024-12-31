import { FaLocationDot } from 'react-icons/fa6';
import { GoArrowUpRight } from 'react-icons/go';
import Button from '../Button';
import UserImgPlaceholder from '../LeaveRequests/UserImgPlaceholder';
import Link from 'next/link';

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
  return (
    <article className="flex items-start gap-4 pt-4">
      {img ? (
        <img src={img} className="size-[50px] rounded-full" />
      ) : (
        <UserImgPlaceholder className="size-[50px]" name={name} />
      )}
      <main className="">
        <p className="text-base">{name}</p>
        <p className="text-xs">{title}</p>
        <p className="flex items-center text-xs opacity-50">
          <FaLocationDot />
          {location} - Started: <span>{`  ${startDate}`}</span>
        </p>
        <Link href={`/hr/employees/employee-info/${id}`}>
          <Button
            name="See more"
            icon={<GoArrowUpRight />}
            bg="transparent"
            className="mt-4 !text-black !text-[10px]"
          />
        </Link>
      </main>
    </article>
  );
};
export default NewEmployeeInfo;
