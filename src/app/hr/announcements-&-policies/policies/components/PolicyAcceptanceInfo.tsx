import { IMAGES } from '@/constants/images';
import { getPolicyResponse } from '@/services/getPolicyResponse';
import { EmployeeData } from '@/types/employee';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface PolicyItem {
  id: number;
  status: 'Accepted' | 'Not Accepted';
  employee: EmployeeData;
}

const PolicyAcceptanceInfo = () => {
  const { policyId } = useParams();
  const [policyData, setPolicyData] = useState<PolicyItem[]>([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await getPolicyResponse(policyId);
        console.log('responses res: ', response.data);
        setPolicyData(response.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch policy responses.');
      }
    };

    fetchPolicies();
  }, [policyId]);

  return (
    <div className="flex flex-col gap-8 p-6 border rounded-[10px]">
      <h1 className="font-semibold text-[16px]">Employee Acceptance Info</h1>
      {policyData.length === 0 ? (
        <p>No data available.</p>
      ) : (
        policyData.map((item) => (
          <div
            key={item.id}
            className="flex flex-row items-center justify-between w-full"
          >
            <div className="flex flex-row items-center gap-2">
              <Image
                src={IMAGES.placeholderAvatar}
                alt="img"
                width={30}
                height={30}
                className="rounded-full"
              />
              <p className="text-[12px]">{item.employee.email}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className={`p-1 text-[12px] rounded ${
                  item.status === 'Accepted'
                    ? 'bg-[#D5F6DD] text-[#00B87D]'
                    : 'bg-[#FDCED3] text-[#F53649]'
                }`}
              >
                {item.status}
              </button>
              {item.status === 'Not Accepted' && (
                <button type="button" className="text-[9px]">
                  Send Reminder
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PolicyAcceptanceInfo;
