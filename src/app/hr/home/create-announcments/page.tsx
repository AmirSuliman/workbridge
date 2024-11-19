'use client';
import CustomTextEditor from '@/components/CustomEditor/CustomTextEditor';
import { FaEdit } from 'react-icons/fa';

const Createannouncment = () => {
  return (
    <main className="space-y-4">
      <div className="flex flex-row items-center justify-between mb-4">
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
      </div>

      <div className=" bg-white rounded-lg border">
        <div className="flex flex-col p-8 ">
          <label className="text-[#0F172A] text-[14px] p-2">Title</label>
          <input
            type="text"
            placeholder="Add a title for your post"
            className="p-3 w-full border rounded-lg text-black"
          />
        </div>
        <div className="w-full h-[1px] bg-gray-300  mb-2" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <CustomTextEditor />
        </div>
      </div>

      <div className="p-8 bg-white rounded-lg border">
        <div className="">
          <h1 className="text-[#0D1322] font-bold text-[22px] mb-2">
            Exciting News!
          </h1>
          <p className="mb-14">
            We are thrilled to announce an important update to our Work from
            Home policy. With the evolving nature of the workplace, we have made
            some adjustments to better accommodate your needs and ensure a more
            flexible, productive environment for everyone.
          </p>
          <img
            src="/solen-feyissa-TaOGbz_S-Qw-unsplash.png"
            alt="img"
            className="w-[600px] mb-8  mx-auto"
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="p-3 rounded-lg bg-[#0F172A] text-white text-[16px] flex justify-center w-[300px]">
          Save & Publish
        </button>
      </div>
    </main>
  );
};
export default Createannouncment;
