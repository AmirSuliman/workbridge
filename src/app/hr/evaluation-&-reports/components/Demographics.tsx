import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import 'jspdf-autotable';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BiTrendingUp } from 'react-icons/bi';
import { FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { CountryBox, WorldMap } from './worldmap';

export interface DemographicsProps {
  countryName: string | null;
  employeeCount: number;
  countryId: number;
}

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
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchYearlyReports = async () => {
      try {
        const response = await axiosInstance.get('/report/demographic');
        setDemographicReports(response.data.data);
      } catch (error) {
        if (isAxiosError(error)) {
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
    <div ref={reportRef} className='p-6 bg-white border rounded-[10px]'>
      <div className='flex flex-row items-center justify-between w-full'>
        <div className='flex flex-row items-center gap-2'>
          <BiTrendingUp />
          Demographics{' '}
        </div>
        <div className='flex flex-row items-center gap-4'>
          <button
            onClick={handleDownload}
            disabled={isDownloading || demographicReports.length === 0}
            className='p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            <FaDownload /> {isDownloading ? 'Downloading...' : 'Download'}
          </button>
        </div>
      </div>

      <div className='mt-10'>
        <WorldMap
          data={demographicReports}
          hoveredCountry={hoveredCountry}
          setHoveredCountry={setHoveredCountry}
        />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-2 lg:gap-8 mt-8'>
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
          <p className='col-span-full p-4 w-full border rounded text-center'>
            No data available
          </p>
        )}
      </div>
    </div>
  );
};

export default Demographics;
