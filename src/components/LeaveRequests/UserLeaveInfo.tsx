import { useState, useEffect } from 'react';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { MdCalendarToday } from 'react-icons/md';
import { PiUmbrellaBold } from 'react-icons/pi';
import UserImgPlaceholder from './UserImgPlaceholder';
import axiosInstance from '@/lib/axios';
import ConfirmLeave from '@/app/hr/leave-requests/components/confirmleave';
import Deny from '@/app/hr/leave-requests/components/deny';
import Modal from '../modal/Modal';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

interface LeaveData {
  id: number;
  employeeId: number;
  leaveDay: string;
  returningDay: string;
  leaveType: string;
  duration: number;
  status: string;
  employee: {
    firstName: string;
    middleName?: string | null;
    lastName: string;
  };
}

const UserLeaveInfo = () => {
  const [leaveData, setLeaveData] = useState<LeaveData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeave, setSelectedLeave] = useState<LeaveData | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axiosInstance.get(`/timeoffs`);
        console.log('API Response:', response.data);

        const allLeaves = response.data.data.items;

        if (allLeaves.length > 0) {
          // Sort the leaves by leave day (most recent first)
          const sortedLeaves = allLeaves.sort((a: LeaveData, b: LeaveData) => 
            new Date(b.leaveDay).getTime() - new Date(a.leaveDay).getTime()
          );

          // Only take the latest 4 leave requests
          setLeaveData(sortedLeaves.slice(0, 4));
        } else {
          setError('No leave data found.');
        }
      } catch (err) {
        console.error('Failed to fetch leave data:', err);
        setError('Failed to load leave data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, []);

  const handleConfirmRequest = (leave: LeaveData) => {
    setSelectedLeave(leave);
    setIsConfirmModalOpen(true);
  };

  const handleDenyRequest = (leave: LeaveData) => {
    setSelectedLeave(leave);
    setIsDenyModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedLeave(null);
  };

  const handleCloseDenyModal = () => {
    setIsDenyModalOpen(false);
    setSelectedLeave(null);
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      {leaveData.length > 0 ? (
        <table className="w-full divide-y-[1px] divide-[#E8E8E8]">
          <tbody>
            {leaveData.map((leave) => (
              <tr key={leave.id} className="border-b w-full">
                <div className='flex flex-col w-full'>
                  <div className='flex flex-row w-full'>
                    <td className="p-4 w-full">
                      <div className="flex items-center gap-4">
                        <UserImgPlaceholder name={`Employee #${leave.employeeId}`} />
                        <p className="text-left">
                          {leave ? `${leave.employee.firstName} ${leave.employee.middleName || ''} ${leave.employee.lastName || ''}` : ''}
                        </p>
                      </div>
                    </td>
                    <div className='flex w-full items-center justify-end'>
                      <td className="p-4 flex justify-center items-center gap-2">
                        {leave.status === 'Pending' ? (
                          <>
                            <button
                              className="p-2 text-white bg-[#25A244] rounded text-[10px] flex items-center gap-2"
                              onClick={() => handleConfirmRequest(leave)}
                            >
                              Confirm Request <FaCheck />
                            </button>
                            <button
                              className="p-2 text-white bg-[#F53649] rounded text-[10px] flex items-center gap-2"
                              onClick={() => handleDenyRequest(leave)}
                            >
                              Deny <FaTimes />
                            </button>
                          </>
                        ) : (
                          <span
                            className={`font-semibold ${
                              leave.status === 'Confirmed' ? 'text-green-600 border rounded p-2 px-4 border-green-600' : 'text-red-600 border rounded p-2 px-7 border-red-600'
                            }`}
                          >
                            {leave.status}
                          </span>
                        )}
                      </td>
                    </div>
                  </div>
                  <div className='flex flex-row items-center gap-4'>
                    <td className="p-4">
                      <div className="flex gap-1 items-center">
                        <PiUmbrellaBold className="opacity-50" size={14} />
                        {leave.leaveType}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1 items-center">
                        <MdCalendarToday className="opacity-50" size={14} />
                        {`${leave.duration} days`}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1 items-center">
                        <LuLogOut className="opacity-50" size={14} />
                        {new Date(leave.leaveDay).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1 items-center">
                        <LuLogIn className="opacity-50" size={14} />
                        {new Date(leave.returningDay).toLocaleDateString()}
                      </div>
                    </td>
                  </div>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-4 text-center">No leave records available.</div>
      )}

      {isConfirmModalOpen && selectedLeave && (
        <Modal onClose={handleCloseConfirmModal}>
          <ConfirmLeave
            timeOffRequestId={selectedLeave.id}
            onClose={handleCloseConfirmModal}
          />
        </Modal>
      )}

      {isDenyModalOpen && selectedLeave && (
        <Modal onClose={handleCloseDenyModal}>
          <Deny
            timeOffRequestId={selectedLeave.id}
            onClose={handleCloseDenyModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserLeaveInfo;
