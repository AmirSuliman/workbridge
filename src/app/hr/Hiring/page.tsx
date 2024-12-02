'use client'
import { FaPlus, FaSearch, FaUsers } from 'react-icons/fa';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import {BiChevronRight} from "react-icons/bi"
import Candidatetable from '@/components/Candidatecomponent/candidatetable';
const Hiring = () => {

  const jobApplications = [
    {
      name:"John Bourgie",
      jobType: "Software Engineer",
      Type:"Interview Round 2",
      rating:"8/10",
      createdOn: "2024-11-01",
      email:"john.borgie@gmail.com",
    },
    {
      name:"John Bourgie",
      jobType: "Frontend Developer",
      Type:"Interview Round 2",
      rating:"8/10",
      createdOn: "2024-10-25",
      email:"john.borgie@gmail.com",
    },
    { 
      name:"John Bourgie",
      jobType: "UX Designer",
      Type:"Interview Round 2",
      rating:"8/10",
      createdOn: "2024-09-15",
      email:"john.borgie@gmail.com",
    },
  ];

  const [candidates, setCandidates] = useState([
    { id: 1, name: "11", jobOpening: "Frontend Developer", type: "Full-Time", hiringLead: "Marco James", Createdon: "Apr 1, 2021", status: "Active" },
    { id: 2, name: "22", jobOpening: "Backend Developer", type: "Part-Time", hiringLead: "Marco James", Createdon: "Apr 1, 2021", status: "Pending" },
    { id: 3, name: "9", jobOpening: "UI/UX Designer", type: "Contract", hiringLead: "Marco James", Createdon: "Apr 1, 2021", status: "Closed" },
    { id: 4, name: "10", jobOpening: "Data Scientist", type: "Internship", hiringLead: "Marco James", Createdon: "Apr 1, 2021", status: "Active" },
  ]);

  const [activeTab, setActiveTab] = useState('jobOpenings');

  return (
    <main className="space-y-4">
      {/* Tab Buttons */}
      <div className="relative flex items-center gap-8 border-b border-gray-300">
        <button
          onClick={() => setActiveTab('jobOpenings')}
          className={`py-2 px-4 ${activeTab === 'jobOpenings' ? 'text-black font-semibold' : 'text-gray-600'}`}
        >
          Job Openings
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`py-2 px-4 ${activeTab === 'candidates' ? 'text-black font-semibold' : 'text-gray-600'}`}
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
        <div className="p-4 bg-white flex flex-col rounded-lg border mt-4">
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
          
          {/* Job Openings Table */}
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
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50 text-[#0F172A] text-[14px]">
                    <td className="py-3 px-4 border-b"><span className="flex items-center gap-2"><FaUsers /> {candidate.name}</span></td>
                    <td className="py-3 px-4 border-b">{candidate.jobOpening}</td>
                    <td className="py-3 px-4 border-b">{candidate.type}</td>
                    <td className="py-3 px-4 border-b">{candidate.hiringLead}</td>
                    <td className="py-3 px-4 border-b">{candidate.Createdon}</td>
                    <td className="py-3 px-4 border-b">{candidate.status}</td>
                    <td className="py-3 px-4 border-b">
                      <span className="p-2 border w-8 rounded-md flex items-center justify-center cursor-pointer">
                        <FaChevronRight size={12} />
                      </span>
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="  mt-4">
           <div className='flex flex-row items-center gap-2 text-[22px] font-medium'>
            <FaUsers/>
            Candidates
           </div>
           <Candidatetable/>
        </div>
      )}
    </main>
  );
};

export default Hiring;
