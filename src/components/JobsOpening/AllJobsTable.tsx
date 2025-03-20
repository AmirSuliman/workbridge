import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronRight, FaPlus, FaUsers } from 'react-icons/fa';
import { fetchOpenPositions } from '@/store/slices/getOpenPositionSlice';
import { AppDispatch, RootState } from '@/store/store';
import Link from 'next/link';
import ScreenLoader from '../common/ScreenLoader';
import { useRouter } from 'next/navigation';
import { FaDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Pagination } from '../common/Pagination';

export const AllJobsTable = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { items, loading, error, totalItems } = useSelector(
    (state: RootState) => state.jobs
  );
  console.log('totalItems', totalItems);
  const [sortCriteria, setSortCriteria] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');

  const handleDownload = async (allJobs) => {
    try {
      if (allJobs.length === 0) {
        alert('No job data available to download.');
        return;
      }

      // Prepare data for Excel
      const data = allJobs.map((job) => ({
        'Job Opening': job.tittle,
        Candidates: job.jobApplicationCount,
        'Job Type': job.employmentType,
        'Hiring Lead': `${job.hiringLead?.firstName || ''} ${
          job.hiringLead?.lastName || ''
        }`,
        'Created On': new Date(job.createdAt).toLocaleDateString(),
        Status: job.status,
      }));

      // Create Excel file
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Job Openings');

      // Convert to binary format
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      // Create Blob and trigger download
      const blob = new Blob([excelBuffer], {
        type: 'application/octet-stream',
      });
      saveAs(blob, 'Job_Openings.xlsx');
    } catch (error) {
      console.error('Error fetching all job data:', error);
      alert('Failed to download job data.');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchOpenPositions({ page: currentPage, size: pageSize }));
  }, [dispatch, currentPage]);

  // Filtering logic
  const filteredItems = items.filter((job) => {
    const matchesStatus =
      !statusFilter || job.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType =
      !typeFilter ||
      job.employmentType.toLowerCase() === typeFilter.toLowerCase();

    return matchesStatus && matchesType;
  });

  // Sorting logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortCriteria) {
      case 'Latest':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'Oldest':
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'Most Candidates':
        return b.jobApplicationCount - a.jobApplicationCount;
      case 'Least Candidates':
        return a.jobApplicationCount - b.jobApplicationCount;
      case 'Status ascending':
        return a.status.localeCompare(b.status);
      case 'Status descending':
        return b.status.localeCompare(a.status);
      default:
        return 0; // No sorting
    }
  });

  if (loading) {
    return <ScreenLoader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4 bg-white flex flex-col rounded-lg border mt-4">
      <div className="flex flex-col gap-2 sm:flex-row items-start sm:items-center justify-between w-full">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          {/* Sort Dropdown */}
          <div>
            <label htmlFor="sort" className="mr-2 text-gray-400 text-[12px]">
              Sort
            </label>
            <select
              id="sort"
              className="border rounded px-2 py-1 divide-y-2 text-[12px]"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Most Candidates">Most Candidates</option>
              <option value="Least Candidates">Least Candidates</option>
              <option value="Status ascending">Status ascending</option>
              <option value="Status descending">Status descending</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label
              htmlFor="statusFilter"
              className="mr-2 text-gray-400 text-[12px]"
            >
              Status
            </label>
            <select
              id="statusFilter"
              className="border rounded px-2 py-1 text-[12px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              {/* <option value="closed">Closed</option> */}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label
              htmlFor="typeFilter"
              className="mr-2 text-gray-400 text-[12px]"
            >
              Job Type
            </label>
            <select
              id="typeFilter"
              className="border rounded px-2 py-1 text-[12px]"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="FullTime">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        <Link
          href="hiring/create-job"
          className="p-3 px-4 rounded-lg bg-[#0F172A] text-white text-[14px] flex items-center gap-2"
        >
          Add Job Opening
          <div className="p-1 rounded-full border border-white">
            <FaPlus size={12} />
          </div>
        </Link>
      </div>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="py-3 px-4 border-b font-medium">Candidates</th>
              <th className="py-3 px-4 border-b font-medium">Job Opening</th>
              <th className="py-3 px-4 border-b font-medium">Type</th>
              <th className="py-3 px-4 border-b font-medium">Hiring Lead</th>
              <th className="py-3 px-4 border-b font-medium">Created on</th>
              <th className="py-3 px-4 border-b font-medium">Status</th>
              <th className="py-3 px-4 border-b font-medium">
                <button
                  onClick={() => handleDownload(sortedItems)}
                  className="bg-[#0F172A] p-2 items-center justify-center text-white text-[12px] rounded flex flex-row gap-2"
                >
                  <FaDownload />
                  Download
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((job) => (
              <tr
                onClick={() => {
                  router.push(`hiring/job/${job.id}`);
                }}
                key={job.id}
                className="hover:bg-gray-50 text-[#0F172A] text-[14px] cursor-pointer"
              >
                <td className="py-3 px-4 border-b">
                  <span className="flex items-center gap-2">
                    <FaUsers /> {job.jobApplicationCount}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">{job.tittle}</td>
                <td className="py-3 px-4 border-b">{job.employmentType}</td>
                <td className="py-3 px-4 border-b">{`${
                  job.hiringLead?.firstName || ''
                } ${job.hiringLead?.lastName || ''}`}</td>
                <td className="py-3 px-4 border-b">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b">{job.status}</td>
                <td className="py-3 px-4 border-b">
                  <span className="p-2 border w-8 rounded-md flex items-center justify-center">
                    <FaChevronRight size={12} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          styles={{ container: 'mt-5 gap-x-2 !justify-end' }}
          totalItems={totalItems || 0}
          pageSize={pageSize}
          currentPage={currentPage}
          maxPagesToShow={3} // Adjust if needed
          setCurrentPage={handlePageChange}
        />
      </div>
    </div>
  );
};
