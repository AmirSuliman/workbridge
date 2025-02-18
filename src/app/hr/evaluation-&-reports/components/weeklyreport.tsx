import { BiCalendar, BiTrendingUp } from 'react-icons/bi';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import StackedBarChart from './charts/weeklychart';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import * as XLSX from 'xlsx';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface WeeklyProps {
  count: number | null;
  onboarding: number | null;
  rejected: number | null;
  interviewed: number | null;
}

// Download logic for PDF

const downloadPDF = async (
  data: WeeklyProps | null,
  startDate: string,
  endDate: string,
  reportRef: React.RefObject<HTMLDivElement>
) => {
  try {
    if (!reportRef.current) {
      toast.error('Could not generate PDF');
      return;
    }

    // Format dates for display
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    };

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Add header text
    pdf.setFontSize(16);
    pdf.text('Weekly Recruitment Report', 20, 20);
    pdf.setFontSize(12);
    pdf.text(
      `Period: ${formatDate(startDate)} - ${formatDate(endDate)}`,
      20,
      30
    );
    pdf.text(`Generated on: ${new Date().toLocaleDateString('en-GB')}`, 20, 40);

    // Add table data
    const tableData = [
      ['Metric', 'Count'],
      ['Total Applicants', data?.count?.toString() || '0'],
      ['Onboarding', data?.onboarding?.toString() || '0'],
      ['Rejected', data?.rejected?.toString() || '0'],
      ['Interviewed', data?.interviewed?.toString() || '0'],
    ];

    // Calculate rates
    const interviewRate = data?.count
      ? (((data.interviewed || 0) / data.count) * 100).toFixed(2)
      : '0';
    const onboardingRate = data?.count
      ? (((data.onboarding || 0) / data.count) * 100).toFixed(2)
      : '0';
    const rejectionRate = data?.count
      ? (((data.rejected || 0) / data.count) * 100).toFixed(2)
      : '0';

    tableData.push(
      ['Interview Rate', `${interviewRate}%`],
      ['Onboarding Rate', `${onboardingRate}%`],
      ['Rejection Rate', `${rejectionRate}%`]
    );

    // Add table to PDF
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    pdf.autoTable({
      head: [['Metric', 'Count']],
      body: tableData.slice(1),
      startY: 50,
      theme: 'grid',
    });

    // Capture the chart
    const canvas = await html2canvas(
      reportRef.current.querySelector('.recharts-wrapper') as HTMLElement
    );
    const chartImage = canvas.toDataURL('image/png');

    // Add chart image to PDF
    pdf.addPage();
    pdf.text('Recruitment Metrics Chart', 20, 20);
    const imgWidth = 170;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(chartImage, 'PNG', 20, 30, imgWidth, imgHeight);

    // Save the PDF
    const filename = `weekly_recruitment_report_${startDate}_to_${endDate}.pdf`;
    pdf.save(filename);
    toast.success('PDF downloaded successfully!');
  } catch (error) {
    console.error('Error downloading PDF:', error);
    toast.error('Failed to download PDF');
  }
};

// Download logic for excel
const prepareExcelData = (
  data: WeeklyProps | null,
  startDate: string,
  endDate: string
) => {
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

  // Calculate success rates
  const interviewRate = data.count
    ? (((data.interviewed || 0) / data.count) * 100).toFixed(2)
    : '0';
  const onboardingRate = data.count
    ? (((data.onboarding || 0) / data.count) * 100).toFixed(2)
    : '0';
  const rejectionRate = data.count
    ? (((data.rejected || 0) / data.count) * 100).toFixed(2)
    : '0';

  // Add rates
  rows.push(
    {
      Metric: 'Interview Rate (%)',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      Count: `${interviewRate}%`,
    },
    {
      Metric: 'Onboarding Rate (%)',
      Count: `${onboardingRate}%`,
    },
    {
      Metric: 'Rejection Rate (%)',
      Count: `${rejectionRate}%`,
    }
  );

  return rows;
};

const downloadExcel = (
  data: WeeklyProps | null,
  startDate: string,
  endDate: string
) => {
  try {
    // Prepare the data
    const excelData = prepareExcelData(data, startDate, endDate);

    // Format dates for display
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    };

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);

    // Add title rows
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [`Weekly Recruitment Report`],
        [`Period: ${formatDate(startDate)} - ${formatDate(endDate)}`],
        [`Generated on: ${new Date().toLocaleDateString('en-GB')}`],
        [], // Empty row for spacing
      ],
      { origin: 'A1' }
    );

    // Add the data starting at A5
    XLSX.utils.sheet_add_json(ws, excelData, {
      origin: 'A5',
      skipHeader: false,
    });

    // Adjust column widths
    ws['!cols'] = [
      { wch: 20 }, // Metric column
      { wch: 15 }, // Count column
    ];

    // Add the worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Weekly Data');

    // Generate filename with the week range
    const filename = `weekly_recruitment_report_${startDate}_to_${endDate}.xlsx`;

    // Save the file
    XLSX.writeFile(wb, filename);
    toast.success('Report downloaded successfully!');
  } catch (error) {
    console.error('Error downloading report:', error);
    toast.error('Failed to download report');
  }
};

