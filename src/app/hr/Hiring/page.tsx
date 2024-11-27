'use client';
import { AllJobsTable } from '@/components/JobsOpening/AllJobsTable';
import { useState } from 'react';
import { FaChevronRight, FaPlus, FaSearch, FaUsers } from 'react-icons/fa';

const Hiring = () => {
  const jobApplications = [
    {
      name: 'John Bourgie',
      jobType: 'Software Engineer',
      Type: 'Interview Round 2',
      rating: '8/10',
      createdOn: '2024-11-01',
      email: 'john.borgie@gmail.com',
    },
    {
      name: 'John Bourgie',
      jobType: 'Frontend Developer',
      Type: 'Interview Round 2',
      rating: '8/10',
      createdOn: '2024-10-25',
      email: 'john.borgie@gmail.com',
    },
    {
      name: 'John Bourgie',
      jobType: 'UX Designer',
      Type: 'Interview Round 2',
      rating: '8/10',
      createdOn: '2024-09-15',
      email: 'john.borgie@gmail.com',
    },
  ];

  const [activeTab, setActiveTab] = useState('jobOpenings');

  return (
    <main className="space-y-4">
      {/* Tab Buttons */}
      <div className="relative flex items-center gap-8 border-b border-gray-300">
        <button
          onClick={() => setActiveTab('jobOpenings')}
          className={`py-2 px-4 ${
            activeTab === 'jobOpenings'
              ? 'text-black font-semibold'
              : 'text-gray-600'
          }`}
        >
          Job Openings
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`py-2 px-4 ${
            activeTab === 'candidates'
              ? 'text-black font-semibold'
              : 'text-gray-600'
          }`}
        >
          Candidates
        </button>

        <div
          className={`absolute bottom-0 h-[2px] bg-black transition-all duration-300`}
          style={{
            width: activeTab === 'jobOpenings' ? '110px' : '100px',
            left: activeTab === 'jobOpenings' ? '0' : '180px',
          }}
        />
      </div>

      {/* Conditional Rendering for Tab Content */}
      {activeTab === 'jobOpenings' ? (
        <AllJobsTable />
      ) : (
        <div className="  mt-4">
          <div className="flex flex-row items-center gap-2 text-[22px] font-medium">
            <FaUsers />
            Candidates
          </div>
          <div className="p-4 bg-white rounded-lg border mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex flex-row rounded-lg border px-2 py-1 text-gray-400 items-center gap-3 text-[12px] ">
                <FaSearch />
                <input
                  type="search "
                  placeholder="Search candidate"
                  className="  text-[12px]"
                />
              </div>
              {/* Sort Dropdown */}
              <div>
                <label
                  htmlFor="sort"
                  className="mr-2 text-gray-400 text-[12px]"
                >
                  Sort
                </label>
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

              {/* Filter Dropdown */}
              <div>
                <label
                  htmlFor="filter"
                  className="mr-2 text-gray-400 text-[12px]"
                >
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
            <div className=" overflow-x-auto">
              <table className="min-w-full table-auto border-collapse mt-6 ">
                <thead className="">
                  <tr className="border-b text-gray-400 font-medium">
                    <th className="px-6 py-4 text-left text-[14px]  ">
                      Candidate Information
                    </th>
                    <th className="px-6 py-4 text-left text-[14px]  ">
                      Applied for
                    </th>
                    <th className="px-6 py-4 text-left text-[14px]  ">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-[14px]  ">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-[14px]  ">
                      Applied
                    </th>
                    <th className="px-6 py-4 text-left text-[14px]  ">Email</th>
                    <th className="px-6 py-4 text-left text-[14px]  ">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobApplications.map((job, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm ">{job.name}</td>
                      <td className="px-6 py-4 text-sm ">{job.jobType}</td>
                      <td className="px-6 py-4 text-sm ">{job.Type}</td>
                      <td className="px-6 py-4 text-sm ">{job.rating}</td>
                      <td className="px-6 py-4 text-sm ">{job.createdOn}</td>
                      <td className="px-6 py-4 text-sm ">{job.email}</td>
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
        </div>
      )}
    </main>
  );
};

export default Hiring;
