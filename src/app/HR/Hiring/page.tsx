'use client'
import { FaPlus, FaUsers } from 'react-icons/fa';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const Hiring = () => {
  // Sample data
  const [candidates, setCandidates] = useState([
    { id: 1, name: "11", jobOpening: "Frontend Developer", type: "Full-Time", hiringLead: "Marco James", Createdon: "Apr 1, 2021",  status: "Active" },
    { id: 2, name: "22", jobOpening: "Backend Developer", type: "Part-Time", hiringLead: "Marco James",  Createdon: "Apr 1, 2021",  status: "Pending" },
    { id: 3, name: "9", jobOpening: "UI/UX Designer", type: "Contract", hiringLead: "Marco James",  Createdon: "Apr 1, 2021",  status: "Closed" },
    { id: 4, name: "10", jobOpening: "Data Scientist", type: "Internship", hiringLead: "Marco James", Createdon: "Apr 1, 2021",  status: "Active" },
  ]);

  return (
    <main className="space-y-4">
      {/* Top Buttons */}
      <div className="flex flex-row items-center gap-4">
        <button>Job Openings</button>
        <button>Candidates</button>
      </div>
      <div className="w-full h-[1px] bg-gray-300" />

      {/* Add Job Opening Button */}
      <div className="p-4 bg-white flex flex-col  rounded-lg border mt-4 flex">
        <div className="flex flex-col gap-2 sm:flex-row items-start sm:items-center justify-between w-full">
          <button className="p-3 px-4 rounded-lg bg-[#0F172A] text-white flex items-center gap-2">
            Add Job Opening 
            <div className="p-1 rounded-full border border-white">
              <FaPlus size={12} />
            </div>
          </button>

          {/* Sort and Filter Options */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            {/* Sort Dropdown */}
            <div>
              <label htmlFor="sort" className="mr-2 text-gray-400 text-[12px]">Sort</label>
              <select id="sort" className="border rounded px-2 py-1 text-[12px]">
                <option value="">Select</option>
                <option value="nameAZ">A-Z</option>
                <option value="nameZA">Z-A</option>
                <option value="dateAsc">Date Ascending</option>
                <option value="dateDesc">Date Descending</option>
              </select>
            </div>

            {/* Filter Dropdown */}
            <div>
              <label htmlFor="filter" className="mr-2 text-gray-400 text-[12px]">Filter</label>
              <select id="filter" className="border rounded px-2 py-1 text-[12px]">
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
        <th className="py-3 px-4 border-b"><input type="checkbox" /></th>
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
      {candidates.map((candidate) => (
        <tr key={candidate.id} className="hover:bg-gray-50 text-[#0F172A] text-[14px]">
          <td className="py-3 px-4 border-b">
            <input type="checkbox" />
          </td>
          <td className="py-3 px-4 border-b "><span className=' flex items-center flex-row gap-2'><FaUsers/> {candidate.name}</span></td>
          <td className="py-3 px-4 border-b">{candidate.jobOpening}</td>
          <td className="py-3 px-4 border-b">{candidate.type}</td>
          <td className="py-3 px-4 border-b">{candidate.hiringLead}</td>
          <td className="py-3 px-4 border-b">{candidate.Createdon}</td>
          <td className="py-3 px-4 border-b">{candidate.status}</td>
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

      {/* Candidates Table */}
      
    </main>
  );
};

export default Hiring;
