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
  type: string;
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
        const allLeaves = response.data.data.items;

        if (allLeaves.length > 0) {
          // Sort the leaves by leave day (most recent first)
          const sortedLeaves = allLeaves.sort(
            (a: LeaveData, b: LeaveData) =>
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

  const handleConfirmRequest = (employee: LeaveData) => {
    setSelectedLeave(employee);
    setIsConfirmModalOpen(true);
  };

  const handleDenyRequest = (employee: LeaveData) => {
    setSelectedLeave(employee);
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

  // Callback to update the local state after confirmation
  const updateEmployeeStatus = (
    employeeId: number,
    newStatus: 'Confirmed' | 'Denied'
  ) => {
    setLeaveData((prevData) =>
      prevData.map((employee) =>
        employee.id === employeeId
          ? { ...employee, status: newStatus }
          : employee
      )
    );
  };

  if (loading) {
    return <div className='p-4'>Loading...</div>;
  }

  if (error) {
    return <div className=' text-red-500'>{error}</div>;
  }

  return (
    <>
      {leaveData.length > 0 ? (
        <section className='w-full divide-y-[1px] divide-[#E8E8E8] overflow-x-auto'>
          <div>
            {leaveData.map((leave) => (
              <div key={leave.id} className='border-b w-full'>
                <div className='flex justify-between items-center gap-4'>
                  <div className='p-4 flex gap-4 items-center'>
                    <UserImgPlaceholder
                      name={`${leave.employee?.firstName || ''} ${
                        leave.employee?.lastName || ''
                      }`}
                    />
                    <p className='text-left'>
                      {leave
                        ? `${leave.employee?.firstName || ''} ${
                            leave.employee?.middleName || ''
                          } ${leave.employee?.lastName || ''}`
                        : ''}
                    </p>
                  </div>
                  <div className='p-4 flex justify-center items-center gap-2'>
                    {leave.status === 'Pending' ? (
                      <>
                        <button
                          className='p-2 text-white bg-[#25A244] rounded text-[10px] flex items-center gap-2'
                          onClick={() => handleConfirmRequest(leave)}
                        >
                          Confirm Request <FaCheck />
                        </button>
                        <button
                          className='p-2 text-white bg-[#F53649] rounded text-[10px] flex items-center gap-2'
                          onClick={() => handleDenyRequest(leave)}
                        >
                          Deny <FaTimes />
                        </button>
                      </>
                    ) : (
                      <span
                        className={`text-[10px] ${
                          leave.status === 'Confirmed'
                            ? 'text-green-600 border rounded p-1 px-2 border-green-600'
                            : 'text-red-600 border rounded p-1 px-2 border-red-600'
                        }`}
                      >
                        {leave.status}
                      </span>
                    )}
                  </div>
                </div>
                <div className='flex justify-start gap-4 -mt-2 items-center'>
                  <div className='p-4'>
                    <p className='opacity-50 font-medium text-[8px]'>
                      Leave Type
                    </p>
                    <div className='flex items-center gap-2 justify-start'>
                      <PiUmbrellaBold className='opacity-50' size={14} />
                      <p className='text-[12px]'>{leave?.type}</p>
                    </div>
                  </div>
                  <div className='p-4'>
                    <p className='opacity-50 font-medium text-[8px]'>
                      Duration
                    </p>
                    <div className='flex items-center gap-2 justify-start'>
                      <MdCalendarToday className='opacity-50' size={14} />
                      <p className='text-[12px]'>{`${leave?.duration} days`}</p>
                    </div>
                  </div>
                  <div className='p-4 '>
                    <p className='opacity-50 font-medium text-[8px]'>
                      Leave Day
                    </p>
                    <div className='flex items-center gap-2 justify-start'>
                      <LuLogOut className='opacity-50' size={14} />
                      <p className='text-[12px]'>
                        {new Date(leave?.leaveDay).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className='p-4'>
                    <p className='opacity-50 font-medium text-[8px]'>
                      Returning Day
                    </p>
                    <div className='flex items-center gap-2 justify-start'>
                      <LuLogIn className='opacity-50' size={14} />
                      <p className='text-[12px]'>
                        {new Date(leave?.returningDay).toLocaleDateString(
                          'en-GB',
                          {
                            day: '2-digit',
                            month: 'short',
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className='p-4 text-center'>No leave records available.</div>
      )}

      {isConfirmModalOpen && selectedLeave && (
        <Modal onClose={handleCloseConfirmModal}>
          <ConfirmLeave
            timeOffRequestId={selectedLeave.id}
            onClose={handleCloseConfirmModal}
            onConfirm={() =>
              updateEmployeeStatus(selectedLeave.id, 'Confirmed')
            }
          />
        </Modal>
      )}

      {isDenyModalOpen && selectedLeave && (
        <Modal onClose={handleCloseDenyModal}>
          <Deny
            timeOffRequestId={selectedLeave.id}
            onClose={handleCloseDenyModal}
            onDeny={() => updateEmployeeStatus(selectedLeave.id, 'Denied')}
          />
        </Modal>
      )}
    </>
  );
};

export default UserLeaveInfo;
