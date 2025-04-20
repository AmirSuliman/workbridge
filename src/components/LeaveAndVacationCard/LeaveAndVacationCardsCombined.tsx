import { fetchEmployeeData } from '@/store/slices/employeeInfoSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaveAndVacationCard from './LeaveAndVacationCard';

const LeaveAndVacationCardsCombined = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.myInfo);
  const employeeId = user?.user?.employeeId;
  const { data: employeeData } = useSelector(
    (state: RootState) => state.employee
  );

  useEffect(() => {
    if (employeeId) {
      dispatch(
        fetchEmployeeData({
          userId: Number(employeeId),
        })
      );
    } else console.log('Invalid session or employeeId');
  }, [dispatch, employeeId]);

  return (
    <div className='flex gap-4 flex-wrap lg:flex-nowrap p-4'>
      <LeaveAndVacationCard
        title='Vacation'
        bgColor='#25A244'
        icon={
          <img src='/vacation.svg' alt='Vacation Icon' className='w-4 h-4' />
        }
        description='Requests must be made at least 2 weeks prior to submission.'
        daysNum={String(employeeData?.vacationLeaveCounter || '0')}
        name='Request Vacation'
        tooltipText='Please note that your accrued vacation days are valid until December 31st of the current calendar year. We kindly encourage you to plan your time off in advance, as any unused days will expire at year-end.'
      />
      <LeaveAndVacationCard
        title='Sick leave'
        bgColor='#F53649'
        icon={
          <img src='/sickicon.svg' alt='Vacation Icon' className='w-5 h-5' />
        }
        description=''
        daysNum={String(employeeData?.sickLeaveCounter || '0')}
        name='Request Sick Leave'
        tooltipText='Sick leave days will reset to 0 at the end of the year.'
      />
    </div>
  );
};
export default LeaveAndVacationCardsCombined;
