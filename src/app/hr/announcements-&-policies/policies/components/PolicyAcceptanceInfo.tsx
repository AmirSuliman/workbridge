import { getPolicyResponse } from '@/services/getPolicyResponse';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const PolicyAcceptanceInfo = () => {
  const { policyId } = useParams();
  const [policyData, setPolicyData] = useState({});

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await getPolicyResponse(policyId);
        setPolicyData(response.data || {});
        console.log('policy res: ', response.data.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch policy responses.');
      }
    };

    fetchPolicies();
  }, []);
  console.log('policyData: ', policyData);

  return (
    <div className="flex flex-col gap-8 p-6 border rounded-[10px] ">
      <h1 className="font-semibold text-[16px]">Employee acceptance info</h1>
      <div className="flex flex-row items-center justify-between w-full ">
        <div className="flex flex-row items-center gap-2 ">
          <Image src="/user.png" alt="img" width={30} height={30} />
          <p className="text-[12px]">Darlene Robertson</p>
        </div>
        <button className="p-1 text-[12px] bg-[#D5F6DD] text-[#00B87D] rounded ">
          Accepted
        </button>
      </div>
      <div className="flex flex-row items-center justify-between w-full ">
        <div className="flex flex-row items-center gap-2 ">
          <Image src="/user.png" alt="img" width={30} height={30} />
          <p className="text-[12px]">Darlene Robertson</p>
        </div>
        <button className="p-1 text-[12px] bg-[#D5F6DD] text-[#00B87D] rounded ">
          Accepted
        </button>
      </div>
      <div className="flex flex-row items-center justify-between w-full ">
        <div className="flex flex-row items-center gap-2 ">
          <Image src="/user.png" alt="img" width={30} height={30} />
          <p className="text-[12px]">Darlene Robertson</p>
        </div>
        <button className="p-1 text-[12px] bg-[#D5F6DD] text-[#00B87D] rounded ">
          Accepted
        </button>
      </div>
      <div className="flex flex-row items-center justify-between w-full ">
        <div className="flex flex-row items-center gap-2 ">
          <Image src="/user.png" alt="img" width={30} height={30} />
          <p className="text-[12px]">Darlene Robertson</p>
        </div>
        <button className="p-1 text-[12px] bg-[#D5F6DD] text-[#00B87D] rounded ">
          Accepted
        </button>
      </div>
      <div className="flex flex-row items-center justify-between w-full ">
        <div className="flex flex-row items-center gap-2 ">
          <Image src="/user.png" alt="img" width={30} height={30} />
          <p className="text-[12px]">Darlene Robertson</p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="p-1 text-[12px] bg-[#FDCED3] text-[#F53649] rounded ">
            Not Accepted
          </button>
          <p className="text-[9px]">Send reminder</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full ">
        <div className="flex flex-row items-center gap-2 ">
          <Image src="/user.png" alt="img" width={30} height={30} />
          <p className="text-[12px]">Darlene Robertson</p>
        </div>
        <div className="flex flex-col gap-2 items-end-end">
          <button className="p-1 text-[12px] bg-[#FDCED3] text-[#F53649] rounded ">
            Not Accepted
          </button>
          <p className="text-[9px]">Send reminder</p>
        </div>
      </div>
    </div>
  );
};
export default PolicyAcceptanceInfo;
