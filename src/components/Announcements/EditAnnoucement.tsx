import axiosInstance from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { z } from 'zod';
import CreateAnnouncementTextEditor from '../CustomEditor/CreateAnnouncementTextEditor';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const announcementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Content is required'),
  type: z.enum(['Miscellaneous', 'Policy Changes', 'Company Activity']),
});

type AnnouncementType = z.infer<typeof announcementSchema>['type'];
type AnnouncementFormValues = z.infer<typeof announcementSchema>;

const EditAnnouncement = ({ announcement, setIsEditible }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    mode: 'all',
    defaultValues: {
      title: announcement.title || '',
      body: announcement.body || '',
      type: announcement.type || 'Company Activity',
    },
  });

  // Watch form values for preview
  const watchedTitle = watch('title');
  const watchedBody = watch('body');
  const watchedType = watch('type');

  const handlePreviewPost = () => {
    setIsPreview(true);
  };

  const handleCancel = () => {
    setIsPreview(false);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        title: data.title,
        body: data.body,
        status: 'Published',
        type: data.type,
      };

      const response = await axiosInstance.put(`/announcement/${id}`, payload);
      console.log('Put Announcement res: ', response.data);
      toast.success(`Announcement updated successfully`);
      router.back();
    } catch (error: any) {
      console.error('Error publishing announcement:', error);
      toast.error('An error occurred while publishing the announcement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="space-y-4">
      <nav className="flex flex-wrap gap-4 justify-end mb-4 w-full">
        {isPreview ? (
          <button
            className="rounded p-2 px-3 text-[#0F172A] text-sm"
            onClick={handleCancel}
          >
            Cancel
          </button>
        ) : (
          <>
            <button
              className="bg-white rounded p-2 px-3 text-[#0F172A] border text-[12px]"
              onClick={handlePreviewPost}
            >
              Preview Post
            </button>
            <button
              className="bg-white rounded p-2 px-3 text-[#0F172A] border text-[12px]"
              onClick={() => setIsEditible(false)}
            >
              Cancel edit
            </button>
          </>
        )}
      </nav>

      {isPreview ? (
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">{watchedTitle}</h2>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: watchedBody }}
          ></div>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col p-4 bg-white rounded-lg border">
            <label className="text-[#0F172A] text-[14px] p-2">Title</label>
            <input
              type="text"
              placeholder="Add a title for your post"
              className={`outline-none p-3 w-full border rounded text-[20px] font-medium text-[#0D1322] ${
                errors.title ? 'border-red-500' : ''
              }`}
              {...register('title')}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="bg-white rounded-lg border mt-8">
            <CreateAnnouncementTextEditor
              setAnnouncementType={(type: AnnouncementType) =>
                setValue('type', type)
              }
              announcementType={watchedType}
              setContent={(content: string) => setValue('body', content)}
              body={watchedBody}
            />
            {errors.body && (
              <p className="text-red-500 text-sm mt-2 px-8">
                {errors.body.message}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center mt-4">
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="p-3 rounded bg-[#0F172A] text-white text-[16px] flex justify-center w-[300px]"
            >
              {loading ? (
                <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                'Save & Publish'
              )}
            </button>
          </div>
        </form>
      )}
    </main>
  );
};

export default EditAnnouncement;
