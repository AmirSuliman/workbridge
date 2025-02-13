'use client';
import { FaArrowUp, FaBullhorn } from 'react-icons/fa';
import AllPolicies from '../components/AllPolicies';
import Image from 'next/image';
import Announcements from '../components/Announcements';

const Allannouncments = () => {
  return (
    <div className="p-6 flex flex-col gap-6 w-full">
      <AllPolicies />
      {/* <div className="p-6 bg-white rounded-[10px] w-full border">
        <div className="flex flex-row items-center gap-3 ">
          <FaBullhorn size={26} />
          <h1 className="text-[22px] font-medium">Announcements</h1>
        </div>
        <p className="text-[14px] text-gray-400 mt-6 ">This Week</p>

        <table className="w-full p-4 mt-6 ">
          <tr className="w-full border-b text-[14px] p-3">
            <td className="p-4">
              Upcoming holiday on 31.12.2024 - Happy New years!
            </td>
            <td className="text-gray-400 p-4">2 days ago</td>
          </tr>

          <tr className="w-full border-b text-[14px] p-3">
            <td className="p-4">
              Upcoming holiday on 31.12.2024 - Happy New years!
            </td>
            <td className="text-gray-400 p-4">2 days ago</td>
          </tr>

          <tr className="w-full border-b text-[14px] p-3">
            <td className="p-4">
              Upcoming holiday on 31.12.2024 - Happy New years!
            </td>
            <td className="text-gray-400 p-4">2 days ago</td>
          </tr>

          <tr className="w-full border-b text-[14px] p-3">
            <td className="p-4">
              Upcoming holiday on 31.12.2024 - Happy New years!
            </td>
            <td className="text-gray-400 p-4">2 days ago</td>
          </tr>
        </table>
      </div> */}

      <Announcements />

      <div className="p-6 bg-white rounded-[10px] w-full border">
        <h1 className="text-[18px]  text-gray-400">More Announcements</h1>

        <table className="w-full p-4 mt-6 ">
          <tr className="w-full border-b text-[14px] p-3">
            <td className="p-4">
              Upcoming holiday on 31.12.2024 - Happy New years!
            </td>
            <td className="text-gray-400 p-4">2 days ago</td>
          </tr>

          <tr className="w-full border-b text-[14px] p-3">
            <td className="p-4">
              Upcoming holiday on 31.12.2024 - Happy New years!
            </td>
            <td className="text-gray-400 p-4">2 days ago</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Allannouncments;
