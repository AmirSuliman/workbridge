import React from 'react';
import { BiChevronRight } from 'react-icons/bi';

const Evaluationlist = () => {
  return (
    <div className="bg-white p-6 rounded-[10px] border">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2">Evaluations List</div>
        <div className="flex flex-row items-center gap-4">
          <div className="text-[12px] text-gray-400 flex flex-row items-center gap-2">
            Sort
            <select className="p-2 text-[12px] border rounded text-gray-700">
              <option value="2024-01-01">Select</option>
              <option value="2024-02-01">By ID</option>
              <option value="2024-03-01">Hire Date</option>
              <option value="2024-04-01">Name</option>
            </select>
          </div>
          <button className="p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2">
            Send Survey
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className='overflow-x-auto'>
      <table className="min-w-full mt-4 table-auto">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 text-[14px] text-gray-400">Sent by</th>
            <th className="text-left p-4 text-[14px] text-gray-400">Employee</th>
            <th className="text-left p-4 text-[14px] text-gray-400">Department</th>
            <th className="text-left p-4 text-[14px] text-gray-400">Date</th>
            <th className="text-left p-4 text-[14px] text-gray-400">Status</th>
            <th className=" p-4 text-[12px] text-gray-600"></th>

          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-4 text-[14px] text-gray-800">Juliette Nicolas</td>
            <td className="p-4 text-[14px] text-gray-800">Darlene Robertson</td>
            <td className="p-4 text-[14px] text-gray-800">Marketing</td>
            <td className="p-4 text-[14px] text-gray-800">12/11/2024</td>
            <td className="p-4 text-[14px] text-gray-800">Draft</td>
            <td className="p-4 text-[14px] text-gray-800 text-end"><button className='flex flex-row items-center gap-3 p-1 px-3 border rounded'>View<BiChevronRight/></button></td>
          </tr>
          <tr className="border-b">
            <td className="p-4 text-[14px] text-gray-800">Juliette Nicolas</td>
            <td className="p-4 text-[14px] text-gray-800">Darlene Robertson</td>
            <td className="p-4 text-[14px] text-gray-800">Marketing</td>
            <td className="p-4 text-[14px] text-gray-800">12/11/2024</td>
            <td className="p-4 text-[14px] text-gray-800">In progress</td>
            <td className="p-4 text-[14px] text-gray-800 text-end"><button className='flex flex-row items-center gap-3 p-1 px-3 border rounded'>View<BiChevronRight/></button></td>
          </tr>
          <tr className="border-b">
            <td className="p-4 text-[14px] text-gray-800">Juliette Nicolas</td>
            <td className="p-4 text-[14px] text-gray-800">Darlene Robertson</td>
            <td className="p-4 text-[14px] text-gray-800">Marketing</td>
            <td className="p-4 text-[14px] text-gray-800">12/11/2024</td>
            <td className="p-4 text-[14px] text-green-500">Completed</td>
            <td className="p-4 text-[14px] text-gray-800 text-end"><button className='flex flex-row items-center gap-3 p-1 px-3 border rounded'>View<BiChevronRight/></button></td>
          </tr>
          
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Evaluationlist;
