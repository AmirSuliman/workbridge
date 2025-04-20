'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { getPolicy } from '@/services/getPolicy';
import PreviewPolicy from '@/app/hr/announcements-&-policies/policies/components/PreviewPolicy';
const Page = () => {
  const { policyId } = useParams();
  const [policyData, setPolicyData] = useState({});

  useEffect(() => {
    const fetchPolicie = async () => {
      try {
        const response = await getPolicy(policyId);
        setPolicyData(response.data.data || {});
        console.log('policy res: ', response.data.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch policy.');
      }
    };

    fetchPolicie();
  }, []);
  console.log('policyData: ', policyData);

  return (
    <div className="top-0 min-h-screen left-0 right-0 bottom-0 bg-[#000000]/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="max-w-4xl  p-4 bg-white rounded-lg mb-4 mt-4">
        <header className=" mt-3 flex items-center gap-4 justify-between pb-4 border-b-[1px] border-[#E0E0E0]">
          <h2 className="font-semibold text-lg">Policy</h2>
        </header>

        <PreviewPolicy previewData={policyData} />
      </div>
    </div>
  );
};

export default Page;
