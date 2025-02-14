import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { BiTrendingUp } from 'react-icons/bi';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import StackedBarChart from './charts/weeklychart';
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
  year: number,
  reportRef: React.RefObject<HTMLDivElement>
) => {
  try {
    if (!reportRef.current) {
      toast.error('Could not generate PDF');
      return;
    }

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Add header text
    pdf.setFontSize(16);
    pdf.text(`Yearly Recruitment Report - ${year}`, 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

    // Prepare metrics data
    const tableData = [
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

    tableData.push(
      ['Interview Rate', `${interviewRate}%`],
      ['Onboarding Rate', `${onboardingRate}%`]
    );

    // Add table to PDF
    (pdf as any).autoTable({
      head: [['Metric', 'Count']],
      body: tableData,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [51, 51, 51] },
      styles: { fontSize: 10 },
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
    const filename = `yearly_recruitment_report_${year}.pdf`;
    pdf.save(filename);
    toast.success('PDF downloaded successfully!');
  } catch (error) {
    console.error('Error downloading PDF:', error);
    toast.error('Failed to download PDF');
  }
};

// Download logic for excel
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
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
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
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

  const handlePdfDownload = async () => {
    if (!yearlyReports) {
      toast.error('No data available to download');
      return;
    }

    setIsPdfDownloading(true);
    try {
      await downloadPDF(yearlyReports, selectedYear, reportRef);
    } finally {
      setIsPdfDownloading(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadExcel(yearlyReports, selectedYear);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div ref={reportRef} className="p-6 bg-white border rounded-[10px]">
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

          {/* <button
            onClick={handlePdfDownload}
            disabled={isPdfDownloading || !yearlyReports}
            className="p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaFilePdf /> {isPdfDownloading ? 'Downloading...' : 'PDF'}
          </button> */}
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
