import { FaLocationDot } from 'react-icons/fa6';
import UserImgPlaceholder from '../LeaveRequests/UserImgPlaceholder';
import Button from '../Button';
import { GoArrowUpRight } from 'react-icons/go';
import { DiVim } from 'react-icons/di';

interface NewEmployeeInfoProps {
  name: string;
  title: string;
  img?: string;
  location: string;
  startDate: string;
}

const NewEmployeeInfo = ({
  name,
  title,
  img,
  location,
  startDate,
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
          {location} - Started <span>{startDate}</span>
        </p>
        <Button
          name="See more"
          icon={<GoArrowUpRight />}
          bg="transparent"
          classNames="mt-4 !text-black !text-[10px]"
        />
      </main>
    </article>
  );
};
export default NewEmployeeInfo;
