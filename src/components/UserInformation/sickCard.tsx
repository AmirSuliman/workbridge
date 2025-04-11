'use client';
import Modal from '@/components/modal/Modal';
import axiosInstance from '@/lib/axios';
import { EmployeeData } from '@/types/employee';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import imageLoader from '../../../imageLoader';
import RequestCard from './RequestCard';
import SickLeaveAttachments, { uploadFiles } from './SickLeaveAttachments';

interface SickCardProps {
  onButtonClick?: () => void;
  employeeData: EmployeeData;
}

interface HolidaysErrorsProps {
  id: number;
  date: string;
  title: string;
}

const SickCard = ({ onButtonClick, employeeData }: SickCardProps) => {
  const totalDays = employeeData?.sickLeaveCounter;
  const totalDaysUsed = employeeData?.sickDaysUsed;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [vacationDaysUsed, setVacationDaysUsed] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [holidaysErrors, setHolidaysErrors] = useState<HolidaysErrorsProps[]>(
    []
  );

  const calculateDuration = useCallback(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        return 0;
      }

      let count = 0;
      let current = new Date(start);

      // Loop through each day and only count weekdays
      while (current < end) {
        // Change "<=" to "<" to exclude endDate
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          count++;
        }
        current.setDate(current.getDate() + 1);
      }

      return count > 0 ? count : 0;
    }
    return 0;
  }, [startDate, endDate]);

  const calculateReturningDate = (
    start: Date | null,
    days: number,
    totalDays: number
  ) => {
    if (!start || days <= 0 || totalDays <= 0) return null;

    let count = 0;
    let current = new Date(start);

    while (count < days && count < totalDays) {
      current.setDate(current.getDate() + 1);
      const dayOfWeek = current.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
    }

    return current;
  };

  useEffect(() => {
    if (startDate) {
      setVacationDaysUsed(calculateDuration());
    }
  }, [startDate, endDate, calculateDuration]);

  useEffect(() => {
    if (startDate && !endDate) {
      // Only auto-calculate if endDate hasn't been set by the user
      const newEndDate = calculateReturningDate(
        startDate,
        vacationDaysUsed,
        totalDays
      );
      setEndDate(newEndDate);
    }
  }, [startDate, vacationDaysUsed, totalDays, endDate]);

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
      toast.error('Please select valid dates.');
      return;
    }

    let fileIds: string[] = [];
    if (selectedFiles.length > 0) {
      toast.loading('Uploading attachments...');
      fileIds = await uploadFiles(selectedFiles);
      toast.dismiss();

      if (fileIds.length !== selectedFiles.length) {
        toast.error(
          `Only ${fileIds.length} out of ${selectedFiles.length} files were uploaded successfully.`
        );
        // You can decide whether to continue or abort here
      }
    }
    const payload = {
      leaveDay: formatDate(startDate),
      returningDay: formatDate(endDate),
      duration: duration,
      type: 'Sick',
      fileIds,
      note: note,
    };

    try {
      setLoading(true);
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

        // Check for holidays errors
        if (error.response.data.message?.holidays) {
          setHolidaysErrors(error.response.data.message?.holidays);
          console.log(
            'holidays errors: ',
            error.response.data.message?.holidays
          );
        }
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
      <RequestCard
        type='sick'
        totalDays={totalDays}
        totalDaysUsed={totalDaysUsed}
        onClick={handleButtonClick}
        imageSrc='/sickleave.png'
        imageAlt='Sick leave'
      />

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setStartDate(null);
            setEndDate(null);
          }}
        >
          <div className='p-6 w-full sm:w-[600px]'>
            <div className='flex flex-row items-center gap-2'>
              <Image
                loader={imageLoader}
                src='/sickleave.png'
                alt='img'
                width={40}
                height={40}
              />
              <h2 className='text-2xl font-semibold'>Request Sick Leave</h2>
            </div>
            {/* if holidays errors exist then show it as a list */}
            {holidaysErrors.length > 0 && (
              <section className='my-4 rounded border-2 border-red-500 p-3 relative'>
                <button
                  type='button'
                  className='absolute -top-2 -right-2 font-medium text-lg border-[1px] border-black bg-white flex items-center justify-center grow-0 shrink-0 rounded-full p-1 size-[20px]'
                  onClick={() => {
                    setHolidaysErrors([]);
                    setStartDate(null);
                    setEndDate(null);
                  }}
                >
                  x
                </button>
                <h1 className='font-medium text-lg mb-2'>
                  Following are the holidays, you cannot make a leave request on
                  these days.
                </h1>
                {holidaysErrors.map((holidayError, index) => (
                  <ul key={index} className='space-y-2 list-disc ml-4'>
                    <li>
                      {holidayError.title} (
                      {new Date(holidayError.date).toLocaleDateString()})
                    </li>
                  </ul>
                ))}
              </section>
            )}
            <div className='grid grid-cols-2 gap-4 w-full mt-8'>
              <label className='flex flex-col w-full'>
                <span className='text-gray-400 text-[12px]'>Leaving Date</span>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setEndDate(null);
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  dateFormat='MM/dd/yyyy'
                  placeholderText='mm/dd/yyyy'
                  className='p-3 border rounded w-full'
                  filterDate={(date) => {
                    const day = date.getDay();
                    return day !== 0 && day !== 6;
                  }}
                />
              </label>

              <label className='flex flex-col w-full'>
                <span className='text-gray-400 text-[12px]'>
                  Returning Date
                </span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || undefined}
                  maxDate={
                    startDate
                      ? calculateReturningDate(
                          startDate,
                          totalDays,
                          totalDays
                        ) || undefined
                      : undefined
                  }
                  dateFormat='MM/dd/yyyy'
                  placeholderText='mm/dd/yyyy'
                  className='p-3 border rounded w-full'
                  disabled={!startDate}
                  filterDate={(date) => {
                    const day = date.getDay();
                    return day !== 0 && day !== 6;
                  }}
                />
              </label>
              <label className='flex flex-col w-full col-span-full'>
                <span className='text-gray-400 text-[12px]'>Note</span>
                <textarea
                  placeholder='Add a message (optional)'
                  name='note'
                  rows={5}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className='p-3 border rounded w-full'
                ></textarea>
              </label>
            </div>

            <div className='h-[1px] w-full bg-gray-200 mt-8' />

            {/* Display the vacation duration */}

            <div className='flex flex-row gap-4 items-center mt-4'>
              <p className='text-[14px]'>Sick days requested:</p>
              <div className='text-[14px] border rounded p-3 px-12 ml-auto mr-0'>
                {vacationDaysUsed} days
              </div>
            </div>
            <div className='flex flex-row gap-4 items-center mt-4 '>
              <p className='text-[14px]'>Total Sick days remaining:</p>
              <div className='text-[14px] border rounded p-3 px-12 ml-auto mr-0'>
                {totalDays} days
              </div>
            </div>
            <br />
            <SickLeaveAttachments
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />

            <div className='flex flex-row  px-6 w-full gap-4 mt-16'>
              <button
                type='button'
                onClick={handleRequestVacation}
                className='mt-4 px-4 py-3 bg-dark-navy text-white rounded w-full'
                disabled={loading}
              >
                {loading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <BiLoaderCircle className='h-5 w-5 animate-spin' />
                  </span>
                ) : (
                  'Request Sick Leave'
                )}
              </button>
              <button
                disabled={loading}
                type='button'
                onClick={() => setIsModalOpen(false)}
                className='mt-4 px-4 py-3 border rounded w-full'
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
