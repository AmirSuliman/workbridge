'use client';
import Modal from '@/components/modal/Modal';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LabelWithIcon from '../common/LabelWithIcon';
import ClockRotateIcon from '../icons/clock-rotate-icon';
import SickPersonIcon from '../icons/sick-person-icon';
import UmbrellaIcon from '../icons/umbrella-icon';
import FormHeading from './FormHeading';
import InfoGrid from './InfoGrid';
import SickCard from './sickCard';
import VacationsCard from './VacationsCard';
import { getSession } from 'next-auth/react';
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
  employee: Employee;
}

const TimeOffSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaveDate, setLeaveDate] = useState('');
  const [returningDate, setReturningDate] = useState('');
  const [duration, setDuration] = useState(0);
  const [timeOffData, setTimeOffData] = useState<TimeOffItem[]>([]);
  const [selectedTimeOff, setSelectedTimeOff] = useState<TimeOffItem | null>(
    null
  );

  // const [sessionUser, setSessionUser] = useState('');
  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const session = await getSession();
  //     console.log('session: ', session);
  //     setSessionUser(session?.user);
  //   };

  //   fetchSession();
  // }, []);

  const [totalDays, setTotalDays] = useState<number>(20);
  useEffect(() => {
    const fetchTimeOffData = async () => {
      try {
        const response = await axiosInstance.get('/timeoffs/my');
        setTimeOffData(response.data.data.items);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTimeOffData();
  }, []);

  const handleEditClick = (item) => {
    setSelectedTimeOff(item);
    setLeaveDate(new Date(item.leaveDay).toISOString().split('T')[0]);
    setReturningDate(new Date(item.returningDay).toISOString().split('T')[0]);
    calculateDuration(new Date(item.leaveDay), new Date(item.returningDay));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTimeOff(null);
    setLeaveDate('');
    setReturningDate('');
    setDuration(0);
  };

  const calculateDuration = (start, end) => {
    const diffTime = end - start;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setDuration(days);
  };

  const handleLeaveDateChange = (e) => {
    const newLeaveDate = new Date(e.target.value);
    setLeaveDate(e.target.value);
    calculateDuration(newLeaveDate, new Date(returningDate));
  };

  const handleReturningDateChange = (e) => {
    const newReturningDate = new Date(e.target.value);
    setReturningDate(e.target.value);
    calculateDuration(new Date(leaveDate), newReturningDate);
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
      closeModal();
      // Refresh data after update
      const response = await axiosInstance.get('/timeoffs/my');
      setTimeOffData(response.data.data.items);
    } catch (err) {
      console.error('Error updating time off:', err);
      setError('Failed to update time off');
    }
  };

  const values = timeOffData.map((item, index) => [
    <LabelWithIcon
      key={index}
      icon={
        item.type === 'Vacation' ? (
          <UmbrellaIcon classNames="w-4 text-white" />
        ) : (
          <SickPersonIcon classNames="w-4 text-white" />
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
    // item.status === 'Denied' ? (
    //   <FaEdit
    //     key={`edit-${index}`}
    //     className="text-dark-navy w-5 cursor-pointer justify-end flex ml-52"
    //     onClick={() => handleEditClick(item)}
    //     title="Edit time-off request"
    //   />
    // ) : (
    //   <span
    //     className="text-gray-400"
    //     title="Cannot edit confirmed requests"
    //   ></span>
    // ),
  ]);

  return (
    <div className="p-1 rounded-md h-full">
      <div className="flex flex-col md:flex-row gap-6">
        <VacationsCard totalDays={totalDays} />
        <SickCard totalDays={totalDays} />
      </div>

      <div className="bg-white mt-5 border border-gray-border rounded-[10px] p-3 md:p-5 w-full ">
        <FormHeading
          classNames="mb-[2rem]"
          icon={<UmbrellaIcon classNames="w-4 text-dark-navy" />}
          text="Upcoming Time Off"
        />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
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
      <div className="bg-white mt-5 border border-gray-border rounded-[10px] p-3 md:p-5 w-full">
        <FormHeading
          classNames="mb-5"
          icon={<ClockRotateIcon classNames="w-4" />}
          text="Time Off History"
        />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <InfoGrid
            headers={['Type', 'Date From', 'Date To', 'Approved By']}
            values={timeOffData.map((item, index) => [
              item.type,
              new Date(item.leaveDay).toLocaleDateString(),
              new Date(item.returningDay).toLocaleDateString(),
              `${item.employee.firstName || 'N/A'} ${
                item.employee.lastName || 'N/A'
              }`.trim(),
            ])}
          />
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="p-6 w-full sm:w-[600px]">
            <div className="flex flex-row items-center gap-2">
              {selectedTimeOff?.type?.toLowerCase() === 'vacation' ? (
                <Image src="/vaction.png" alt="img" width={40} height={40} />
              ) : (
                <Image src="/sickleave.png" alt="img" width={40} height={40} />
              )}
              <h2 className="text-2xl font-semibold">
                Edit Request {selectedTimeOff?.type}
              </h2>
            </div>

            <div className="flex flex-row items-center gap-4 w-full mt-8">
              <label className="flex flex-col w-full">
                <span className="text-gray-400 text-[12px]">Leaving Date</span>
                <input
                  type="date"
                  value={leaveDate}
                  onChange={handleLeaveDateChange}
                  className="p-3 border rounded w-full"
                />
              </label>
              <label className="flex flex-col w-full">
                <span className="text-gray-400 text-[12px]">
                  Returning Date
                </span>
                <input
                  type="date"
                  value={returningDate}
                  onChange={handleReturningDateChange}
                  className="p-3 border rounded w-full"
                />
              </label>
            </div>

            <p className="text-[13px] text-gray-600 mt-3">
              This {selectedTimeOff?.type?.toLowerCase()} is{' '}
              {selectedTimeOff?.status}. Changing the dates will require
              reapproval.
            </p>
            <div className="h-[1px] w-full bg-gray-200 mt-8" />

            <div className="flex flex-row gap-4 items-center mt-4">
              <p className="text-[14px]">Duration of Leave</p>
              <div className="text-[14px] border rounded p-3 px-12">
                {/* Show the calculated duration */}
                {duration} days
              </div>
            </div>

            <div className="flex flex-row p-8 px-4 w-full gap-4 mt-24">
              <button
                type="button"
                onClick={handleUpdateTimeOff}
                className="px-4 py-3 bg-dark-navy text-white rounded w-full"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="px-4 py-3 border rounded w-full"
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
