import axiosInstance from '@/lib/axios';
import { RootState } from '@/store/store';
import { Announcement } from '@/types/common';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { AnnouncementImage } from './AnnouncementImage';

const SingleAnnouncement = () => {
  const router = useRouter();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.myInfo);
  const role = user?.user?.role;

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosInstance.get('/announcements');
        const data = response.data?.data?.items || [];

        if (Array.isArray(data)) {
          const formattedData = data.map((item: any) => ({
            id: item.id,
            description: item.body || 'No description available',
            createdAt: item.createdAt || new Date().toISOString(),
            title: item.title,
            type: item.type,
            status: item.status || 'Draft', // Added status property
          }));

          const sortedData = formattedData
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 8);

          setAnnouncements(sortedData as Announcement[]);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to fetch announcements. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center p-4'>
        <BiLoaderCircle className='h-5 w-5 duration-100 animate-spin' />
      </div>
    );
  }

  if (error) {
    return <div className='text-red-500 p-4'>{error}</div>;
  }

  return (
    <div>
      {announcements.length > 0 ? (
        announcements.map((announcement, index) => (
          <div key={announcement.id}>
            <article
              onClick={() =>
                router.push(
                  isUserPanel
                    ? `/user/home/announcement/${announcement.id}`
                    : `/hr/announcements-&-policies/announcements/${announcement.id}`
                )
              }
              className='flex items-center flex-wrap md:flex-nowrap gap-3 py-3 px-4 cursor-pointer hover:bg-background'
            >
              <AnnouncementImage type={announcement.type} />
              <div className='flex flex-row  items-center justify-between gap-1 w-full'>
                <p className='text-sm'>{announcement.title}</p>
                <p className='opacity-50 font-medium text-[12px]'>
                  {announcement.createdAt
                    ? new Date(announcement.createdAt).toLocaleDateString()
                    : 'Date not available'}
                </p>
              </div>
            </article>
            {index !== announcements.length - 1 && (
              <hr className='border-gray-300' />
            )}
          </div>
        ))
      ) : (
        <div className='p-4'>No announcements available.</div>
      )}
    </div>
  );
};

export default SingleAnnouncement;
