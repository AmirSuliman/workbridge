import { fetchEmployeeData } from '@/store/slices/employeeInfoSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaveAndVacationCard from './LeaveAndVacationCard';

const LeaveAndVacationCardsCombined = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const { data: employeeData } = useSelector(
    (state: RootState) => state.employee
  );

  useEffect(() => {
    // Only fetch if we don't already have the data
    if (
      session?.user.accessToken &&
      session?.user.employeeId &&
      (!employeeData || !employeeData.firstName)
    ) {
      dispatch(
        fetchEmployeeData({
          accessToken: session.user.accessToken,
          userId: Number(session?.user.employeeId),
        })
      );
    } else if (!session?.user.accessToken || !session?.user.employeeId) {
      console.log('Invalid session or user ID');
    }
  }, [
    dispatch,
    session?.user.accessToken,
    session?.user.employeeId,
    employeeData,
  ]);

  return (
    <div className="flex gap-4 flex-wrap lg:flex-nowrap p-4">
      <LeaveAndVacationCard
        title="Vacation"
        bgColor="#25A244"
        icon={
          <img src="/vacation.svg" alt="Vacation Icon" className="w-4 h-4" />
        }
        description="Requests need to be made at least 48 hours prior."
        daysNum={String(employeeData?.vacationLeaveCounter || '0')}
        name="Request Vacation"
      />
      <LeaveAndVacationCard
        title="Sick leave"
        bgColor="#F53649"
        icon={
          <img src="/sickicon.svg" alt="Vacation Icon" className="w-5 h-5" />
        }
        description=""
        daysNum={String(employeeData?.sickLeaveCounter || '0')}
        name="Request Sick Leave"
      />
    </div>
  );
};
export default LeaveAndVacationCardsCombined;
