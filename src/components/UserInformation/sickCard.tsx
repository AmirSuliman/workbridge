'use client';
import Modal from '@/components/modal/Modal';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface SickCardProps {
  onButtonClick?: () => void;
  totalDays: number;
}

const SickCard = ({ onButtonClick, totalDays }: SickCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [vacationDaysUsed, setVacationDaysUsed] = useState(0);

  const calculateDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        return 0;
      }
      const duration =
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
        1;
      return duration > 0 ? duration : 0;
    }
    return 0;
  };

  useEffect(() => {
    const duration = calculateDuration();
    setVacationDaysUsed(duration);
  }, [startDate, endDate]);

  const formatDate = (date: string) => {
    return `${date} 00:00:00`;
  };

  const handleRequestVacation = async () => {
    const duration = calculateDuration();
    if (!startDate || !endDate || duration <= 0) {
      alert('Please select valid dates.');
      return;
    }

    const payload = {
      leaveDay: formatDate(startDate),
      returningDay: formatDate(endDate),
      duration: duration,
      type: 'Sick',
      note: note,
    };

    try {
      setLoading(true);
      console.log('Payload:', payload);

      const response = await axiosInstance.post('/timeoff', payload);
      if (response.status === 200) {
        toast.success('Request timeoff made successfuly!');
        setIsModalOpen(false);
        setStartDate('');
        setEndDate('');
        setEndDate('');
        setNote('');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    setIsModalOpen(true);
  };

 
  
  const getMaxDate = (start: string, days: number) => {
    if (!start) return '';
    const startDateObj = new Date(start);
    startDateObj.setDate(startDateObj.getDate() + days - 1);
    return startDateObj.toISOString().split('T')[0];
  };

  return (
    <>
      <div className="flex items-center justify-between border border-gray-border rounded-[10px] bg-white p-3 md:p-6 md:gap-[3.3rem] w-full">
        <div className="flex flex-col justify-between gap-[2rem] h-full">
          <div>
            <div className="flex gap-2 items-center mb-2">
              <div className="flex items-center justify-center rounded-full p-1">
                <Image src="/sickleave.png" alt="img" width={25} height={25} />
              </div>
              <h3 className="text-dark-navy font-[500] text-sm">
                Request Sick Leave
              </h3>
            </div>
          </div>
          <button
  type="button"
  onClick={handleButtonClick}
  className={`text-white bg-dark-navy py-1 w-[13rem] rounded-[4px] font-[200] text-sm ${
    totalDays === 0 ? 'opacity-50 cursor-not-allowed' : ''
  }`}
  disabled={totalDays === 0}
>
  Request Sick leave
</button>
        </div>

        <div className="flex flex-col border border-gray-border items-center justify-center rounded-[7px] h-full px-4">
          <span className="text-lg text-dark-navy font-[400]">
            {totalDays ?? 0}
          </span>
          <span className="text-xs text-dark-navy">days left</span>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-6 w-full sm:w-[600px]">
            <div className="flex flex-row items-center gap-2">
              <Image src="/sickleave.png" alt="img" width={40} height={40} />
              <h2 className="text-2xl font-semibold">Request Sick Leave</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-8">
              <label className="flex flex-col w-full">
                <span className="text-gray-400 text-[12px]">Leaving Date</span>
                <input
                   type="date"
                   className="p-3 border rounded w-full"
                   min={new Date().toISOString().split('T')[0]}
                   max={getMaxDate(new Date().toISOString().split('T')[0], totalDays)}
                   value={startDate}
                   onChange={(e) => setStartDate(e.target.value)}
                 />
              </label>
              <label className="flex flex-col w-full">
                <span className="text-gray-400 text-[12px]">
                  Returning Date
                </span>
                <input
                  type="date"
                  className="p-3 border rounded w-full"
                  min={startDate}
                  max={getMaxDate(startDate, totalDays)}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
              <label className="flex flex-col w-full col-span-full">
                <span className="text-gray-400 text-[12px]">Note</span>
                <textarea
                  placeholder="Add a message (optional)"
                  name="note"
                  rows={5}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="p-3 border rounded w-full"
                ></textarea>
              </label>
            </div>

            <div className="h-[1px] w-full bg-gray-200 mt-8" />

            {/* Display the vacation duration */}
            <div className="flex flex-row gap-4 items-center mt-4">
              <p className="text-[14px]">Vacation days left</p>
              <div className="text-[14px] border rounded p-3 px-12">
                {vacationDaysUsed} days
              </div>
            </div>

            <div className="flex flex-row  px-6 w-full gap-4 mt-16">
              <button
                onClick={handleRequestVacation}
                className="mt-4 px-4 py-3 bg-dark-navy text-white rounded w-full"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Request Sick Leave'}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 px-4 py-3 border rounded w-full"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SickCard;
