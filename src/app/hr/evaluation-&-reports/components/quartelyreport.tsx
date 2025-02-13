import { FaDownload } from 'react-icons/fa6';
import SimpleBarChart from './charts/quartleychart';
import { BiTrendingUp } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import axiosInstance from '@/lib/axios';
import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';

// Download logic for PDF
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFilePdf } from 'react-icons/fa';

const downloadPDF = async (
  data,
  year: number,
  quarter: string,
  reportRef: React.RefObject<HTMLDivElement>
) => {
  try {
    if (!reportRef.current) {
      toast.error('Could not generate PDF');
      return;
    }

    // Prepare data with totals
    const reportData = prepareExcelData(data);

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Add header text
    pdf.setFontSize(16);
    pdf.text(
      `Quarterly Recruitment Report - ${year} ${
        quarter === 'all' ? 'All Quarters' : `Q${quarter}`
      }`,
      20,
      20
    );
    pdf.setFontSize(12);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

    // Prepare table data
    const tableData = reportData.map((item) => [
      item.name,
      item.Applicants.toString(),
      item.Rejected.toString(),
      item.Interviewed.toString(),
      (item['Offers Extended'] || 0).toString(),
      (item['Employees Hired'] || 0).toString(),
    ]);

    // Add table to PDF
    (pdf as any).autoTable({
      head: [
        [
          'Quarter',
          'Applicants',
          'Rejected',
          'Interviewed',
          'Offers Extended',
          'Employees Hired',
        ],
      ],
      body: tableData,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [51, 51, 51] },
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 25, halign: 'right' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 30, halign: 'right' },
        5: { cellWidth: 30, halign: 'right' },
      },
    });
    // Capture the bar chart
    const chartElement = reportRef.current.querySelector(
      '.recharts-wrapper'
    ) as HTMLElement;
    if (chartElement) {
      const canvas = await html2canvas(chartElement);
      const chartImage = canvas.toDataURL('image/png');

      // Add chart image to PDF
      pdf.addPage();
      pdf.text('Recruitment Metrics Visualization', 20, 20);
      const imgWidth = 170;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(chartImage, 'PNG', 20, 30, imgWidth, imgHeight);
    }

    // Save the PDF
    const filename = `recruitment_report_${year}_${
      quarter === 'all' ? 'all_quarters' : `Q${quarter}`
    }.pdf`;
    pdf.save(filename);
    toast.success('PDF downloaded successfully!');
  } catch (error) {
    console.error('Error downloading PDF:', error);
    toast.error('Failed to download PDF');
  }
};

// Download logic for Excel
const prepareExcelData = (data) => {
  // Add a summary row with totals
  const totals = {
    name: 'Total',
    Applicants: data.reduce((sum, item) => sum + item.Applicants, 0),
    Rejected: data.reduce((sum, item) => sum + item.Rejected, 0),
    Interviewed: data.reduce((sum, item) => sum + item.Interviewed, 0),
    'Offers Extended': data.reduce(
      (sum, item) => sum + (item['Offers Extended'] || 0),
      0
    ),
    'Employees Hired': data.reduce(
      (sum, item) => sum + (item['Employees Hired'] || 0),
      0
    ),
  };

  return [...data, totals];
};

const downloadExcel = (data, year, quarter) => {
  try {
    // Prepare the data with totals
    const excelData = prepareExcelData(data);

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Add title rows
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [
          `Quarterly Recruitment Report - ${year} ${
            quarter === 'all' ? 'All Quarters' : `Q${quarter}`
          }`,
        ],
        [`Generated on: ${new Date().toLocaleDateString()}`],
        [], // Empty row for spacing
      ],
      { origin: 'A1' }
    );

    // Adjust column widths
    const columnWidths = [
      { wch: 15 }, // Quarter column
      { wch: 12 }, // Applicants
      { wch: 12 }, // Rejected
      { wch: 12 }, // Interviewed
      { wch: 15 }, // Offers Extended
      { wch: 15 }, // Employees Hired
    ];
    ws['!cols'] = columnWidths;

    // Add the worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Recruitment Data');

    // Generate filename
    const filename = `recruitment_report_${year}_${
      quarter === 'all' ? 'all_quarters' : `Q${quarter}`
    }.xlsx`;

    // Save the file
    XLSX.writeFile(wb, filename);
    toast.success('Report downloaded successfully!');
  } catch (error) {
    console.error('Error downloading report:', error);
    toast.error('Failed to download report');
  }
};

const transformData = (quarterlyData) => {
  return quarterlyData.map((item) => ({
    name: `Q${item.quarter}`,
    Applicants: item.data.count,
    Rejected: item.data.rejected,
    Interviewed: item.data.interviewed,
    'Offers Extended': item.data.offered,
    'Employees Hired': item.data.onboarding,
  }));
};

const QuarterlyReport = () => {
  const currentYear = new Date().getFullYear();
  const [quarterlyReports, setQuarterlyReports] = useState(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedQuarter, setSelectedQuarter] = useState('all');
  const [chartData, setChartData] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePdfDownload = async () => {
    if (chartData.length === 0) {
      toast.error('No data available to download');
      return;
    }

    setIsPdfDownloading(true);
    try {
      await downloadPDF(chartData, selectedYear, selectedQuarter, reportRef);
    } finally {
      setIsPdfDownloading(false);
    }
  };
  // Generate an array of the last 10 years for the dropdown
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  useEffect(() => {
    const fetchYearlyReports = async () => {
      if (!selectedYear) return;
      try {
        const response = await axiosInstance.get('/report/quarterly', {
          params: { year: selectedYear },
        });
        setQuarterlyReports(response.data.data);

        // Transform and filter data based on selected quarter
        let transformedData = transformData(response.data.data);
        if (selectedQuarter !== 'all') {
          transformedData = transformedData.filter(
            (item) => item.name === `Q${selectedQuarter}`
          );
        }
        setChartData(transformedData);
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
  }, [selectedYear, selectedQuarter]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadExcel(chartData, selectedYear, selectedQuarter);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div ref={reportRef} className="p-6 bg-white border rounded-lg">
      <div className="flex flex-row items-center justify-between w-full mb-12">
        <div className="flex flex-row items-center gap-2">
          <BiTrendingUp className="text-gray-600" />
          <span className="font-medium">Quarterly Reports</span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="text-sm text-gray-400 flex flex-row items-center gap-2">
            Year:
            <select
              className="border rounded p-2"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-400 flex flex-row items-center gap-2">
            Quarter:
            <select
              className="border rounded p-2"
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
            >
              <option value="all">All Quarters</option>
              <option value="1">Q1</option>
              <option value="2">Q2</option>
              <option value="3">Q3</option>
              <option value="4">Q4</option>
            </select>
          </div>
          <button
            onClick={handleDownload}
            disabled={isDownloading || chartData.length === 0}
            className="p-2 bg-black rounded text-white text-sm flex flex-row items-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaDownload /> {isDownloading ? 'Downloading...' : 'Download'}
          </button>
          <button
            onClick={handlePdfDownload}
            disabled={isPdfDownloading || chartData.length === 0}
            className="p-2 bg-black rounded text-white text-sm flex flex-row items-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaFilePdf /> {isPdfDownloading ? 'Downloading...' : 'PDF'}
          </button>
        </div>
      </div>
      {chartData.length > 0 ? (
        <SimpleBarChart data={chartData} />
      ) : (
        <div className="flex items-center justify-center h-[350px] text-gray-400">
          No data available for the selected period
        </div>
      )}
    </div>
  );
};

export default QuarterlyReport;
