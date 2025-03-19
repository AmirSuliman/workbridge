import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';

interface Announcement {
  id: number;
  description: string;
  icon: JSX.Element;
  bgColor: string;
  createdAt: string;
  title: string;
}

const Announcements = () => {
  const router = useRouter();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosInstance.get('/announcements');
        const data = response.data?.data?.items || [];
        const publishedAnnouncements = data.filter(
          (item) => item.status === 'Published'
        );
        setAnnouncements(publishedAnnouncements);
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

  return (
    <div className="p-6 bg-white rounded-[10px] w-full border">
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <article
            key={announcement.id}
            onClick={() =>
              router.push(`/user/home/announcement/${announcement.id}`)
            }
            className="flex items-center flex-wrap md:flex-nowrap gap-3 py-3 px-4 cursor-pointer hover:bg-background"
          >
            <svg
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20.3726" cy="20.9238" r="20" fill="#0F172A" />
              <path
                d="M15.1285 23.1318C15.1285 22.6745 15.4992 22.3038 15.9565 22.3038H15.9676C16.4249 22.3038 16.7956 22.6745 16.7956 23.1318V23.1429C16.7956 23.6002 16.4249 23.9709 15.9676 23.9709H15.9565C15.4992 23.9709 15.1285 23.6002 15.1285 23.1429V23.1318Z"
                fill="white"
              />
              <path
                d="M15.9565 24.5118C15.4992 24.5118 15.1285 24.8826 15.1285 25.3398V25.3509C15.1285 25.8082 15.4992 26.1789 15.9565 26.1789H15.9676C16.4249 26.1789 16.7956 25.8082 16.7956 25.3509V25.3398C16.7956 24.8826 16.4249 24.5118 15.9676 24.5118H15.9565Z"
                fill="white"
              />
              <path
                d="M17.3365 23.1318C17.3365 22.6745 17.7073 22.3038 18.1646 22.3038H18.1756C18.6329 22.3038 19.0036 22.6745 19.0036 23.1318V23.1429C19.0036 23.6002 18.6329 23.9709 18.1756 23.9709H18.1646C17.7073 23.9709 17.3365 23.6002 17.3365 23.1429V23.1318Z"
                fill="white"
              />
              <path
                d="M18.1646 24.5118C17.7073 24.5118 17.3365 24.8826 17.3365 25.3398V25.3509C17.3365 25.8082 17.7073 26.1789 18.1646 26.1789H18.1756C18.6329 26.1789 19.0036 25.8082 19.0036 25.3509V25.3398C19.0036 24.8826 18.6329 24.5118 18.1756 24.5118H18.1646Z"
                fill="white"
              />
              <path
                d="M19.5446 20.9238C19.5446 20.4665 19.9153 20.0958 20.3726 20.0958H20.3836C20.8409 20.0958 21.2116 20.4665 21.2116 20.9238V20.9349C21.2116 21.3922 20.8409 21.7629 20.3836 21.7629H20.3726C19.9153 21.7629 19.5446 21.3922 19.5446 20.9349V20.9238Z"
                fill="white"
              />
              <path
                d="M20.3726 22.3038C19.9153 22.3038 19.5446 22.6745 19.5446 23.1318V23.1429C19.5446 23.6002 19.9153 23.9709 20.3726 23.9709H20.3836C20.8409 23.9709 21.2116 23.6002 21.2116 23.1429V23.1318C21.2116 22.6745 20.8409 22.3038 20.3836 22.3038H20.3726Z"
                fill="white"
              />
              <path
                d="M19.5446 25.3398C19.5446 24.8826 19.9153 24.5118 20.3726 24.5118H20.3836C20.8409 24.5118 21.2116 24.8826 21.2116 25.3398V25.3509C21.2116 25.8082 20.8409 26.1789 20.3836 26.1789H20.3726C19.9153 26.1789 19.5446 25.8082 19.5446 25.3509V25.3398Z"
                fill="white"
              />
              <path
                d="M22.5806 20.0958C22.1233 20.0958 21.7526 20.4665 21.7526 20.9238V20.9349C21.7526 21.3922 22.1233 21.7629 22.5806 21.7629H22.5916C23.0489 21.7629 23.4196 21.3922 23.4196 20.9349V20.9238C23.4196 20.4665 23.0489 20.0958 22.5916 20.0958H22.5806Z"
                fill="white"
              />
              <path
                d="M21.7526 23.1318C21.7526 22.6745 22.1233 22.3038 22.5806 22.3038H22.5916C23.0489 22.3038 23.4196 22.6745 23.4196 23.1318V23.1429C23.4196 23.6002 23.0489 23.9709 22.5916 23.9709H22.5806C22.1233 23.9709 21.7526 23.6002 21.7526 23.1429V23.1318Z"
                fill="white"
              />
              <path
                d="M22.5806 24.5118C22.1233 24.5118 21.7526 24.8826 21.7526 25.3398V25.3509C21.7526 25.8082 22.1233 26.1789 22.5806 26.1789H22.5916C23.0489 26.1789 23.4196 25.8082 23.4196 25.3509V25.3398C23.4196 24.8826 23.0489 24.5118 22.5916 24.5118H22.5806Z"
                fill="white"
              />
              <path
                d="M23.9606 20.9238C23.9606 20.4665 24.3313 20.0958 24.7886 20.0958H24.7996C25.2569 20.0958 25.6276 20.4665 25.6276 20.9238V20.9349C25.6276 21.3922 25.2569 21.7629 24.7996 21.7629H24.7886C24.3313 21.7629 23.9606 21.3922 23.9606 20.9349V20.9238Z"
                fill="white"
              />
              <path
                d="M24.7886 22.3038C24.3313 22.3038 23.9606 22.6745 23.9606 23.1318V23.1429C23.9606 23.6002 24.3313 23.9709 24.7886 23.9709H24.7996C25.2569 23.9709 25.6276 23.6002 25.6276 23.1429V23.1318C25.6276 22.6745 25.2569 22.3038 24.7996 22.3038H24.7886Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.6805 12.0918C16.1378 12.0918 16.5085 12.4625 16.5085 12.9198V14.2998H24.2366V12.9198C24.2366 12.4625 24.6073 12.0918 25.0646 12.0918C25.5219 12.0918 25.8926 12.4625 25.8926 12.9198V14.2998H26.1686C27.8453 14.2998 29.2046 15.6591 29.2046 17.3358V26.7198C29.2046 28.3966 27.8453 29.7559 26.1686 29.7559H14.5765C12.8998 29.7559 11.5405 28.3966 11.5405 26.7198V17.3358C11.5405 15.6591 12.8998 14.2998 14.5765 14.2998H14.8525V12.9198C14.8525 12.4625 15.2232 12.0918 15.6805 12.0918ZM14.5765 18.1638C13.8144 18.1638 13.1965 18.7817 13.1965 19.5438V26.7198C13.1965 27.482 13.8144 28.0999 14.5765 28.0999H26.1686C26.9307 28.0999 27.5486 27.482 27.5486 26.7198V19.5438C27.5486 18.7817 26.9307 18.1638 26.1686 18.1638H14.5765Z"
                fill="white"
              />
            </svg>

            <div className="flex flex-col gap-1">
              <p className="text-sm">{announcement.title}</p>
            </div>
            {/* <p>{getTimeAgo(announcement.createdAt)}</p> */}
          </article>
        ))
      ) : (
        <div>No announcements available.</div>
      )}
    </div>
  );
};

export default Announcements;
