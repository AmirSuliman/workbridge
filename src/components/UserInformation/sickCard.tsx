'use client';
import Modal from '@/components/modal/Modal';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { isAxiosError } from 'axios';
import imageLoader from '../../../imageLoader';
interface SickCardProps {
  onButtonClick?: () => void;
  totalDays: number;
}

const SickCard = ({ onButtonClick, totalDays }: SickCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [vacationDaysUsed, setVacationDaysUsed] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const calculateDuration = useCallback(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        return 0;
      }

      let count = 0;
      const current = new Date(start);

      // Loop through each day and only count weekdays
      while (current <= end) {
        // getDay() returns 0 for Sunday and 6 for Saturday
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          count++;
        }

        // Move to the next day
        current.setDate(current.getDate() + 1);
      }
      return count > 0 ? count : 0;
    }
    return 0;
  }, [endDate, startDate]);

  useEffect(() => {
    const duration = calculateDuration();
    setVacationDaysUsed(duration);
  }, [startDate, endDate, calculateDuration]);

  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
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
        setStartDate(null);
        setEndDate(null);
        setNote('');
      }
    } catch (error) {
      console.error('Error:', error);
      if (isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message?.conflict ||
            error.response.data.message ||
            'Unknown error occurred'
        );
      } else {
        toast.error('Unknown error occurred');
      }
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

  return (
    <>
      <div className="flex items-center justify-between border border-gray-border rounded-[10px] bg-white p-3 md:p-6 md:gap-[3.3rem] w-full">
        <div className="flex flex-col justify-between gap-[2rem] h-full">
          <div>
            <div className="flex gap-2 items-center mb-2">
              <div className="flex items-center justify-center rounded-full p-1">
                <Image
                  loader={imageLoader}
                  src="/sickleave.png"
                  alt="img"
                  width={25}
                  height={25}
                />
              </div>
              <h3 className="text-dark-navy font-[500] text-sm">
                Request Sick Leave
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={handleButtonClick}
            className={`text-white bg-dark-navy py-2 w-[15rem] rounded-[4px] font-[400] text-sm ${
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
              <Image
                loader={imageLoader}
                src="/sickleave.png"
                alt="img"
                width={40}
                height={40}
              />
              <h2 className="text-2xl font-semibold">Request Sick Leave</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-8">
              <label className="flex flex-col w-full">
                <span className="text-gray-400 text-[12px]">Leaving Date</span>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  maxDate={addDays(new Date(), totalDays - 1)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  className="p-3 border rounded w-full"
                />
              </label>
              <label className="flex flex-col w-full">
                <span className="text-gray-400 text-[12px]">
                  Returning Date
                </span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || new Date()}
                  maxDate={addDays(new Date(), totalDays - 1)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="dd/mm/yyyy"
                  className="p-3 border rounded w-full"
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
