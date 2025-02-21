import Link from 'next/link';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiArrowUpRightThin } from 'react-icons/pi';
import Button from '../Button';
import UserLeaveInfo from './UserLeaveInfo';

const LeaveRequests = () => {
  return (
    <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4">
      <header className="flex items-center gap-4 justify-between">
        <h1 className="flex items-center gap-4 font-medium text-[18px] mb-4">
          <IoCalendarOutline />
          Leave Requests
        </h1>
        <Link href="/hr/leave-requests">
          <Button
            name="See All"
            icon={<PiArrowUpRightThin size={14} />}
            bg="transparent"
            textColor="black"
            className="!text-[10px]"
          />
        </Link>
      </header>

      <UserLeaveInfo />
    </section>
  );
};
export default LeaveRequests;
