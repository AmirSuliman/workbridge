import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { BiTrendingUp } from 'react-icons/bi';
import { FaDownload } from 'react-icons/fa';
import StackedBarChart from './charts/weeklychart';

interface WeeklyProps {
  count: number | null;
  onboarding: number | null;
  rejected: number | null;
  interviewed: number | null;
}

const prepareExcelData = (data: WeeklyProps | null) => {
  if (!data) return [];

  // Create data rows
  const rows = [
    {
      Metric: 'Total Applicants',
      Count: data.count || 0,
    },
    {
      Metric: 'Onboarding',
      Count: data.onboarding || 0,
    },
    {
      Metric: 'Rejected',
      Count: data.rejected || 0,
    },
    {
      Metric: 'Interviewed',
      Count: data.interviewed || 0,
    },
  ];

  // Calculate success rate
  const interviewRate = data.count
    ? (((data.interviewed || 0) / data.count) * 100).toFixed(2)
    : '0';
  const onboardingRate = data.count
    ? (((data.onboarding || 0) / data.count) * 100).toFixed(2)
    : '0';

  // Add rates
  rows.push(
    {
      Metric: 'Interview Rate (%)',
      Count: `${interviewRate}%`,
    },
    {
      Metric: 'Onboarding Rate (%)',
      Count: `${onboardingRate}%`,
    }
  );

  return rows;
};

const downloadExcel = (data: WeeklyProps | null, year: number) => {
  try {
    // Prepare the data
    const excelData = prepareExcelData(data);

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);

    // Add title rows
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [`Yearly Recruitment Report - ${year}`],
        [`Generated on: ${new Date().toLocaleDateString()}`],
        [], // Empty row for spacing
      ],
      { origin: 'A1' }
    );

    // Add the data starting at A4
    XLSX.utils.sheet_add_json(ws, excelData, {
      origin: 'A4',
      skipHeader: false,
    });

    // Adjust column widths
    ws['!cols'] = [
      { wch: 20 }, // Metric column
      { wch: 15 }, // Count column
    ];

    // Add the worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Recruitment Data');

    // Generate filename
    const filename = `yearly_recruitment_report_${year}.xlsx`;

    // Save the file
    XLSX.writeFile(wb, filename);
    toast.success('Report downloaded successfully!');
  } catch (error) {
    console.error('Error downloading report:', error);
    toast.error('Failed to download report');
  }
};

const YearlyReport = () => {
  const currentYear = new Date().getFullYear();
  const [yearlyReports, setYearlyReports] = useState<WeeklyProps | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [isDownloading, setIsDownloading] = useState(false);

  // Generate an array of the last 10 years for the dropdown
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchYearlyReports = async () => {
      if (!selectedYear) return;
      try {
        const response = await axiosInstance.get('/report/yearly', {
          params: { year: selectedYear },
        });
        setYearlyReports(response.data.data);
      } catch (error) {
        console.log(error);
        if (isAxiosError(error)) {
          toast.error(error.response?.data?.message || 'Some error occurred.');
        } else {
          toast.error('Some error occurred.');
        }
      }
    };
    fetchYearlyReports();
  }, [selectedYear]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadExcel(yearlyReports, selectedYear);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="p-6 bg-white border rounded-[10px]">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2">
          <BiTrendingUp />
          <span>Yearly Report</span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="text-[12px] text-gray-400 flex flex-row items-center gap-2">
            Year
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="from-input border p-1"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleDownload}
            disabled={isDownloading || !yearlyReports}
            className="p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaDownload /> {isDownloading ? 'Downloading...' : 'Download'}
          </button>
        </div>
      </div>

      <h1 className="text-[16px] font-medium mt-12">
        Total Number of Applicants ({yearlyReports?.count || 0})
      </h1>
      <StackedBarChart reportsData={yearlyReports} />
    </div>
  );
};

export default YearlyReport;
