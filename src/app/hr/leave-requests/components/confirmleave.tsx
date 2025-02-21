'use client';
import { FaCheck } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';

const ConfirmLeave = ({ timeOffRequestId, onConfirm, onClose }) => {
  const [timeOffRequest, setTimeOffRequest] = useState<any | null>(null);
  const [note, setNote] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (timeOffRequestId) {
      const fetchTimeOffRequest = async () => {
        try {
          const response = await axiosInstance.get(
            `/timeoff/${timeOffRequestId}`
          );
          console.log('Time Off Request:', response.data);
          setTimeOffRequest(response.data.data);
        } catch (error) {
          console.error('Failed to fetch time off request:', error);
          setError('Failed to load time off request. Please try again later.');
        }
      };
      fetchTimeOffRequest();
    }
  }, [timeOffRequestId]);

  const handleConfirmRequest = async () => {
    if (timeOffRequest) {
      try {
        console.log('Confirming request with ID:', timeOffRequest.id);
        await axiosInstance.put(`/timeoff/${timeOffRequest.id}/confirm`, {
          employeeId: timeOffRequest.employeeId,
          status: 'Confirmed',
          note,
        });
        onClose();
        onConfirm();
      } catch (error) {
        console.error('Error confirming leave request:', error);
        if (isAxiosError(error) && error.response) {
          setError(
            error.response.data.message ||
              'Failed to confirm leave request. Please try again later.'
          );
        } else {
          setError('Failed to confirm leave request. Please try again later.');
        }
      }
    } else {
      console.error(
        'Time off request details are not available for confirmation'
      );
      setError('Leave request details are missing.');
    }
  };

  return (
    <div className="w-full max-w-[600px] bg-white p-6 rounded-lg">
      <h1 className="font-semibold text-[22px]">Leave Request</h1>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {/* Time-Off Request Details */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <label className="w-full">
          <span className="mb-2 text-gray-400 text-[12px]">Employee Name</span>
          <div className="w-full p-3 text-[14px] rounded border border-gray-300 text-gray-600">
            {timeOffRequest
              ? `${timeOffRequest.employee.firstName} ${
                  timeOffRequest.employee.middleName || ''
                } ${timeOffRequest.employee.lastName || ''}`
              : 'Loading...'}
          </div>
        </label>

        <label className="w-full">
          <span className="mb-2 text-gray-400 text-[12px]">Leave Duration</span>
          <div className="w-full p-3 text-[14px] rounded border border-gray-300 text-gray-600">
            {timeOffRequest
              ? `${timeOffRequest.duration} Days (${new Date(
                  timeOffRequest.leaveDay
                ).toLocaleDateString()} - ${new Date(
                  timeOffRequest.returningDay
                ).toLocaleDateString()})`
              : 'Loading...'}
          </div>
        </label>
        <label className="w-full flex flex-col col-span-full">
          <span className="mb-1 text-gray-400 text-[12px]">Note</span>
          <textarea
            className="w-full p-4 rounded border border-gray-300 text-black resize-none"
            rows={5}
            value={timeOffRequest?.note || 'No note provided'}
            readOnly={true}
          />
        </label>
      </div>

      {/* Note */}

      {/* Action Buttons */}
      <div className="flex flex-row items-center gap-5 w-full mt-24 px-8">
        <button
          type="button"
          className="p-4 text-center text-white bg-[#25A244] rounded text-[14px] flex items-center justify-center gap-2 w-full hover:bg-green-700"
          onClick={handleConfirmRequest}
        >
          Confirm Request <FaCheck />
        </button>

        <button
          type="button"
          className="p-4 text-center text-black border border-gray-300 rounded text-[14px] w-full hover:bg-gray-100"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmLeave;
