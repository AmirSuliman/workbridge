import { IMAGES } from '@/constants/images';
import { getPolicyResponse } from '@/services/getPolicyResponse';
import { EmployeeData } from '@/types/employee';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';

interface PolicyItem {
  id: number;
  status: 'Accepted' | 'Not Accepted';
  employee: EmployeeData & {
    department: {
      id: number;
      name: string;
      employeeId: string;
    };
  };
}

const PolicyAcceptanceInfo = () => {
  const { policyId } = useParams();
  console.log(policyId, 'id');
  const [policyData, setPolicyData] = useState<PolicyItem[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleSendReminder = async (employeeIds: number, departmentId: number) => {
    try {
      setLoading(true);
  
      const payload = {
        policyId: policyId, 
        employeeIds: [employeeIds], 
        departmentId: departmentId, 
      };
  
      console.log('Payload:', payload); // Log the payload
  
      const response = await axiosInstance.post('/policy/send/', payload);
  
      toast.success('Reminder sent successfully!');
      console.log('Send reminder response:', response.data);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 500) {
          console.error('Server error details:', error.response.data); 
          toast.error('Server error. Please try again later.');
        } else {
          toast.error(error.response.data.message || 'Failed to send reminder.');
        }
      } else {
        toast.error('Failed to send reminder.');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 p-2 py-8 border rounded-[10px]">
      <h1 className="font-semibold text-[16px]">Employee Acceptance Info</h1>
      {policyData.length === 0 ? (
        <p>No data available.</p>
      ) : (
        policyData.map((item) => (
          <div
            key={item.id}
            className="flex flex-row items-center justify-between gap-8 w-full"
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
                className={`p-1 w-24 text-[12px] rounded ${
                  item.status === 'Accepted'
                    ? 'bg-[#D5F6DD] text-[#00B87D]'
                    : 'bg-[#FDCED3] text-[#F53649]'
                }`}
              >
                {item.status}
              </button>
              {item.status === 'Not Accepted' && (
                <button
                  type="button"
                  className="text-[9px]"
                  onClick={() =>
                    handleSendReminder(
                      item.employee.id,
                      item.employee.department.id 
                    )
                  }
                  disabled={loading}
                >
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