import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { HiSpeakerphone } from 'react-icons/hi';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiArrowUpRightThin } from 'react-icons/pi';
import imageLoader from '../../../../../imageLoader';
import { getPoliciesById } from '@/services/getAllPolicies';
import PolicyIcon from './PolicyIcon';

interface Policy {
  id: number;
  title: string;
  description?: string;
  type?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  fileId?: number | null;
  uploadBy?: string;
  effectiveDate?: string;
  totalEmployees?: number;
  employeeAccepted?: number;
  previewUrl?: string | null;
  users?: {
    firstName: string;
    lastName: string;
  };
  postedBy?: string; // Add this field
}

const HomePolicies = () => {
  const router = useRouter();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await getPoliciesById(1, 1000);
        const allPolicies = response.data?.data?.rows || [];

        if (!Array.isArray(allPolicies) || allPolicies.length === 0) {
          setError(null); // Clear previous errors
          setPolicies([]);
          return;
        }

        const formattedData = allPolicies
          .filter((item: any) => item.policy !== null)
          .map((item: any) => ({
            id: item.policy.id,
            title: item.policy.title,
            description: item.policy.description || 'No description available',
            type: item.policy.type || 'defaultType',
            status: item.status || 'Not Accepted',
            createdAt: item.createdAt || new Date().toISOString(),
            updatedAt: item.updatedAt || new Date().toISOString(),
            fileId: item.policy.fileId || null,
            uploadBy: item.policy.uploadBy || 'Unknown',
            effectiveDate: item.policy.effectiveDate || '',
            totalEmployees: item.policy.totalEmployees || 0,
            employeeAccepted: item.policy.employeeAccepted || 0,
            previewUrl: item.policy.previewUrl || null,
            postedBy: item.policy.users
              ? `${item.policy.users.firstName} ${item.policy.users.lastName}`
              : 'Unknown',
          }));

        const sortedData = formattedData
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 8);

        setPolicies(sortedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching pOolicies:', err);
        setError('Failed to fetch policies. Please try again later.');
        setPolicies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="p-6 bg-white rounded-[10px] border ">
        {' '}
        <h1 className="text-[18px] font-medium flex flex-row items-center gap-2 mb-4">
          <HiSpeakerphone size={22} />
          New Policies Update
        </h1>
        <section className="divide-y">
          {policies.length > 0 ? (
            policies.map((policy, index) => (
              <div
                key={index}
                className="flex flex-row items-center mb-4 justify-between w-full"
              >
                <div className="flex flex-row items-center gap-2">
                  {/* <Image
                    loader={imageLoader}
                    src="/annoucementIconRed.png"
                    alt="img"
                    width={40}
                    height={40}
                  /> */}
                  <PolicyIcon />
                  <div className="flex flex-col">
                    <p className="text-[14px] font-semibold">
                      {policy.title || ''}
                    </p>
                    <div className="flex flex-row items-center gap-5">
                      <p className="text-[12px]">
                        Posted by:{' '}
                        <span className="font-semibold">{policy.postedBy}</span>
                      </p>
                      <p className="text-[12px]">
                        Effective Date:
                        <span className="font-semibold">
                          {policy.effectiveDate
                            ? new Date(policy.effectiveDate).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )
                            : 'No Date Available'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/hr/home/policy/${policy.id}`)}
                  className="border rounded p-2 flex flex-row items-center gap-3 text-[10px] mt-8"
                >
                  View <PiArrowUpRightThin size={18} />
                </button>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center p-4">
              No policies available.
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default HomePolicies;
