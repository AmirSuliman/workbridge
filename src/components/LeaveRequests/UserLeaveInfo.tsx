import { IoCheckmark } from 'react-icons/io5';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { MdCalendarToday } from 'react-icons/md';
import { PiUmbrellaBold } from 'react-icons/pi';
import { RxCross1 } from 'react-icons/rx';
import Button from '../Button';
import UserImgPlaceholder from './UserImgPlaceholder';

const UserLeaveInfo = ({
  emplyeeName,
  leaveDay,
  retruningDay,
}: {
  emplyeeName: String;
  leaveDay: String;
  retruningDay: String;
}) => {
  return (
    <tbody className="py-4">
      <tr className="[&_td:p-1] pt-4">
        <td className="p-1 pt-4">
          <UserImgPlaceholder />
        </td>
        <td className="p-1 pt-4">
          <p className="text-base capitalize whitespace-nowrap">
            {emplyeeName}
          </p>
        </td>
        <td className="p-1 pt-4">
          <Button
            name="Confirm Request"
            bg="#00B87D"
            textColor="white"
            icon={<IoCheckmark />}
          />
        </td>
        <td className="p-1 pt-4">
          <Button
            name="Deny"
            bg="#F53649"
            textColor="white"
            icon={<RxCross1 />}
          />
        </td>
      </tr>

      <tr className="[&_td:p-1]">
        <td className="text-xs opacity-50 p-1">Leave Type</td>
        <td className="text-xs opacity-50 p-1">Duration</td>
        <td className="text-xs opacity-50 p-1">Leave Day</td>
        <td className="text-xs opacity-50 p-1">Returning Day</td>
      </tr>

      <tr className="">
        <td className="text-sm p-1 pb-4">
          <div className="flex gap-1 items-center">
            <PiUmbrellaBold className="opacity-50" size={14} />
            Vacation
          </div>
        </td>
        <td className="text-sm p-1 pb-4">
          <div className="flex gap-1 items-center">
            <MdCalendarToday className="opacity-50" size={14} />
            12 days
          </div>
        </td>
        <td className="text-sm p-1 pb-4">
          <div className="flex gap-1 items-center">
            <LuLogOut className="opacity-50" size={14} />
            {leaveDay}
          </div>
        </td>
        <td className="text-sm p-1 pb-4">
          <div className="flex gap-1 items-center">
            <LuLogIn className="opacity-50" size={14} />
            {retruningDay}
          </div>
        </td>
      </tr>
    </tbody>
  );
};
export default UserLeaveInfo;
