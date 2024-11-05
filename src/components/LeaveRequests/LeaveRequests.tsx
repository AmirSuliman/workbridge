import Link from 'next/link';
import Button from '../Button';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiArrowUpRightThin } from 'react-icons/pi';

const LeaveRequests = () => {
  return (
    <div>
      <header className="px-4 flex items-center gap-4 justify-between">
        <h1 className="flex items-center gap-4 font-semibold text-xl mb-4">
          <IoCalendarOutline />
          Announcements
        </h1>
        <Link href="/HR/Home/All-Announcements">
          <Button
            name="See All"
            icon={<PiArrowUpRightThin size={18} />}
            bg="transparent"
            textColor="black"
          />
        </Link>
      </header>
    </div>
  );
};
export default LeaveRequests;
