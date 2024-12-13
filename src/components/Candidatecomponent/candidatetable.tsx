import { FaSearch, FaChevronRight } from "react-icons/fa";

const CandidateTable = () => {  

    return (
      <div className="p-4 bg-white rounded-lg border mt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex flex-row rounded-lg border px-2 py-1 text-gray-400 items-center gap-3 text-[12px]">
            <FaSearch />
            <input
              type="search"
            
              placeholder="Search candidate"
              className="text-[12px]"
            />
          </div>

          <div>
            <label htmlFor="sort" className="mr-2 text-gray-400 text-[12px]">Sort</label>
            <select
              id="sort"
              className="border rounded px-2 py-1 text-[12px]"              
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
              
                  <tr  className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">jhon doe</td>
                    <td className="px-6 py-4 text-sm">Software engineer</td>
                    <td className="px-6 py-4 text-sm">Interview Round 2</td>
                    <td className="px-6 py-4 text-sm">8/10</td>
                    <td className="px-6 py-4 text-sm">24.03.2025</td>
                    <td className="px-6 py-4 text-sm">example@gmail.com</td>
                    <td className="py-3 px-4 border-b">
                      <a href="Hiring/Candidatepage">
                        <span className="p-2 border w-8 rounded-md flex items-center justify-center">
                          <FaChevronRight size={12} />
                        </span>
                      </a>
                    </td>
                  </tr>
                
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default CandidateTable;
