'use client';
import { useState, useEffect } from 'react';
import { PiUmbrellaLight } from 'react-icons/pi';
import LeaveAndVacationCard from '../LeaveAndVacationCard/LeaveAndVacationCard';
import { MdOutlineSick } from 'react-icons/md';
import axios from 'axios';
import axiosInstance from '@/lib/axios';

interface Timeoff {
  id: string;
  employeeName: string;
  startDate: string | null;
  endDate: string | null;
}

const WhosOut = () => {
  const [timeoffs, setTimeoffs] = useState<Timeoff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeoffs = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get('/timeoffs');
        console.log(response.data, 'API Response');

        const fetchedTimeoffs = Array.isArray(response.data?.data?.items)
          ? response.data.data.items
          : [];

        console.log(fetchedTimeoffs, 'Fetched Timeoffs');

        const formattedTimeoffs = fetchedTimeoffs.map((item) => {
          const employee = item.employee;
          return {
            id: item.id || 'Unknown ID',
            employeeName: employee
              ? `${employee.firstName || 'Unknown'} ${employee.lastName || ''}`.trim()
              : 'Unknown',
            startDate: item.leaveDay || null,
            endDate: item.returningDay || null,
          };
        });

        console.log(formattedTimeoffs, 'Formatted Timeoffs');
        setTimeoffs(formattedTimeoffs);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(err.response || err, 'API Error');
          setError(err.response?.data?.message || 'Failed to fetch timeoffs');
        } else {
          console.error(err, 'Non-axios error occurred');
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTimeoffs();
  }, []);

  const formatDate = (dateString: string | null): Date | null => {
    if (!dateString) return null;
    return new Date(dateString);
  };

  const today = new Date();
  const startOfNextWeek = new Date(today);
  startOfNextWeek.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7)); // Next Monday
  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 6); // Following Sunday

  const todayTimeoffs = timeoffs.filter((timeoff) => {
    const startDate = formatDate(timeoff.startDate);
    const endDate = formatDate(timeoff.endDate);
    return startDate && endDate && startDate <= today && endDate >= today;
  });

  const upcomingWeekTimeoffs = timeoffs.filter((timeoff) => {
    const startDate = formatDate(timeoff.startDate);
    return startDate && startDate >= startOfNextWeek && startDate <= endOfNextWeek;
  });

  return (
    <section className="h-fit bg-white rounded-xl border-[1px] border-[#E0E0E0]">
      <div className="flex gap-4 flex-wrap lg:flex-nowrap p-4">
        <LeaveAndVacationCard
          title="Vacation"
          bgColor="#25A244"
          icon={<PiUmbrellaLight />}
          description="Requests need to be made at least 48 hours prior."
          daysNum="32"
          name="Request Vacation"
        />
        <LeaveAndVacationCard
          title="Sick leave"
          bgColor="#F53649"
          icon={<MdOutlineSick />}
          description=""
          daysNum="11"
          name="Request Sick Leave"
        />
      </div>
      <hr className="my-4" />
      <h2 className="font-medium text-lg px-4">Who’s Out</h2>
      <h6 className="text-sm opacity-50 my-1 px-4">
        Today ({todayTimeoffs.length})
      </h6>
      <div className="border-[0.5px] border-[#E8E8E8] bg-[#F5F6FA] rounded m-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">Employee</th>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">Leaving</th>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">Returning</th>
            </tr>
          </thead>
          <tbody>
            {todayTimeoffs.map((timeoff) => (
              <tr key={timeoff.id} className="border-b-[1px] border-[#E8E8E8] text-sm">
                <td className="p-4">{timeoff.employeeName}</td>
                <td className="p-4">
                  {timeoff.startDate ? new Date(timeoff.startDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-4">
                  {timeoff.endDate ? new Date(timeoff.endDate).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h6 className="text-sm opacity-50 pt-4 mb-1 px-4">
        Upcoming Week ({upcomingWeekTimeoffs.length})
      </h6>
      <div className="border-[0.5px] border-[#E8E8E8] bg-[#F5F6FA] rounded m-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">Employee</th>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">Leaving</th>
              <th className="text-xs opacity-50 font-normal text-start px-4 pt-4">Returning</th>
            </tr>
          </thead>
          <tbody>
            {upcomingWeekTimeoffs.map((timeoff) => (
              <tr key={timeoff.id} className="border-b-[1px] border-[#E8E8E8] text-sm">
                <td className="p-4">{timeoff.employeeName}</td>
                <td className="p-4">
                  {timeoff.startDate ? new Date(timeoff.startDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-4">
                  {timeoff.endDate ? new Date(timeoff.endDate).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default WhosOut;
