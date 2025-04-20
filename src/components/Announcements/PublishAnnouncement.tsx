import axios, { isAxiosError } from 'axios';
import Button from '../Button';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';

const PublishAnnouncement = ({ announcement }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = useParams();
  console.log(announcement);
  const submit = async () => {
    setLoading(true);
    try {
      // if type is null make it default type (company activity)
      const type = announcement.type ? announcement.type : 'Company Activity';
      const payload = {
        title: announcement.title,
        body: announcement.body,
        status: 'Published',
        type: type,
      };

      const response = await axiosInstance.put(`/announcement/${id}`, payload);
      toast.success('Announcement published successfully.');
      setLoading(false);
      router.back();
      console.log('pub res: ', response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Some error occured.');
      }
    }
  };

  return (
    <Button
      onClick={submit}
      icon={
        loading ? (
          <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" />
        ) : (
          ''
        )
      }
      name={loading ? '' : 'Publish Announcement'}
      className="ml-auto mr-0"
    />
  );
};
export default PublishAnnouncement;
