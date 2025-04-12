'use client';
import Modal from '@/components/modal/Modal';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import imageLoader from '../../../imageLoader';
import LabelWithIcon from '../common/LabelWithIcon';
import ClockRotateIcon from '../icons/clock-rotate-icon';
import SickPersonIcon from '../icons/sick-person-icon';
import UmbrellaIcon from '../icons/umbrella-icon';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';
import SickCard from './sickCard';
import VacationsCard from './VacationsCard';

interface Employee {
  firstName: string;
  lastName: string;
}
interface TimeOffItem {
  id: string;
  leaveDay: string;
  returningDay: string;
  type: string;
  status: string;
  note: string;
  employee: Employee;
  user: {
    firstName: string;
    lastName: string;
  };
}

const TimeOffSection = ({ employeeData }) => {
  console.log('emp data: ', employeeData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leaveDate, setLeaveDate] = useState('');
  const [returningDate, setReturningDate] = useState('');
  const [duration, setDuration] = useState(0);
  const [timeOffData, setTimeOffData] = useState<TimeOffItem[]>(
    employeeData ? employeeData.timeOffRequests : []
  );
  const [selectedTimeOff, setSelectedTimeOff] = useState<TimeOffItem | null>(
    null
  );
  const { empId } = useParams(); // This id is used to view any employee's info

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const totalDays =
    selectedTimeOff?.type === 'Vacation'
      ? employeeData?.vacationLeaveCounter
      : employeeData?.sickLeaveCounter || 0;

  const calculateDuration = (start: string, end: string) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (startDate > endDate) {
        return 0;
      }
      const duration =
        Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
      return duration > 0 ? duration : 0;
    }
    return 0;
  };

  useEffect(() => {
    setDuration(calculateDuration(startDate, endDate));
  }, [startDate, endDate]);

  const getMaxDate = (start: string, days: number) => {
    if (!start) return '';
    const startDateObj = new Date(start);
    startDateObj.setDate(startDateObj.getDate() + days - 1);
    return startDateObj.toISOString().split('T')[0];
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTimeOff(null);
    setLeaveDate('');
    setReturningDate('');
    setDuration(0);
  };

  const handleUpdateTimeOff = async () => {
    if (!selectedTimeOff) return;

    const payload = {
      leaveDay: new Date(leaveDate).toISOString(),
      returningDay: new Date(returningDate).toISOString(),
      duration,
      type: selectedTimeOff.type,
    };

    try {
      await axiosInstance.put(`/timeoff/${selectedTimeOff.id}`, payload);
      // Refresh data after update
      // if employee id is not coming from search params then show my timoffs
      // else show that employee's timeoffs
      if (!empId) {
        const response = await axiosInstance.get('/timeoffs/my');
        setTimeOffData(response.data.data.items);
      } else {
        const response = await axiosInstance.get(
          `/timeoffs?employeeId=${empId}`
        );
        console.log('empId timeoffs: ', response.data.data.items);
        setTimeOffData(response.data.data.items);
      }
      toast.success('Time off updated successfully');
      closeModal();
    } catch (err) {
      console.error('Error updating time off:', err);
      setError('Failed to update time off');
    }
  };

  const values = timeOffData
    .filter((timeoff, index) => timeoff.status === 'Pending')
    .map((item, index) => [
      <LabelWithIcon
        key={index}
        icon={
          item.type === 'Vacation' ? (
            <UmbrellaIcon classNames='w-4 text-white' />
          ) : (
            <SickPersonIcon classNames='w-4 text-white' />
          )
        }
        title={item.type}
        iconStyles={item.type === 'Vacation' ? 'bg-[#00B87D]' : 'bg-[#F53649]'}
      />,
      new Date(item.leaveDay).toLocaleDateString(),
      new Date(item.returningDay).toLocaleDateString(),
      <span
        key={`status-${index}`}
        className={
          item.status === 'Pending'
            ? 'text-black'
            : item.status === 'Confirmed'
              ? 'text-[#25A244] font-[500]'
              : 'text-[#F53649]'
        }
      >
        {item.status === 'Pending' ? 'Waiting for Approval' : item.status}
      </span>,
    ]);

  return (
    <div className='p-1 rounded-md h-full'>
      <div className='flex flex-col md:flex-row gap-6'>
        <VacationsCard employeeData={employeeData} />
        <SickCard employeeData={employeeData} />
      </div>

      <div className='bg-white mt-5 border border-gray-border rounded-[10px] p-3 md:p-5 w-full '>
        <FormHeading
          classNames='mb-[2rem]'
          icon={<UmbrellaIcon classNames='w-4 text-dark-navy' />}
          text='Upcoming Time Off'
        />
        {error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <InfoGrid
            headers={[
              'Time Off Type',
              'Time Off Start',
              'Time Off End',
              'Status',
            ]}
            values={values}
          />
        )}
      </div>
      <div className='bg-white mt-5 border border-gray-border rounded-[10px] p-3 md:p-5 w-full'>
        <FormHeading
          classNames='mb-5'
          icon={<ClockRotateIcon classNames='w-4' />}
          text='Time Off History'
        />

        {error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <InfoGrid
            headers={[
              'Type',
              'Date From',
              'Date To',
              'Days Used',
              'Status',
              'Approved/Denied By',
              'Notes',
            ]}
            values={timeOffData
              .filter((timeoff) => timeoff.status !== 'Pending')
              .map((item, index) => [
                <LabelWithIcon
                  key={index}
                  icon={
                    item.type === 'Vacation' ? (
                      <UmbrellaIcon classNames='w-4 text-white' />
                    ) : (
                      <SickPersonIcon classNames='w-4 text-white' />
                    )
                  }
                  title={item.type}
                  iconStyles={
                    item.type === 'Vacation' ? 'bg-[#00B87D]' : 'bg-[#F53649]'
                  }
                />,

                new Date(item.leaveDay).toLocaleDateString(),
                new Date(item.returningDay).toLocaleDateString(),

                // days used are inside the employee data, not in the timeoffs array
                item.type === 'Vacation'
                  ? employeeData?.vacationDaysUsed || ''
                  : employeeData?.sickDaysUsed || '',

                item?.status === 'Confirmed' ? (
                  <p className='text-[#00B87D]'>Confirmed</p>
                ) : (
                  <p className='text-[#F53649]'>Denied</p>
                ),

                `${item?.user?.firstName || 'N/A'} ${
                  item?.user?.lastName || ''
                }`.trim(),

                `${item.note || 'N/A'}`,
              ])}
          />
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className='p-6 w-full sm:w-[600px]'>
            <div className='flex flex-row items-center gap-2'>
              {selectedTimeOff?.type?.toLowerCase() === 'vacation' ? (
                <Image
                  loader={imageLoader}
                  src='/vaction.png'
                  alt='img'
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  loader={imageLoader}
                  src='/sickleave.png'
                  alt='img'
                  width={40}
                  height={40}
                />
              )}
              <h2 className='text-2xl font-semibold'>
                Edit Request {selectedTimeOff?.type}
              </h2>
            </div>

            <div className='flex flex-row items-center gap-4 w-full mt-8'>
              <label className='flex flex-col w-full'>
                <span className='text-gray-400 text-[12px]'>Leaving Date</span>
                <input
                  type='date'
                  className='p-3 border rounded w-full'
                  min={new Date().toISOString().split('T')[0]}
                  max={getMaxDate(
                    new Date().toISOString().split('T')[0],
                    totalDays
                  )}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label className='flex flex-col w-full'>
                <span className='text-gray-400 text-[12px]'>
                  Returning Date
                </span>
                <input
                  type='date'
                  className='p-3 border rounded w-full'
                  min={startDate}
                  max={getMaxDate(startDate, totalDays)}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </div>

            <p className='text-[13px] text-gray-600 mt-3'>
              This {selectedTimeOff?.type?.toLowerCase()} is{' '}
              {selectedTimeOff?.status}. Changing the dates will require
              reapproval.
            </p>
            <div className='h-[1px] w-full bg-gray-200 mt-8' />

            <div className='flex flex-row gap-4 items-center mt-4'>
              <p className='text-[14px]'>Duration of Leave</p>
              <div className='text-[14px] border rounded p-3 px-12'>
                {/* Show the calculated duration */}
                {duration} days
              </div>
            </div>

            <div className='flex flex-row p-8 px-4 w-full gap-4 mt-24'>
              <button
                type='button'
                onClick={handleUpdateTimeOff}
                className='px-4 py-3 bg-dark-navy text-white rounded w-full'
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                type='button'
                className='px-4 py-3 border rounded w-full'
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TimeOffSection;
