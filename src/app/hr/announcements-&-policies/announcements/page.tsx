'use client';

import axiosInstance from '@/lib/axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiSpeakerphone } from 'react-icons/hi';
import { PiPlusCircleBold } from 'react-icons/pi';
import Button from '../../../../components/Button';
import SingleAnnouncement from '../../../../components/SingleAnnouncement/SingleAnnouncement';
import Policies from '../policies/components/policies';

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
    console.log(`Fetched ${status} announcements:`, response.data);
    return {
      announcements: response.data.data.items || [],
      total: response.data.data.total || 0,
    };
  } catch (error: any) {
    console.error(
      'Error fetching announcements:',
      error.response?.data || error.message || error
    );
    return { announcements: [], total: 0 };
  }
};

const Page = () => {
  const { data: session, status } = useSession();
  const [currentTab, setCurrentTab] = useState('Announcements'); // Handle active tab
  const [publishedAnnouncements, setPublishedAnnouncements] = useState<
    Announcement[]
  >([]);
  const [draftAnnouncements, setDraftAnnouncements] = useState<Announcement[]>(
    []
  );
  const [currentPage] = useState(1);
  const [, setTotalPublishedAnnouncements] = useState(0);
  const [, setTotalDraftAnnouncements] = useState(0);
  const pageSize = 20;

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
  }, [status, session?.user?.accessToken, currentPage]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You are not logged in</div>;
  }

  return (
    <main className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <button
          className={`px-4 py-2 ${
            currentTab === 'Announcements'
              ? 'border-b-2 border-black font-semibold'
              : 'opacity-50'
          }`}
          onClick={() => setCurrentTab('Announcements')}
        >
          Announcements
        </button>
        <button
          className={`px-4 py-2 ${
            currentTab === 'Policies'
              ? 'border-b-2 border-black font-semibold'
              : 'opacity-50'
          }`}
          onClick={() => setCurrentTab('Policies')}
        >
          Policies
        </button>
      </div>

      {/* Tab Content */}
      {currentTab === 'Announcements' && (
        <>
          {/* Announcements Section */}
          <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
            <header className="px-4 flex items-center gap-4 justify-between">
              <h1 className="flex items-center gap-4 font-semibold text-xl mb-4">
                <HiSpeakerphone />
                Announcements
              </h1>
              <Link href="/hr/announcements-&-policies/announcements/create-announcment">
                <Button
                  name="Create Announcement"
                  icon={<PiPlusCircleBold size={18} />}
                  bg="black"
                  textColor="white"
                />
              </Link>
            </header>
            <h6 className="my-2 opacity-35 font-medium text-sm px-4">
              This Week
            </h6>
            {Array.isArray(publishedAnnouncements) &&
              publishedAnnouncements.map((announcement) => (
                <SingleAnnouncement key={announcement.id} />
              ))}
          </section>

          <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
            <h6 className="my-2 opacity-35 font-medium text-sm px-4">Drafts</h6>
            {Array.isArray(draftAnnouncements) &&
              draftAnnouncements.map((announcement) => (
                <SingleAnnouncement key={announcement.id} />
              ))}
          </section>
        </>
      )}

      {currentTab === 'Policies' && (
        <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 px-4 space-y-4">
          <Policies />
        </section>
      )}
    </main>
  );
};

export default Page;