const WeeklyReport = () => {
  const [weeklyReports, setWeeklyReports] = useState<WeeklyProps | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);

  const handlePdfDownload = async () => {
    if (!startDate || !endDate || !weeklyReports) {
      toast.error('No data available to download');
      return;
    }

    setIsPdfDownloading(true);
    try {
      await downloadPDF(weeklyReports, startDate, endDate, reportRef);
    } finally {
      setIsPdfDownloading(false);
    }
  };
  // Function to get the previous week's start and end dates
  const getPreviousWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() - 7); // Start of the previous week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the previous week (Saturday)

    return {
      start: startOfWeek.toISOString().split('T')[0],
      end: endOfWeek.toISOString().split('T')[0],
    };
  };
  const handleDownload = async () => {
    if (!startDate || !endDate || !weeklyReports) {
      toast.error('No data available to download');
      return;
    }

    setIsDownloading(true);
    try {
      await downloadExcel(weeklyReports, startDate, endDate);
    } finally {
      setIsDownloading(false);
    }
  };

  // Set default dates to the previous week on component mount
  useEffect(() => {
    const { start, end } = getPreviousWeekDates();
    setStartDate(start);
    setEndDate(end);
  }, []);

  // Fetch weekly reports when startDate or endDate changes
  useEffect(() => {
    const fetchWeeklyReports = async () => {
      if (!startDate || !endDate) return; // Don't fetch if dates are not set

      try {
        const response = await axiosInstance.get('/report/weekly', {
          params: { startDate, endDate },
        });
        console.log('weekly res: ', response.data);
        setWeeklyReports(response.data.data);
      } catch (error) {
        console.log(error);
        if (isAxiosError(error)) {
          toast.error(error.response?.data?.message || 'Some error occurred.');
        } else {
          toast.error('Some error occurred.');
        }
      }
    };

    fetchWeeklyReports();
  }, [startDate, endDate]);

  // Handle week input change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (!selectedDate) return;

    // Parse the selected week input (format: YYYY-Www)
    const [year, week] = selectedDate.split('-W');
    const startOfWeek = new Date(
      Date.UTC(Number(year), 0, 1 + (Number(week) - 1) * 7)
    );
    while (startOfWeek.getDay() !== 0) {
      startOfWeek.setDate(startOfWeek.getDate() - 1); // Adjust to the start of the week (Sunday)
    }
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)

    // Update states synchronously
    setStartDate(startOfWeek.toISOString().split('T')[0]);
    setEndDate(endOfWeek.toISOString().split('T')[0]);
  };

  // Format date to display as "04 Nov - 11 Nov, 2024"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div ref={reportRef} className="p-6 bg-white border rounded-[10px] w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2">
          <BiTrendingUp />
          Weekly report{' '}
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="text-[12px] text-gray-400 flex flex-row items-center gap-2">
            Date{' '}
            <input
              type="week"
              className="form-input !font-medium"
              onChange={handleDateChange}
              value={
                startDate
                  ? `${new Date(startDate).getFullYear()}-W${String(
                      new Date(startDate).getWeek()
                    ).padStart(2, '0')}`
                  : ''
              }
            />{' '}
          </div>
          <button
            onClick={handleDownload}
            disabled={isDownloading || !weeklyReports}
            className="p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaDownload /> {isDownloading ? 'Downloading...' : 'Download'}
          </button>
          {/* <button
            onClick={handlePdfDownload}
            disabled={isPdfDownloading || !weeklyReports}
            className="p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaFilePdf /> {isPdfDownloading ? 'Downloading...' : 'PDF'}
          </button> */}
        </div>
      </div>
      <div className="flex flex-row items-center gap-3 text-[14px] mt-4 mb-8">
        <BiCalendar />
        {startDate && endDate
          ? `${formatDate(startDate)} - ${formatDate(endDate)}`
          : 'Loading...'}
      </div>

      <h1 className="text-[16px] font-medium">
        Total Number of Applicants ({weeklyReports?.count || 0})
      </h1>
      <StackedBarChart reportsData={weeklyReports} />
    </div>
  );
};

// Extend the Date interface to include the getWeek method
declare global {
  interface Date {
    getWeek(): number;
  }
}

// Helper function to get the week number from a date
Date.prototype.getWeek = function (): number {
  const date = new Date(this.valueOf());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

export default WeeklyReport;
