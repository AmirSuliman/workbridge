'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Button from '../../../../components/Button';
import SingleAnnouncement from '../../../../components/SingleAnnouncement/SingleAnnouncement';
import { GiFlowerEmblem } from 'react-icons/gi';
import { HiSpeakerphone } from 'react-icons/hi';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiPlusCircleBold } from 'react-icons/pi';
import axiosInstance from '@/lib/axios';
import { useEffect, useState } from 'react';
import { Pagination } from '@/components/common/Pagination';
import { useRouter } from 'next/navigation';

type Announcement = {
  id: string;
  title: string;
  status: 'Published' | 'Draft';
};

const fetchAnnouncements = async (
  status: string,
  page: number,
  size: number,
  token: string
): Promise<{ announcements: Announcement[]; total: number }> => {
  try {
    const response = await axiosInstance.get('/announcements', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        status,
        page,
        size,
      },
    });
    console.log(`Fetched ${status} announcements:`, response.data); // Log the response
    return {
      announcements: response.data.data.items || [], // Extract 'items' from 'data'
      total: response.data.data.total || 0, // Ensure total count is provided
    };
  } catch (error: any) {
    console.error(
      'Error fetching announcements:',
      error.response?.data || error.message || error
    );
    return { announcements: [], total: 0 }; // Return empty data and total
  }
};

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [publishedAnnouncements, setPublishedAnnouncements] = useState<
    Announcement[]
  >([]);
  const [draftAnnouncements, setDraftAnnouncements] = useState<Announcement[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPublishedAnnouncements, setTotalPublishedAnnouncements] =
    useState(0);
  const [, setTotalDraftAnnouncements] = useState(0);
  const pageSize = 20; // Set page size for pagination

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.accessToken) {
      const fetchData = async () => {
        const publishedData = await fetchAnnouncements(
          'Published',
          currentPage,
          pageSize,
          session.user.accessToken
        );
        const draftsData = await fetchAnnouncements(
          'Draft',
          currentPage,
          pageSize,
          session.user.accessToken
        );

        setPublishedAnnouncements(publishedData.announcements);
        setDraftAnnouncements(draftsData.announcements);
        setTotalPublishedAnnouncements(publishedData.total);
        setTotalDraftAnnouncements(draftsData.total);
      };
      fetchData();
    }
  }, [status, session?.user?.accessToken, currentPage]); // Re-run when session changes or page changes

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage); // Update current page when pagination button is clicked
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You are not logged in</div>;
  }

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
        {/* Ensure publishedAnnouncements is an array before mapping */}
        {Array.isArray(publishedAnnouncements) &&
          publishedAnnouncements.map((announcement) => (
            <SingleAnnouncement
              key={announcement.id}
              bgColor="#00B87D"
              icon={<GiFlowerEmblem />}
              description={announcement.title || 'No title'}
              onClick={() => router.push(`announcement/${announcement.id}`)}
            />
          ))}
      </section>

      {/* Drafts */}
      <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
        <h6 className="my-2 opacity-35 font-medium text-sm px-4">Drafts</h6>
        {/* Ensure draftAnnouncements is an array before mapping */}
        {Array.isArray(draftAnnouncements) &&
          draftAnnouncements.map((announcement) => (
            <SingleAnnouncement
              key={announcement.id}
              bgColor=""
              icon={<IoCalendarOutline />}
              description={announcement.title || 'No title'}
              onClick={() => router.push(`announcement/${announcement.id}`)}
            />
          ))}
      </section>

      {/* Pagination Component */}
      <Pagination
        styles={{ container: 'mt-5 gap-x-2 !justify-end' }}
        totalItems={totalPublishedAnnouncements}
        pageSize={pageSize}
        currentPage={currentPage}
        maxPagesToShow={4} // Show up to 5 pages at once
        setCurrentPage={handlePageChange}
      />
    </main>
  );
};

export default Page;
