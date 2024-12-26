import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { FaBox, FaDownload } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';

const Policies = () => {
  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex flex-row items-center justify-between w-full mb-4">
        <div className="flex flex-row items-center gap-3">
          <FaBox size={24} />
          <h1 className="text-[18px] font-medium">All Policies</h1>
        </div>
        <button
          onClick={() => window.location.href = '/hr/Policies/Createnewpolicy'}
        className="flex flex-row items-center gap-2 bg-black p-2 rounded text-white text-[12px] hover:bg-gray-800">
          Create Policy <MdAddCircle size={22} />

        </button>
      </div>

      {/* Table */}
      <div className='overflow-x-auto w-full '>
      <table className="w-full  text-left mt-8 ">
        <thead className="text-[14px] font-normal">
          <tr>
            <th className="border-b text-gray-400 px-4 py-4">Policy Name</th>
            <th className="border-b text-gray-400 px-4 py-4">Date Issued</th>
            <th className="border-b text-gray-400 px-4 py-4">Policy Type</th>
            <th className="border-b text-gray-400 px-4 py-4">Uploaded By</th>
            <th className="border-b text-gray-400 px-4 py-4 ">Accepted By</th>
            <th className="border-b text-gray-400 px-4 py-4  flex  justify-end items-center ">
              <span className='items-center gap-2  p-2 bg-gray-100 rounded flex flex-row'><FaDownload/> Download</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Rows */}
          <tr>
            <td className="border-b border-gray-300 p-4 text-[14px]">Policy 1</td>
            <td className="border-b border-gray-300 p-4 text-[14px]">2024-12-25</td>
            <td className="border-b border-gray-300 p-4 text-[14px]">HR</td>
            <td className="border-b border-gray-300 p-4 text-[14px]">John Doe</td>
            <td className="border-b border-gray-300 p-4 text-[14px]">1/6 employees</td>
            <td className="border-b border-gray-300 p-4 text-[14px] cursor-pointer flex justify-end items-center">
              <span className=" w-[30px] border border-gray-400 rounded-md flex items-center justify-center">
                <BiChevronRight size={22} />
              </span>
            </td>         
          </tr>
          <tr>
            <td className="border-b border-gray-300 p-4 text-[14px]">Policy 1</td>
            <td className="border-b border-gray-300 p-4 text-[14px]">2024-12-25</td>
            <td className="border-b border-gray-300 p-4 text-[14px]">HR</td>
            <td className="border-b border-gray-300 p-4 text-[14px]">John Doe</td>
            <td className="border-b border-gray-300 p-4 text-[14px]">3/6 employees</td>
            <td className="border-b border-gray-300 p-4 text-[14px] cursor-pointer flex justify-end items-center">
              <span className=" w-[30px] border border-gray-400 rounded-md flex items-center justify-center">
                <BiChevronRight size={22} />
              </span>
            </td>         
          </tr>
         
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Policies;
