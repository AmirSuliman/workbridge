'use client';
import CustomTextEditor from '@/components/CustomEditor/CustomTextEditor';
import axiosInstance from '@/lib/axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

// Define Zod schema for validation
const announcementSchema = z.object({
  title: z.string().nonempty('Title is required'),
  body: z.string().nonempty('Content is required'),
});

const CreateAnnouncement = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [, setStatus] = useState('Draft');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const [isPreview, setIsPreview] = useState(false);
  const router = useRouter();

  const validateFields = () => {
    try {
      announcementSchema.parse({ title, body });
      setErrors({}); // Clear errors if validation passes
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.errors.reduce((acc, curr) => {
          acc[curr.path[0] as string] = curr.message;
          return acc;
        }, {} as { title?: string; body?: string });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSaveDraft = async () => {
    if (!validateFields()) return; // Validate fields before submission
    try {
      setLoading(true);
      const payload = { title, body, status: 'Draft' };
      await axiosInstance.post('/announcement/', payload);
      toast.success('Draft saved successfully!');
    } catch (error: any) {
      console.error('Error saving draft:', error);
      toast.error('An error occurred while saving the draft.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewPost = () => {
    if (!validateFields()) return; // Validate fields before preview
    setIsPreview(true);
  };

  const handleCancel = () => {
    setTitle('');
    setBody('');
    setStatus('Draft');
    setErrors({});
    toast('Changes discarded.');
    router.back();
  };

  const handleSubmit = async () => {
    if (!validateFields()) return; // Validate fields before submission
    try {
      setLoading(true);
      const payload = { title, body, status: 'Published' };
      await axiosInstance.post('/announcement/', payload);
      toast.success('Announcement published successfully!');
      setTitle('');
      setBody('');
    } catch (error: any) {
      console.error('Error publishing announcement:', error);
      toast.error('An error occurred while publishing the announcement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="space-y-4">
      <nav className="flex flex-row items-center justify-between mb-4">
        <div className="flex flex-row items-center gap-2">
          <FaEdit size={22} />
          <h1 className="font-bold text-[22px]">Create Announcement</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <button
            className="bg-[#0F172A] rounded-lg p-3 text-white text-[14px]"
            onClick={handleSaveDraft}
          >
            {loading ? (
              <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" />
            ) : (
              'Save Draft'
            )}
          </button>
          <button
            className="bg-white rounded-lg p-3 text-[#0F172A] border text-[14px]"
            onClick={handlePreviewPost}
          >
            Preview Post
          </button>
          <button
            className="bg-gray-200 rounded-lg p-3 text-red-500 text-[14px]"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </nav>

      {isPreview ? (
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
          <button
            className="mt-4 bg-gray-300 p-2 rounded-lg"
            onClick={() => setIsPreview(false)}
          >
            Close Preview
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-white rounded-lg border">
            <div className="flex flex-col p-8">
              <label className="text-[#0F172A] text-[14px] p-2">Title</label>
              <input
                type="text"
                placeholder="Add a title for your post"
                className={`p-3 w-full border rounded-lg text-black ${
                  errors.title ? 'border-red-500' : ''
                }`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="w-full h-[1px] bg-gray-300 mb-2" />
            <CustomTextEditor setContent={setBody} body={body} />
            {errors.body && (
              <p className="text-red-500 text-sm mt-2 px-8">{errors.body}</p>
            )}
          </div>

          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handleSubmit}
              className="p-3 rounded-lg bg-[#0F172A] text-white text-[16px] flex justify-center w-[300px]"
            >
              {loading ? (
                <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" />
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
