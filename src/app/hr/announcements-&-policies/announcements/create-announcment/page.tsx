'use client';
import CreateAnnouncementTextEditor from '@/components/CustomEditor/CreateAnnouncementTextEditor';
import axiosInstance from '@/lib/axios';
import { announcementSchema } from '@/schemas/announcementSchema';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { z } from 'zod';

const CreateAnnouncement = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [announcementType, setAnnouncementType] = useState<
    'Miscellaneous' | 'Policy Changes' | 'Company Activity'
  >('Company Activity');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const [isPreview, setIsPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const validateFields = () => {
    try {
      announcementSchema.parse({ title, body });
      setErrors({}); // Clear errors if validation passes
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.errors.reduce(
          (acc, curr) => {
            acc[curr.path[0] as string] = curr.message;
            return acc;
          },
          {} as { title?: string; body?: string }
        );
        setErrors(fieldErrors);
      }
      return false;
    }
  };
  const handlePreviewPost = () => {
    if (!validateFields()) return; // Validate fields before preview
    setIsPreview(true);
  };

  const handleCancel = () => {
    setIsPreview(false);
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];

        if (!file.type.startsWith('image/')) {
          return toast.error('Only image files are allowed!');
        }
        setSelectedFile(file);
        const blobUrl = URL.createObjectURL(file);
        setPreviewUrl(blobUrl);
      }
    },
    []
  );

  // Handle profile picture upload
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a an image.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axiosInstance.post('/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const uploadedId = response.data.data.id;
      setPreviewUrl(response.data.data.url);
      return { uploadedId, error: null };
    } catch (err) {
      console.error(err);
      return { error: err };
    }
  };

  const handleSubmit = async (status: 'Published' | 'Draft') => {
    if (!validateFields()) return; // Validate fields before submission
    try {
      setLoading(true);

      let uploadResponse: { uploadedId?: string; error?: unknown } | null =
        null;
      if (selectedFile) {
        uploadResponse = (await handleUpload()) || { error: null };
      }
      const payload = {
        title,
        body,
        status: status,
        type: announcementType,
        fileId: uploadResponse?.uploadedId || null,
      };
      await axiosInstance.post('/announcement/', payload);
      toast.success(
        `${
          status === 'Published' ? 'Announcement published' : 'Draft saved'
        } successfully`
      );
      router.back();
    } catch (error: any) {
      console.error('Error publishing announcement:', error);
      toast.error('An error occurred while publishing the announcement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='space-y-4'>
      <nav className='flex flex-row items-center justify-between mb-4'>
        <div className='flex flex-row items-center gap-2'>
          <FaEdit size={22} />
          <h1 className='font-bold text-[22px]'>Create Announcement</h1>
        </div>
        <div className='flex flex-col sm:flex-row items-center gap-2'>
          <button
            className='bg-[#0F172A] rounded px-3 p-2 text-white text-[12px]'
            onClick={() => handleSubmit('Draft')}
          >
            {loading ? (
              <BiLoaderCircle className='h-4 w-4 animate-spin mx-auto' />
            ) : (
              'Save Draft'
            )}
          </button>
          {isPreview ? (
            <button
              className='rounded p-2 px-3 text-[#0F172A] text-sm'
              onClick={handleCancel}
            >
              Cancel
            </button>
          ) : (
            <button
              className='bg-white rounded p-2 px-3 text-[#0F172A] border text-[12px]'
              onClick={handlePreviewPost}
            >
              Preview Post
            </button>
          )}
        </div>
      </nav>

      {isPreview ? (
        <div className='bg-white p-6 rounded-lg border'>
          <h2 className='text-2xl font-bold mb-4'>{title}</h2>
          <div
            className='text-gray-700'
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
          {previewUrl && (
            <div className='my-4 relative'>
              <button
                onClick={() => setPreviewUrl(null)}
                type='button'
                className='absolute top-2 right-2 px-6 py-1 bg-white rounded-lg text-2xl'
              >
                x
              </button>
              <Image
                width={300}
                height={150}
                src={previewUrl}
                alt='Profile Preview'
                className='w-full mx-auto max-h-[500px] rounded-lg border'
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className='flex flex-col p-4 bg-white rounded-lg border'>
            <label className='text-[#0F172A] text-[14px] p-2'>Title</label>
            <input
              type='text'
              placeholder='Add a title for your post'
              className={`outline-none p-3 w-full border rounded text-[20px] font-medium text-[#0D1322] ${
                errors.title ? 'border-red-500' : ''
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
            )}
          </div>
          <div className='bg-white rounded-lg border mt-8'>
            <CreateAnnouncementTextEditor
              setAnnouncementType={setAnnouncementType}
              announcementType={announcementType}
              handleFileChange={handleFileChange}
              setContent={setBody}
              previewUrl={previewUrl}
              body={body}
            />
            {errors.body && (
              <p className='text-red-500 text-sm mt-2 px-8'>{errors.body}</p>
            )}

            {previewUrl && (
              <div className='p-4 relative'>
                <button
                  onClick={() => setPreviewUrl(null)}
                  type='button'
                  className='absolute top-2 right-2 px-6 py-1 bg-white rounded-lg text-2xl'
                >
                  x
                </button>
                <Image
                  width={300}
                  height={150}
                  src={previewUrl}
                  alt='Profile Preview'
                  className='w-full mx-auto max-h-[500px] rounded-lg border'
                />
              </div>
            )}
          </div>

          <div className='flex justify-center items-center mt-4'>
            <button
              onClick={() => handleSubmit('Published')}
              className='p-3 rounded bg-[#0F172A] text-white text-[16px] flex justify-center w-[300px]'
            >
              {loading ? (
                <BiLoaderCircle className='h-4 w-4 animate-spin mx-auto' />
              ) : (
                'Save & Publish'
              )}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CreateAnnouncement;
