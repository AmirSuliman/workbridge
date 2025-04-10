'use client';

import { Pagination } from '@/components/common/Pagination';
import axiosInstance from '@/lib/axios';
import { Announcement } from '@/types/common';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiSpeakerphone } from 'react-icons/hi';
import { PiPlusCircleBold } from 'react-icons/pi';
import Policies from '../policies/components/policies';
import Vacationpolicies from '../VacationPolicies/page';
import Image from 'next/image';
import { AnnouncementImage } from '@/components/Announcements/AnnouncementImage';
import TabButton from '@/components/common/TabsComponent/button';
import TabComponent from '@/components/common/TabsComponent/TabComponent';

// type Announcement = {
//   id: string;
//   title: string;
//   status: 'Published' | 'Draft';
// };

const fetchAnnouncements = async (
  status: string,
  page: number,
  size: number
): Promise<{ announcements: Announcement[]; total: number }> => {
  try {
    const response = await axiosInstance.get('/announcements', {
      params: {
        status,
        page,
        size,
      },
    });
    return {
      announcements: response.data.data.items || [],
      total: response.data.data.totalItems || 0,
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
  const router = useRouter();
  const [publishedAnnouncements, setPublishedAnnouncements] = useState<
    Announcement[]
  >([]);
  const [draftAnnouncements, setDraftAnnouncements] = useState<Announcement[]>(
    []
  );
  const [totalPublishedAnnouncements, setTotalPublishedAnnouncements] =
    useState(0);
  const [totalDraftAnnouncements, setTotalDraftAnnouncements] = useState(0);
  const [currentPublishedPage, setCurrentPublishedPage] = useState<number>(1);
  const [currentDraftPage, setCurrentDraftPage] = useState<number>(1);
  const [role, setRole] = useState<string>();

  const pageSize = 10;

  useEffect(() => {
    const fetchPublishedData = async () => {
      const publishedData = await fetchAnnouncements(
        'Published',
        currentPublishedPage,
        pageSize
      );
      setPublishedAnnouncements(publishedData.announcements);
      setTotalPublishedAnnouncements(publishedData.total);
      // console.log('publishedData.total', publishedData.total);
    };

    const fetchDraftData = async () => {
      const draftsData = await fetchAnnouncements(
        'Draft',
        currentDraftPage,
        pageSize
      );
      setDraftAnnouncements(draftsData.announcements);
      setTotalDraftAnnouncements(draftsData.total);
    };

    fetchPublishedData();
    fetchDraftData();
  }, [currentPublishedPage, currentDraftPage]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role);
    };

    fetchSession();
  }, []);

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  const handlePublishedPageChange = (page: number) => {
    setCurrentPublishedPage(page);
  };

  const handleDraftPageChange = (page: number) => {
    setCurrentDraftPage(page);
  };

  return (
    <main className='space-y-8'>
      {/* Tabs */}
      <div
        style={{ scrollbarWidth: 'thin' }}
        className='flex gap-4 border-b overflow-x-auto'
      >
        <TabButton
          isRootTab={true}
          name='Announcements'
          href={`/hr/announcements-&-policies/announcements?tab=0`}
        />
        <TabButton
          name='Policies'
          href={`/hr/announcements-&-policies/announcements?tab=1`}
        />
        <TabButton
          name='Vacation Policies'
          href={`/hr/announcements-&-policies/announcements?tab=2`}
        />
      </div>

      {/* Tab Content */}
      <TabComponent index='0' isRootTab={true}>
        <>
          {/* Announcements Section */}
          <section className='bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2'>
            <header className='px-4 flex items-center gap-4 flex-wrap justify-between mb-4'>
              <h1 className='flex items-center gap-4 font-semibold text-xl'>
                <HiSpeakerphone />
                Announcements
              </h1>
              <Link href='/hr/announcements-&-policies/announcements/create-announcment'>
                <button className='flex flex-row items-center gap-3 bg-[#0F172A] text-white text-[12px] p-3 px-4 rounded-md'>
                  Create Announcement <PiPlusCircleBold size={18} />
                </button>
              </Link>
            </header>
            <h6 className='my-2 opacity-35 font-medium text-sm px-4'>
              Published
            </h6>
            <div className='divide-y'>
              {Array.isArray(publishedAnnouncements) &&
                publishedAnnouncements.map((announcement) => (
                  <article
                    key={announcement.id}
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
                          ? new Date(
                              announcement.createdAt
                            ).toLocaleDateString()
                          : 'Date not available'}
                      </p>
                    </div>
                  </article>
                ))}
              <Pagination
                styles={{ container: 'pt-4 pr-4 gap-x-2 !justify-end' }}
                totalItems={totalPublishedAnnouncements || 0}
                pageSize={pageSize}
                currentPage={currentPublishedPage}
                maxPagesToShow={2}
                setCurrentPage={handlePublishedPageChange}
              />
            </div>
          </section>

          <section className='bg-white divide-y rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2'>
            <h6 className='my-2 opacity-35 font-medium text-sm px-4'>Drafts</h6>
            {Array.isArray(draftAnnouncements) &&
              draftAnnouncements.map((announcement) => (
                <article
                  key={announcement.id}
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
              ))}
            <Pagination
              styles={{ container: 'pt-4 pr-4 gap-x-2 !justify-end' }}
              totalItems={totalDraftAnnouncements}
              pageSize={pageSize}
              currentPage={currentDraftPage}
              maxPagesToShow={3}
              setCurrentPage={handleDraftPageChange}
            />
          </section>
        </>
      </TabComponent>

      <TabComponent index='1'>
        <section className='bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 px-4 space-y-4'>
          <Policies />
        </section>
      </TabComponent>

      <TabComponent index='2'>
        <section className='bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 px-4 space-y-4'>
          <Vacationpolicies />
        </section>
      </TabComponent>
    </main>
  );
};

export default Page;
