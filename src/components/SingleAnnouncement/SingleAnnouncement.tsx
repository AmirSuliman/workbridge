import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import IconWithBg from './IconWithBg';
import { IoCalendarOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { BiLoaderCircle } from 'react-icons/bi';
import { getSession } from 'next-auth/react';

interface Announcement {
  id: number;
  description: string;
  icon: JSX.Element;
  bgColor: string;
  createdAt: string;
  title: string;
}

const SingleAnnouncement = () => {
  const router = useRouter();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string>();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role);
    };

    fetchSession();
  }, []);

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosInstance.get('/announcements');
        const data = response.data?.data?.items || [];
        console.log(response, 'res');

        if (Array.isArray(data)) {
          const formattedData = data.map((item: any) => ({
            id: item.id,
            description: item.body || 'No description available',
            icon: <IoCalendarOutline />,
            createdAt: item.createdAt || new Date().toISOString(),
            title: item.title,
            bgColor: '#00B87D', // Added default bgColor
          }));

          const sortedData = formattedData
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 8);

          setAnnouncements(sortedData);
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
      <div className="flex justify-center items-center p-4">
        <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  // /home/home/announcement/
  return (
    <div>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <article
            key={announcement.id}
            onClick={() =>
              router.push(
                isUserPanel
                  ? `/user/home/announcement/${announcement.id}`
                  : `/hr/announcements-&-policies/announcements/${announcement.id}`
              )
            }
            className="flex items-center flex-wrap md:flex-nowrap gap-3 py-3 px-4 cursor-pointer hover:bg-background"
          >
            <IconWithBg icon={announcement.icon} />
            <div className="flex flex-col gap-1">
              <p className="text-sm">{announcement.title}</p>
              <p className="opacity-50 font-medium text-[12px]">
                {announcement.createdAt
                  ? new Date(announcement.createdAt).toLocaleDateString()
                  : 'Date not available'}
              </p>
            </div>
          </article>
        ))
      ) : (
        <div>No announcements available.</div>
      )}
    </div>
  );
};

export default SingleAnnouncement;
