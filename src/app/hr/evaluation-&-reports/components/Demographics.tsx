import { BiTrendingUp } from 'react-icons/bi';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import * as XLSX from 'xlsx';
import { CountryBox, WorldMap } from './worldmap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export interface DemographicsProps {
  countryName: string | null;
  employeeCount: number;
  countryId: number;
}

// Download logic for PDF
const downloadPDF = async (
  data: DemographicsProps[],
  reportRef: React.RefObject<HTMLDivElement>
) => {
  try {
    if (!reportRef.current) {
      toast.error('Could not generate PDF');
      return;
    }

    // Calculate total employees and prepare data
    const totalEmployees = data.reduce(
      (sum, item) => sum + item.employeeCount,
      0
    );

    // Sort data by employee count in descending order
    const sortedData = [...data].sort(
      (a, b) => b.employeeCount - a.employeeCount
    );

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Add header text
    pdf.setFontSize(16);
    pdf.text('Employee Demographics Report', 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Total Employees: ${totalEmployees}`, 20, 30);
    pdf.text(`Generated on: ${new Date().toLocaleDateString('en-GB')}`, 20, 40);

    // Prepare table data
    const tableData = sortedData.map((item) => [
      item.countryName || 'Unknown',
      item.employeeCount.toString(),
      `${((item.employeeCount / totalEmployees) * 100).toFixed(2)}%`,
    ]);

    // Add total row
    tableData.push(['Total', totalEmployees.toString(), '100%']);

    // Add table to PDF
    (pdf as any).autoTable({
      head: [['Country', 'Number of Employees', 'Percentage of Total']],
      body: tableData,
      startY: 50,
      theme: 'grid',
      headStyles: { fillColor: [51, 51, 51] },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40, halign: 'right' },
        2: { cellWidth: 40, halign: 'right' },
      },
    });

    // Capture the world map
    const mapElement = reportRef.current.querySelector(
      '.world-map-container'
    ) as HTMLElement;
    if (mapElement) {
      const canvas = await html2canvas(mapElement);
      const mapImage = canvas.toDataURL('image/png');

      // Add map image to PDF
      pdf.addPage();
      pdf.text('Geographic Distribution', 20, 20);
      const imgWidth = 170;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(mapImage, 'PNG', 20, 30, imgWidth, imgHeight);
    }

    // Save the PDF
    const filename = `employee_demographics_${
      new Date().toISOString().split('T')[0]
    }.pdf`;
    pdf.save(filename);
    toast.success('PDF downloaded successfully!');
  } catch (error) {
    console.error('Error downloading PDF:', error);
    toast.error('Failed to download PDF');
  }
};

// Download logic for Excel
const prepareExcelData = (data: DemographicsProps[]) => {
  // Sort data by employee count in descending order
  const sortedData = [...data].sort(
    (a, b) => b.employeeCount - a.employeeCount
  );

  // Calculate total employees
  const totalEmployees = data.reduce(
    (sum, item) => sum + item.employeeCount,
    0
  );

  // Transform data adding percentage calculations
  const rows = sortedData.map((item) => ({
    Country: item.countryName || 'Unknown',
    'Number of Employees': item.employeeCount,
    'Percentage of Total': `${(
      (item.employeeCount / totalEmployees) *
      100
    ).toFixed(2)}%`,
  }));

  // Add total row
  rows.push({
    Country: 'Total',
    'Number of Employees': totalEmployees,
    'Percentage of Total': '100%',
  });

  return {
    rows,
    totalEmployees,
  };
};

const downloadExcel = (data: DemographicsProps[]) => {
  try {
    const { rows, totalEmployees } = prepareExcelData(data);

    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);

    // Add title rows
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        ['Employee Demographics Report'],
        [`Total Employees: ${totalEmployees}`],
        [`Generated on: ${new Date().toLocaleDateString('en-GB')}`],
        [], // Empty row for spacing
      ],
      { origin: 'A1' }
    );

    // Add the data starting at A5
    XLSX.utils.sheet_add_json(ws, rows, {
      origin: 'A5',
      skipHeader: false,
    });

    // Adjust column widths
    ws['!cols'] = [
      { wch: 25 }, // Country column
      { wch: 20 }, // Number of Employees column
      { wch: 20 }, // Percentage column
    ];

    // Add the worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Demographics');

    // Generate filename
    const filename = `employee_demographics_${
      new Date().toISOString().split('T')[0]
    }.xlsx`;

    // Save the file
    XLSX.writeFile(wb, filename);
    toast.success('Report downloaded successfully!');
  } catch (error) {
    console.error('Error downloading report:', error);
    toast.error('Failed to download report');
  }
};

const Demographics = () => {
  const [demographicReports, setDemographicReports] = useState<
    DemographicsProps[] | []
  >([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePdfDownload = async () => {
    if (demographicReports.length === 0) {
      toast.error('No data available to download');
      return;
    }

    setIsPdfDownloading(true);
    try {
      await downloadPDF(demographicReports, reportRef);
    } finally {
      setIsPdfDownloading(false);
    }
  };

  useEffect(() => {
    const fetchYearlyReports = async () => {
      try {
        const response = await axiosInstance.get('/report/demographic');
        setDemographicReports(response.data.data);
        console.log('demographic report res: ', response.data.data);
      } catch (error) {
        console.log(error);
        if (isAxiosError(error)) {
          console.log(error);
          toast.error(error.response?.data?.message || 'Some error occurred.');
        } else {
          toast.error('Some error occurred.');
        }
      }
    };
    fetchYearlyReports();
  }, []);

  const handleDownload = async () => {
    if (demographicReports.length === 0) {
      toast.error('No data available to download');
      return;
    }

    setIsDownloading(true);
    try {
      await downloadExcel(demographicReports);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div ref={reportRef} className="p-6 bg-white border rounded-[10px]">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2">
          <BiTrendingUp />
          Demographics{' '}
        </div>
        <div className="flex flex-row items-center gap-4">
          <button
            onClick={handleDownload}
            disabled={isDownloading || demographicReports.length === 0}
            className="p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaDownload /> {isDownloading ? 'Downloading...' : 'Download'}
          </button>
          <button
            onClick={handlePdfDownload}
            disabled={isPdfDownloading || demographicReports.length === 0}
            className="p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaFilePdf /> {isPdfDownloading ? 'Downloading...' : 'PDF'}
          </button>
        </div>
      </div>
      {/* <Image
        src="/map.png"
        alt="img"
        width={1000}
        height={1000}
        className="mt-10"
      /> */}
      <div className="mt-10">
        <WorldMap
          data={demographicReports}
          hoveredCountry={hoveredCountry}
          setHoveredCountry={setHoveredCountry}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-8">
        {demographicReports.length > 0 ? (
          demographicReports.map((data) => (
            <CountryBox
              key={data.countryId}
              data={data}
              isHighlighted={hoveredCountry === data.countryName}
              onHover={() => setHoveredCountry(data.countryName)}
              onLeave={() => setHoveredCountry(null)}
            />
          ))
        ) : (
          <p className="col-span-full p-4 w-full border rounded text-center">
            No data available
          </p>
        )}
      </div>
    </div>
  );
};

export default Demographics;
