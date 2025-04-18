'use client';

import { AnnouncementImage } from '@/components/Announcements/AnnouncementImage';
import EditAnnouncement from '@/components/Announcements/EditAnnoucement';
import PublishAnnouncement from '@/components/Announcements/PublishAnnouncement';
import Button from '@/components/Button';
import axiosInstance from '@/lib/axios';
import { RootState } from '@/store/store';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';

type AnnouncementDetail = {
  id: number;
  title: string;
  body: string;
  status: string;
  type: string;
  createdAt: string;
  createdBy: number;
  file: {
    url: string;
  };
  creator: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profilePictureUrl: string;
    Role: {
      id: number;
      name: string;
      Permissions: {
        id: number;
        scope: string;
      }[];
    };
  };
};

const AnnouncmentScreen = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState<AnnouncementDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isEditible, setIsEditible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.myInfo);
  const role = user?.user?.role;
  const isUserpanel = role === 'Manager' || role === 'ViewOnly';
  // Fetch announcement details from the API
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axiosInstance.get(`/announcement/${id}`, {
          params: {
            associations: true, // Include associations query parameter
          },
        });
        setAnnouncement(response.data.data); // Set announcement data from `data` field
      } catch (err: any) {
        setError(
          err.response?.data?.message || 'An error occurred while fetching data'
        );
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (id) {
      fetchAnnouncement(); // Fetch only if ID is available
    }
  }, [id]);

  if (loading) return <div className='p-4'>Loading...</div>;
  if (error) return <div className='p-4'>Error: {error}</div>;

  return (
    <main className='space-y-8'>
      {/* Show this only if role is not manager/employee, status is draft and not in the edit mode */}
      {announcement &&
        announcement.status === 'Draft' &&
        !isUserpanel &&
        !isEditible && (
          <nav className='flex flex-wrap lg:items-center justify-end gap-4'>
            <PublishAnnouncement announcement={announcement} />
            <Button
              bg='white'
              name='Edit'
              textColor='black'
              icon={<FaEdit />}
              className='flex-row-reverse'
              onClick={() => setIsEditible(true)}
            />
          </nav>
        )}
      {isEditible ? (
        <EditAnnouncement
          announcement={announcement}
          setIsEditible={setIsEditible}
        />
      ) : (
        <>
          <div className='p-6 bg-white border rounded-lg'>
            <h1 className='text-[#0D1322] font-medium text-[32px]'>
              {announcement?.title || 'No Title'}
            </h1>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-12 items-start sm:items-center mt-4'>
              <div className='flex flex-row items-center gap-2'>
                <AnnouncementImage type={announcement?.type} />
                <p>Posted by:</p>
                <p className='font-bold'>
                  {`${announcement?.creator?.firstName || ''} ${
                    announcement?.creator?.lastName || ''
                  }` || 'Unknown'}
                </p>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <p>Date:</p>
                <p className='font-bold'>
                  {`${
                    announcement?.createdAt
                      ? new Date(announcement.createdAt).toDateString()
                      : ''
                  }`}
                </p>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <p>Time:</p>
                <p className='font-bold'>
                  {`${
                    announcement?.createdAt
                      ? new Date(announcement.createdAt).toLocaleTimeString()
                      : ''
                  }`}
                </p>
              </div>
            </div>
          </div>

          {/* Announcement Body */}
          <div
            className='prose max-w-none'
            dangerouslySetInnerHTML={{ __html: announcement?.body || '' }}
          />
          {announcement?.file?.url && (
            <Image
              width={300}
              height={150}
              src={announcement?.file?.url}
              alt='Profile Preview'
              className='w-full mx-auto max-h-[500px] rounded-lg border'
            />
          )}
        </>
      )}
    </main>
  );
};

export default AnnouncmentScreen;
