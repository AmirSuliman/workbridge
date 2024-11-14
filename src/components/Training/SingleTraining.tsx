import { HiTrophy } from 'react-icons/hi2';
import IconWithBg from '../SingleAnnouncement/IconWithBg';
import { FaRegCalendar } from 'react-icons/fa';

const SingleTraining = ({
  text,
  date,
  progress,
}: {
  text: String;
  date: String;
  progress: String;
}) => {
  return (
    <article className="border-[0.5px] border-[#E8E8E8] bg-[#F5F6FA] rounded p-4 flex items-center gap-4">
      <IconWithBg icon={<HiTrophy />} bgColor="black" />
      <div className="grid grid-cols-2">
        <p className="text-base col-span-full">{text}</p>
        <p className="flex gap-2 items-center text-[10px] opacity-50 font-medium">
          <FaRegCalendar />
          <span>{date}</span>
        </p>
        <p className="flex gap-2 items-center text-[10px] opacity-50 font-bold">
          <svg
            width="4"
            height="3"
            viewBox="0 0 4 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M2.15838 2.83172C1.92921 2.83172 1.71993 2.77585 1.53054 2.66411C1.34115 2.55047 1.18963 2.39896 1.07599 2.20956C0.964252 2.02017 0.908381 1.81089 0.908381 1.58172C0.908381 1.35066 0.964252 1.14138 1.07599 0.95388C1.18963 0.764486 1.34115 0.613917 1.53054 0.502175C1.71993 0.388539 1.92921 0.33172 2.15838 0.33172C2.38944 0.33172 2.59872 0.388539 2.78622 0.502175C2.97562 0.613917 3.12618 0.764486 3.23793 0.95388C3.35156 1.14138 3.40838 1.35066 3.40838 1.58172C3.40838 1.81089 3.35156 2.02017 3.23793 2.20956C3.12618 2.39896 2.97562 2.55047 2.78622 2.66411C2.59872 2.77585 2.38944 2.83172 2.15838 2.83172Z"
              fill="#0F172A"
            />
          </svg>
          <span>{progress} Complete</span>
        </p>
      </div>
    </article>
  );
};
export default SingleTraining;
