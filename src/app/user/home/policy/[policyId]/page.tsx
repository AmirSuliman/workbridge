'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { getPolicy } from '@/services/getPolicy';
import { getPolicybyIdempId } from '@/services/getPolicy';
import ViewPolicy from '@/app/hr/announcements-&-policies/policies/components/Viewpolicy';
const Page = () => {
  const { policyId } = useParams();
  const [policyData, setPolicyData] = useState({});

  useEffect(() => {
    const fetchPolicie = async () => {
      try {
        const response = await getPolicybyIdempId(policyId);
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
    <div className=" p-4 bg-white rounded-lg m-4">
      <header className=" mt-3 flex items-center gap-4 justify-between pb-4 border-b-[1px] border-[#E0E0E0]">
        <h2 className="font-semibold text-lg">Policy</h2>
      </header>

      <ViewPolicy previewData={policyData} />
    </div>
  );
};

export default Page;
