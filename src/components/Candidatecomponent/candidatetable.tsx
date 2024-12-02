import { FaSearch, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCandidate } from "../../store/slices/candidateSlice"; 

const CandidateTable = () => {
    const dispatch = useDispatch();
    const { users = [], status, error, total, currentPage, pageSize } = useSelector(
      (state) => state.candidate
    );
    const token = useSelector((state: any) => state.auth.token); 

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [filter, setFilter] = useState(null);

    // Fetch candidates when filters/sort change
    useEffect(() => {
      if (token) {
        dispatch(
          getCandidate({
            page: currentPage,
            pageSize,
            searchQuery,
            sortBy,
            sortOrder,
            filter,
          })
        );
      }
    }, [dispatch, currentPage, pageSize, searchQuery, sortBy, sortOrder, filter, token]);

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
              className="text-[12px]"
            />
          </div>

          <div>
            <label htmlFor="sort" className="mr-2 text-gray-400 text-[12px]">Sort</label>
            <select
              id="sort"
              className="border rounded px-2 py-1 text-[12px]"
              onChange={(e) => {
                setSortBy(e.target.value);
                setSortOrder(e.target.value === "dateAsc" || e.target.value === "nameAZ" ? "asc" : "desc");
              }}
            >
              <option value="">Select</option>
              <option value="nameAZ">A-Z</option>
              <option value="nameZA">Z-A</option>
              <option value="dateAsc">Date Ascending</option>
              <option value="dateDesc">Date Descending</option>
            </select>
          </div>

          <div>
            <label htmlFor="filter" className="mr-2 text-gray-400 text-[12px]">Filter</label>
            <select
              id="filter"
              className="border rounded px-2 py-1 text-[12px]"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Candidate Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse mt-6">
            <thead>
              <tr className="border-b text-gray-400 font-medium">
                <th className="px-6 py-4 text-left text-[14px]">Candidate Information</th>
                <th className="px-6 py-4 text-left text-[14px]">Applied for</th>
                <th className="px-6 py-4 text-left text-[14px]">Status</th>
                <th className="px-6 py-4 text-left text-[14px]">Rating</th>
                <th className="px-6 py-4 text-left text-[14px]">Applied</th>
                <th className="px-6 py-4 text-left text-[14px]">Email</th>
                <th className="px-6 py-4 text-left text-[14px]">Download</th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">Loading...</td>
                </tr>
              ) : status === "failed" ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-red-600">{error}</td>
                </tr>
              ) : (
                // Map over users.items (since API response contains 'items')
                users?.items?.map((job, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{job.firstName} {job.middleName} {job.lastName}</td>
                    <td className="px-6 py-4 text-sm">Software engineer</td>
                    <td className="px-6 py-4 text-sm">Interview Round 2</td>
                    <td className="px-6 py-4 text-sm">8/10</td>
                    <td className="px-6 py-4 text-sm">24.03.2025</td>
                    <td className="px-6 py-4 text-sm">{job.email}</td>
                    <td className="py-3 px-4 border-b">
                      <a href="Hiring/Candidatepage">
                        <span className="p-2 border w-8 rounded-md flex items-center justify-center">
                          <FaChevronRight size={12} />
                        </span>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default CandidateTable;
