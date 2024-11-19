import Link from 'next/link';
import Button from '../../../../components/Button';
import SingleAnnouncement from '../../../../components/SingleAnnouncement/SingleAnnouncement';
import { GiFlowerEmblem } from 'react-icons/gi';
import { HiSpeakerphone } from 'react-icons/hi';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiPlusCircleBold } from 'react-icons/pi';
import axiosInstance from '@/lib/axios';

// Define the announcement type
type Announcement = {
  id: string;
  title: string;
  status: 'Published' | 'Draft';
};

const fetchAnnouncements = async (
  status: string,
  page: number,
  size: number
): Promise<Announcement[]> => {
  try {
    const response = await axiosInstance.get('/announcement', {
      params: {
        status,
        page,
        size,
      },
    });
    return response.data; // Return only the `data` property
  } catch (error: any) {
    console.error(
      'Error fetching announcements:',
      error.response?.data || error.message || error
    );
    return []; // Return an empty array to prevent crashes
  }
};

const Page = async () => {
  const publishedAnnouncements = await fetchAnnouncements('Published', 1, 10);
  const draftAnnouncements = await fetchAnnouncements('Draft', 1, 10);

  return (
    <main className="space-y-8">
      {/* All Announcements */}
      <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
        <header className="px-4 flex items-center gap-4 justify-between">
          <h1 className="flex items-center gap-4 font-semibold text-xl mb-4">
            <HiSpeakerphone />
            Announcements
          </h1>
          <Link href="create-announcments">
            <Button
              name="Create Announcement"
              icon={<PiPlusCircleBold size={18} />}
              bg="black"
              textColor="white"
            />
          </Link>
        </header>
        <h6 className="my-2 opacity-35 font-medium text-sm px-4">This Week</h6>
        {publishedAnnouncements
          .filter((announcement) => announcement.status === 'Published')
          .map((announcement) => (
            <SingleAnnouncement
              key={announcement.id}
              bgColor="#00B87D"
              icon={<GiFlowerEmblem />}
              description={announcement.title || 'No title'}
            />
          ))}
      </section>

      {/* Drafts */}
      <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
        <h6 className="my-2 opacity-35 font-medium text-sm px-4">Drafts</h6>
        {draftAnnouncements
          .filter((announcement) => announcement.status === 'Draft')
          .map((announcement) => (
            <SingleAnnouncement
              key={announcement.id}
              bgColor=""
              icon={<IoCalendarOutline />}
              description={announcement.title || 'No title'}
            />
          ))}
      </section>
    </main>
  );
};

export default Page;
