'use client';

import { useState, useEffect } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { MdCalendarToday } from 'react-icons/md';
import { PiUmbrellaBold } from 'react-icons/pi';
import { RxCross1 } from 'react-icons/rx';
import Button from '../Button';
import UserImgPlaceholder from './UserImgPlaceholder';
import axiosInstance from '@/lib/axios';



interface LeaveData {
  id: number;
  employeeId: number;
  leaveDay: string;
  returningDay: string;
  leaveType: string;
  duration: number;
  status: string;
}

const UserLeaveInfo = () => {
  const [leaveData, setLeaveData] = useState<LeaveData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axiosInstance.get(`/timeoffs`);
        console.log('API Response:', response.data); 

        const allLeaves = response.data.data.items; 

        console.log('All Leaves:', allLeaves); 

        if (allLeaves.length > 0) {
          setLeaveData(allLeaves);
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

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  console.log('Leave Data state:', leaveData);

  return (
    <div>
      {leaveData.length > 0 ? (
        <table className="w-full divide-y-[1px] divide-[#E8E8E8]">
         
          <tbody>
            {leaveData.map((leave) => (
              <tr key={leave.id} className="[&_td:p-1] pt-4 border-b flex flex-col w-full">
                <div className='flex flex-row w-full '>
                <td className="p-1 pt-4">
                  <UserImgPlaceholder name={`Employee #${leave.employeeId}`} />
                </td>
                <td className='mt-4'>{leave.employeeId}</td>
                <td className="flex flex-row p-1 pt-4 items-end justify-end w-full">
                  <Button
                    name="Confirm Request"
                    bg="#00B87D"
                    textColor="white"
                    icon={<IoCheckmark />}
                  />
                  <Button
                    name="Deny"
                    bg="#F53649"
                    textColor="white"
                    icon={<RxCross1 />}
                  />
                </td>
                </div>
                <div className='w-full flx gap-3 items-center mt-4'>
                <td className="text-sm p-1 pb-4">
                  <div className="flex gap-1 items-center">
                    <PiUmbrellaBold className="opacity-50" size={14} />
                    {leave.leaveType}
                  </div>
                </td>
                <td className="text-sm p-1 pb-4">
                  <div className="flex gap-1 items-center">
                    <MdCalendarToday className="opacity-50" size={14} />
                    {`${leave.duration} days`}
                  </div>
                </td>
                <td className="text-sm p-1 pb-4">
                  <div className="flex gap-1 items-center">
                    <LuLogOut className="opacity-50" size={14} />
                    {new Date(leave.leaveDay).toLocaleDateString()}
                  </div>
                </td>
                <td className="text-sm p-1 pb-4">
                  <div className="flex gap-1 items-center">
                    <LuLogIn className="opacity-50" size={14} />
                    {new Date(leave.returningDay).toLocaleDateString()}
                  </div>
                </td>
                </div>
                </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-4 text-center">No leave records available.</div>
      )}
    </div>
  );
};

export default UserLeaveInfo;
