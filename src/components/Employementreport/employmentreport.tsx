import { PiArrowUpRightThin } from 'react-icons/pi';
import MonthlyBarChart from './barchart';
import { FiUsers } from 'react-icons/fi';
import Button from '../Button';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';

interface FiltersProp {
  gender?: string;
  age?: string;
  employmentType?: string;
  experience?: string;
}

interface Report {
  month: string;
  year: number;
  count: number;
}

interface ChartDataItem {
  month: string;
  [key: number]: number;
}

const EmployeeReport: React.FC = () => {
  const [filter, setFilter] = useState<string>('');
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const [reports, setReports] = useState<Report[]>([]);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [years, setYears] = useState<number[]>([]);

  const getReports = useCallback(async () => {
    try {
      const params: FiltersProp = {};

      // Only add params if filter is selected
      if (filter) {
        if (filter.startsWith('Male') || filter.startsWith('Female')) {
          params.gender = filter;
        } else if (
          filter.startsWith('Under30') ||
          filter.startsWith('Above30')
        ) {
          params.age = filter;
        } else if (filter.startsWith('Under5') || filter.startsWith('Above5')) {
          params.experience = filter;
        } else if (
          filter.startsWith('Fulltime') ||
          filter.startsWith('Part Time') ||
          filter.startsWith('Freelance')
        ) {
          params.employmentType = filter;
        }
      }

      const response = await axiosInstance.get('/employees/report', { params });
      const newReports = response.data.data;
      setReports(newReports);

      // Calculate total employees from new data, not from existing state
      const total = newReports.reduce(
        (sum: number, item: Report) => sum + item.count,
        0
      );
      setTotalEmployees(total);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  }, [filter]);

  // Fetch data initially and when filter changes
  useEffect(() => {
    getReports();
  }, [getReports]);

  // Process chart data when reports change
  useEffect(() => {
    if (reports.length > 0) {
      const monthMap = new Map<string, ChartDataItem>();
      const uniqueYears = new Set<number>();

      reports.forEach((report) => {
        const monthKey = report.month
          .split(' ')[0]
          .substring(0, 3)
          .toUpperCase();

        if (!monthMap.has(monthKey)) {
          monthMap.set(monthKey, { month: monthKey });
        }

        const monthData = monthMap.get(monthKey)!;
        monthData[report.year] = report.count;
        uniqueYears.add(report.year);
      });

      setChartData(Array.from(monthMap.values()));
      setYears(Array.from(uniqueYears).sort());
    }
  }, [reports]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4">
      <div className="flex flex-row items-center justify-between w-full p-4">
        <div className="flex flex-row items-center gap-2">
          <img src="/Vector (Stroke).png" alt="img" />
          <h1 className="font-medium text-[18px] text-[#0F172A]">
            Employee Report
          </h1>
        </div>
        <Link href="/hr/evaluation-&-reports">
          <Button
            name="See All"
            icon={<PiArrowUpRightThin size={18} />}
            bg="transparent"
            textColor="black"
            className="!text-[10px]"
          />
        </Link>
      </div>

      <div className="flex flex-row items-center justify-between w-full p-4">
        <div className="flex flex-row items-center gap-2">
          <FiUsers />
          <p className="text-[#0F172A] text-[14px]">
            {totalEmployees} total employees
          </p>
        </div>
        <label className="flex flex-row gap-2 items-center">
          <p className="text-[#0F172A] text-[12px]">Filter</p>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 text-[#0F172A] text-[12px] border w-[120px] border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">All Employees</option>
            <optgroup label="Gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </optgroup>
            <optgroup label="Age">
              <option value="Under30">Under 30 years</option>
              <option value="Above30">Above 30 years</option>
            </optgroup>
            <optgroup label="Experience">
              <option value="Under5">Under 5 years</option>
              <option value="Above5">Above 5 years</option>
            </optgroup>
            <optgroup label="Employment Type">
              <option value="Fulltime">Fulltime</option>
              <option value="Part Time">Part Time</option>
              <option value="Freelance">Freelance</option>
            </optgroup>
          </select>
        </label>
      </div>
      <MonthlyBarChart years={years} chartData={chartData} />
    </section>
  );
};

export default EmployeeReport;
