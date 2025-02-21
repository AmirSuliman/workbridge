'use client';

import { IMAGES } from '@/constants/images';
import axiosInstance from '@/lib/axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type AnnouncementDetail = {
  id: number;
  title: string;
  body: string;
  status: string;
  createdBy: number;
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
  const { id } = useParams(); // Get the announcement ID from the URL
  const [announcement, setAnnouncement] = useState<AnnouncementDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="space-y-8 m-4">
      {/* Announcement Header */}
      <div className="p-6 bg-white border rounded-lg">
        <h1 className="text-[#0D1322] font-medium text-[32px]">
          {announcement?.title || 'No Title'}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-start sm:items-center mt-4">
          <div className="flex flex-row items-center gap-2">
            <img
              src={
                announcement?.creator?.profilePictureUrl ||
                IMAGES.placeholderAvatar.src
              }
              alt="Poster"
              className="w-8 h-8 rounded-full"
            />
            <p>Posted by:</p>
            <p className="font-bold">
              {`${announcement?.creator?.firstName || ''} ${
                announcement?.creator?.lastName || ''
              }` || 'Unknown'}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p>Role:</p>
            <p className="font-bold">
              {announcement?.creator?.Role?.name || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Announcement Body */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: announcement?.body || '' }}
      />
    </main>
  );
};

export default AnnouncmentScreen;
