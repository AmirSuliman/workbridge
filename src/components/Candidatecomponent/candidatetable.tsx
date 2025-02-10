import { fetchJobApplications } from '@/store/slices/jobApplicationsSlice';
import { useEffect, useState } from 'react';
import { FaChevronRight, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '../common/Pagination';
import { AppDispatch, RootState } from '@/store/store';

import ScreenLoader from '../common/ScreenLoader';

const CandidateTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.jobApplications
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fetch job applications on load or filter change
  useEffect(() => {
    const params = {
      stage: filter || undefined,
      sort: sort || undefined,
      page: currentPage,
      size: pageSize,
      candidateId: searchQuery || undefined,
    };
    dispatch(fetchJobApplications(params));
  }, [dispatch, searchQuery, sort, filter, currentPage]);

  return (
    <div className="p-4 bg-white rounded-lg border mt-4">
      {/* Search, Sort, and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <div className="flex flex-row rounded-lg border px-2 py-1 text-gray-400 items-center gap-3 text-[12px]">
          <FaSearch />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate"
            className="text-[12px] outline-none"
          />
        </div>

        <div>
          <label htmlFor="sort" className="mr-2 text-gray-400 text-[12px]">
            Sort
          </label>
          <select
            id="sort"
            className="border rounded px-2 py-1 text-[12px]"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Select</option>
            <option value="createdAt">Date Applied</option>
            <option value="stage">Status</option>
            <option value="rating">Highets rating</option>
            <option value="rating">Lowets rating</option>
          </select>
        </div>

        <div>
          <label htmlFor="filter" className="mr-2 text-gray-400 text-[12px]">
            Filter
          </label>
          <select
            id="filter"
            className="border rounded px-2 py-1 text-[12px]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Published">Active</option>
            <option value="Draft">Pending</option>
            {/* <option value="Draft">Closed</option> */}
          </select>
        </div>
      </div>

      {/* Candidate Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse mt-6">
          <thead>
            <tr className="border-b text-gray-400 font-medium">
              <th className="px-6 py-4 text-left text-[14px]">
                Candidate Information
              </th>
              <th className="px-6 py-4 text-left text-[14px]">Applied for</th>
              <th className="px-6 py-4 text-left text-[14px]">Status</th>
              <th className="px-6 py-4 text-left text-[14px]">Rating</th>
              <th className="px-6 py-4 text-left text-[14px]">Applied</th>
              <th className="px-6 py-4 text-left text-[14px]">Email</th>
              <th className="px-6 py-4 text-left text-[14px]">Download</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  <ScreenLoader />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-red-600">
                  {error}
                </td>
              </tr>
            ) : (
              data?.items?.map((job, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">
                    {job.candidate.firstName} {job.candidate.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm">{job.job.tittle}</td>
                  <td
                    className={`px-6 py-4 text-sm  ${
                      job.stage === 'Rejected' ? 'text-[#F53649]' : ''
                    }`}
                  >
                    {job.stage}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {job.rating || 'No rating yet'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a
                      href={`mailto:${job.candidate.email}`}
                      className="text-blue-600"
                    >
                      {job.candidate.email}
                    </a>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <a
                      href={`/hr/hiring/job/candidate/${job.candidate.id}?job=${job.job.id}`}
                    >
                      <span className="p-2 border w-8 rounded-md flex items-center justify-center hover:bg-black hover:text-white">
                        <FaChevronRight size={12} />
                      </span>
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination
          styles={{ container: 'mt-5 gap-x-2 !justify-end' }}
          totalItems={data?.totalItems || 0}
          pageSize={pageSize}
          currentPage={currentPage}
          maxPagesToShow={5} // Adjust if needed
          setCurrentPage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CandidateTable;
