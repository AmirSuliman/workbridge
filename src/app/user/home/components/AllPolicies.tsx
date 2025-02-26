import { getAllPolicies } from '@/services/getAllPolicies';
import { Policy } from '@/types/policy';
import { getTimeAgo } from '@/utils/timeAgo';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaArrowUp } from 'react-icons/fa';
import { HiSpeakerphone } from 'react-icons/hi';
import { IoCalendarOutline } from 'react-icons/io5';
import imageLoader from '../../../../../imageLoader';

const AllPolicies = () => {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Policy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAllPolicies(1, 1000);
        const allPolicies = response.data.data.items || [];
        console.log('policies: ', allPolicies);
        if (Array.isArray(allPolicies)) {
          const formattedData = allPolicies.map((item: any) => ({
            id: item.id,
            description: item.body || 'No description available',
            icon: <IoCalendarOutline />,
            createdAt: item.createdAt || new Date().toISOString(),
            title: item.title,
            bgColor: '#00B87D', // Added default bgColor
            type: item.type || 'defaultType',
            fileId: item.fileId || 'defaultFileId',
            status: item.status || 'defaultStatus',
            uploadBy: item.uploadBy || 'defaultUploadBy',
            updatedAt: item.updatedAt || new Date().toISOString(),
            createdBy: item.createdBy || 'defaultCreatedBy',
            updatedBy: item.updatedBy || 'defaultUpdatedBy',
            previewUrl: item.previewUrl || 'defaultPreviewUrl',
            effectiveDate: item.effectiveDate || '',
            totalEmployees: item.totalEmployees || 0,
            employeeAccepted: item.employeeAccepted || 0,
            users: item.users || {},
          }));

          setAnnouncements(formattedData);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching policies:', err);
        setError('Failed to fetch policies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
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
    <div className="p-6 bg-white rounded-[10px] border ">
      {' '}
      <h1 className="text-[18px] font-medium flex flex-row items-center gap-2 mb-4">
        <HiSpeakerphone size={22} />
        New Policies Update
      </h1>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="flex flex-col gap-6 p-4 rounded border mt-8 "
          >
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-[14px] font-semibold uppercase">
                {announcement.title || ''}
              </h1>
              <p className="text-[12px] text-gray-400">
                {getTimeAgo(announcement.updatedAt || '')}
              </p>
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-5">
                <Image
                  loader={imageLoader}
                  src="/Group 1000004576.png"
                  alt="img"
                  width={15}
                  height={15}
                />
                <p className="text-[12px]">
                  Posted by:{' '}
                  <span className="font-semibold">
                    {announcement?.users
                      ? `${announcement.users.firstName || ''} ${
                          announcement.users.lastName || ''
                        }`
                      : 'Unknown'}
                  </span>
                </p>
                <p className="text-[12px]">
                  Effective Date:{' '}
                  <span className="font-semibold">
                    {new Date(announcement.effectiveDate).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </span>
                </p>
              </div>
              <button
                onClick={() =>
                  router.push(`/user/home/policy/${announcement.id}`)
                }
                className="border p-2 px-3 text-[12px] rounded flex flex-row items-center gap-2 "
              >
                View <FaArrowUp style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No announcements available.</div>
      )}
    </div>
  );
};

export default AllPolicies;
