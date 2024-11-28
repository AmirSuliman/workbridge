import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronRight, FaPlus, FaUsers } from 'react-icons/fa';
import { fetchOpenPositions } from '@/store/slices/getOpenPositionSlice';
import { AppDispatch, RootState } from '@/store/store';
import Link from 'next/link';
import ScreenLoader from '../common/ScreenLoader';
import { useRouter } from 'next/navigation';

export const AllJobsTable = () => {
  const router = useRouter();
  const [sortCriteria, setSortCriteria] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );

  useEffect(() => {
    dispatch(fetchOpenPositions());
  }, [dispatch]);

  // Sorting logic
  const sortedItems = [...items].sort((a, b) => {
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
        <Link
          href="hiring/Create-jobopening"
          className="p-3 px-4 rounded-lg bg-[#0F172A] text-white flex items-center gap-2"
        >
          Add Job Opening
          <div className="p-1 rounded-full border border-white">
            <FaPlus size={12} />
          </div>
        </Link>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
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
          <div>
            <label htmlFor="filter" className="mr-2 text-gray-400 text-[12px]">
              Filter
            </label>
            <select
              id="filter"
              className="border rounded px-2 py-1 text-[12px]"
            >
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-12 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="py-3 px-4 border-b">Candidates</th>
              <th className="py-3 px-4 border-b">Job Opening</th>
              <th className="py-3 px-4 border-b">Type</th>
              <th className="py-3 px-4 border-b">Hiring Lead</th>
              <th className="py-3 px-4 border-b">Created on</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Download</th>
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
                <td className="py-3 px-4 border-b">{`${job.hiringLead.firstName} ${job.hiringLead.lastName}`}</td>
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
      </div>
    </div>
  );
};
