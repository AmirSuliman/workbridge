import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import Button from '../Button';
import UserImgPlaceholder from '../LeaveRequests/UserImgPlaceholder';

const UserCelebrationInfo = () => {
  return (
    <article className="flex gap-4 pt-4 items-center w-full">
      <UserImgPlaceholder />
      <div>
        <h6 className="text-base">Aaron Eaglewood</h6>
        <p className="font-medium text-xs opacity-50">
          November 6 - Happy Birthday!
        </p>
      </div>
      <div className="w-fit ml-auto mr-0">
        <Button
          name="Say Happy Birthday"
          bg=""
          textColor=""
          icon={<LiaBirthdayCakeSolid />}
        />
      </div>
    </article>
  );
};
export default UserCelebrationInfo;
