import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import Button from '../Button';
import UserImgPlaceholder from '../LeaveRequests/UserImgPlaceholder';

const UserCelebrationInfo = () => {
  return (
    <article className="flex gap-4 pt-4 items-center w-full">
      <UserImgPlaceholder name="Aaron Eaglewood" />
      <div>
        <h6 className=" text-[14px]">Aaron Eaglewood</h6>
        <p className="font-medium text-[11px] opacity-50">
          November 6 - Happy Birthday!
        </p>
      </div>
      <div className="w-fit ml-auto mr-0">
        <Button
          name="Say Happy Birthday"
          bg="[#0F172A]"
          textColor=""
          icon={<LiaBirthdayCakeSolid />}
          className="!text-[9px]"

        />
      </div>
    </article>
  );
};
export default UserCelebrationInfo;
