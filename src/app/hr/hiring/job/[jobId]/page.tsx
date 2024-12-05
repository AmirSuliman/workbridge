'use client';

import ScreenLoader from '@/components/common/ScreenLoader';
import { IMAGES } from '@/constants/images';
import axiosInstance from '@/lib/axios';
import { JobListing } from '@/types/job';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { FaEdit, FaUsers } from 'react-icons/fa';

const SingleJob = () => {
  const { jobId } = useParams();
  const [singleJobData, setSingleJobData] = useState<JobListing | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`openPosition/${jobId}`, {
          params: {
            associations: true,
          },
        });
        console.log('Single job: ', data);
        setSingleJobData(data);
        // toast.success()
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchSingleJob();
  }, []);

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <main className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3 text-[22px] text-[#0F172A] font-semibold">
          <img src="/jobicon.png" alt="img" className="w-5" />
          {singleJobData?.data.tittle || 'N/A'}
        </div>
        <button className="bg-[#0F172A] p-3 rounded-lg text-white flex flex-row gap-4 items-center">
          Edit Job Posting <FaEdit />{' '}
        </button>
      </div>

      <div className="flex flex-row items-start justify-between gap-6 w-full">
        <div className="flex flex-col gap-2 p-4 border bg-white w-[70%] rounded-lg">
          <p className="text-[12px] text-gray-400">Description</p>
          <h1 className="text-[#0F172A] text-[16px]">
            {singleJobData?.data.description || 'N/A'}
          </h1>
          <div className="w-full h-[2px] bg-gray-300 mt-5" />
          <div className="flex flex-row items-center justify-between mt-6">
            <div className="flex flex-row gap-10 items-center">
              <div className="flex flex-col ">
                <p className="text-[12px] text-gray-400">Status</p>
                <h1 className="text-[#0F172A] text-[16px] font-medium">
                  {singleJobData?.data.status || 'N/A'}
                </h1>
              </div>
              <div className="flex flex-col ">
                <p className="text-[12px] text-gray-400">Open for</p>
                <h1 className="text-[#0F172A] text-[16px] font-medium">
                  21 days
                </h1>
              </div>
            </div>
            <button className="bg-[#0F172A] rounded-lg p-3 text-white text-[12px]">
              See full job opening
            </button>
          </div>
        </div>

        <div className="flex flex-col p-4 border bg-white w-[30%] rounded-lg ">
          <div className="flex flex-row gap-3 items-center mb-4">
            <Image
              src={
                singleJobData?.data.hiringLead.profilePictureUrl ||
                IMAGES.placeholderAvatar
              }
              alt="user avatar"
              height={2000}
              width={2000}
              className="size-12 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-gray-400 font-medium text-[12px]">
                Hiring Lead
              </p>
              <h1 className="text-[16px]">{`${singleJobData?.data.hiringLead.firstName} ${singleJobData?.data.hiringLead.lastName}`}</h1>
              <p className="text-gray-400 font-medium text-[12px]">
                {singleJobData?.data.hiringLead.tittle}
              </p>
            </div>
          </div>

          {/* <p className="underline">See full hiring leads</p> */}
        </div>
      </div>

      <div className="p-4 bg-white mt-8 rounded-lg border">
        <div className="flex flex-row items-center justify-between p-2 mb-8">
          <div className="flex flex-row items-center gap-4 text-[18px] font-medium">
            <FaUsers />
            Candidates (4)
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-gray-600 font-medium">Sort</p>
            <select className="border border-gray-300 rounded-lg p-2 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="asc">Select</option>
              <option value="desc">Descending</option>
              <option value="nameAZ">A-Z</option>
              <option value="nameZA">Z-A</option>
            </select>
          </div>
        </div>
        {/* Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="text-gray-400 font-medium p-4">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium ">
                Candidate Information
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium ">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Applied
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Sample Rows */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                John Bourgie
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Interview Round 2
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                No rating yet
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                24.03.2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                john.borgie@gmail.com
              </td>
              <td className="px-6 py-4">
                <span className="border border-gray-300 rounded-lg p-2 flex items-center justify-center hover:bg-gray-100 cursor-pointer">
                  <BiChevronRight className="text-gray-600 text-lg" />
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                John Bourgie
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Interview Round 2
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                No rating yet
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                24.03.2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                john.borgie@gmail.com
              </td>
              <td className="px-6 py-4">
                <span className="border border-gray-300 rounded-lg p-2 flex items-center justify-center hover:bg-gray-100 cursor-pointer">
                  <BiChevronRight className="text-gray-600 text-lg" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default SingleJob;
