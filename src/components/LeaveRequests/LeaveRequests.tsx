import Link from 'next/link';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiArrowUpRightThin } from 'react-icons/pi';
import Button from '../Button';
import UserLeaveInfo from './UserLeaveInfo';

const LeaveRequests = () => {
  return (
    <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4">
      <header className="flex items-center gap-4 justify-between">
        <h1 className="flex items-center gap-4 font-semibold text-xl mb-4">
          <IoCalendarOutline />
          Leave Requests
        </h1>
        <Link href="/hr/leave-requests">
          <Button
            name="See All"
            icon={<PiArrowUpRightThin size={18} />}
            bg="transparent"
            textColor="black"
          />
        </Link>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full divide-y-[1px] divide-[#E8E8E8] space-y-4">
          <UserLeaveInfo/>
         
          
        </table>
      </div>
    </section>
  );
};
export default LeaveRequests;
