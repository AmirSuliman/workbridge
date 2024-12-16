import { fetchJobApplications } from '@/store/slices/jobApplicationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

export const JobCandidates = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { jobId } = useParams();
  const { data } = useSelector((state: RootState) => state.jobApplications);

  const [sortOption, setSortOption] = useState<string>('');

  useEffect(() => {
    const params = {
      page: 1,
      size: 1000,
      jobId,
    };
    dispatch(fetchJobApplications(params));
  }, [dispatch, jobId]);

  const sortedItems = useMemo(() => {
    if (!data?.items) return [];
    return [...data.items].sort((a, b) => {
      switch (sortOption) {
        case 'createdAt':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case 'stage':
          return a.stage.localeCompare(b.stage);
        case 'highestRating':
          return (b.rating || 0) - (a.rating || 0);
        case 'lowestRating':
          return (a.rating || 0) - (b.rating || 0);
        default:
          return 0; // No sorting
      }
    });
  }, [data?.items, sortOption]);

  return (
    <div className="p-4 bg-white mt-8 rounded-lg border">
      <div className="flex flex-row items-center justify-between p-2 mb-8">
        <div className="flex flex-row items-center gap-4 text-[18px] font-medium">
          <FaUsers />
          Candidates ({data?.items.length})
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="text-sm text-gray-600 font-medium">Sort</p>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="createdAt">Date Applied</option>
            <option value="stage">Status</option>
            <option value="highestRating">Highest Rating</option>
            <option value="lowestRating">Lowest Rating</option>
          </select>
        </div>
      </div>
      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="text-gray-400 font-medium p-4">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium">
              Candidate Information
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Rating</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Applied</th>
            <th className="px-6 py-4 text-left text-sm font-medium">Email</th>
            <th className="px-6 py-4 text-left text-sm font-medium"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedItems.map((item) => (
            <tr key={item.candidate.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {`${item.candidate.firstName} ${item.candidate.lastName}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.stage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.rating != null ? `${item.rating}/10` : 'no rating yet'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.createdAt.split('T')[0]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a
                  href={`mailto:${item.candidate.email}`}
                  className="text-blue-600"
                >
                  {item.candidate.email}
                </a>
              </td>
              <td className="px-6 py-4">
                <span
                  onClick={() =>
                    router.push(`candidate/${item.candidate.id}?job=${jobId}`)
                  }
                  className="border border-gray-300 rounded-lg p-2 flex items-center justify-center hover:bg-black hover:text-white cursor-pointer"
                >
                  <BiChevronRight className="text-lg" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
