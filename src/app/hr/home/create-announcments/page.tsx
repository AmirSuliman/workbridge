'use client';
import CustomTextEditor from '@/components/CustomEditor/CustomTextEditor';
import axiosInstance from '@/lib/axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';

const Createannouncment = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Draft');
  const [body, setBody] = useState('');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setStatus('Published');
      const payload = { title, body, status };
      const response = await axiosInstance.post('/announcement/', payload);
      toast.success('Announcement published successfully!');
      console.log('Response:', response.data);
      setLoading(false);
    } catch (error: any) {
      console.error('Error publishing announcement:', error);
      setLoading(false);

      if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
          const validationErrors = data?.message || 'Validation failed.';
          toast.error(`Error: ${validationErrors}`);
        } else {
          toast.error('An error occurred while publishing the announcement.');
        }
      } else {
        toast.error('A network error occurred.');
      }
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
          <button className="bg-[#0F172A] rounded-lg p-3 text-white text-[14px]">
            Save Draft
          </button>
          <button className="bg-white rounded-lg p-3 text-[#0F172A] border text-[14px]">
            Preview Post
          </button>
          <button>Cancel</button>
        </div>
      </nav>

      <div className="bg-white rounded-lg border">
        <div className="flex flex-col p-8 ">
          <label className="text-[#0F172A] text-[14px] p-2">Title</label>
          <input
            type="text"
            placeholder="Add a title for your post"
            className="p-3 w-full border rounded-lg text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full h-[1px] bg-gray-300  mb-2" />
        <CustomTextEditor setContent={setBody} />
      </div>

      <div className="flex justify-center items-center">
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
    </main>
  );
};
export default Createannouncment;
