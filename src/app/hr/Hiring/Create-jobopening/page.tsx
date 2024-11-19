'use client';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Modal from '@/components/modal/Modal';
const Createjobopening = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleToggle = () => {
    setIsRequired(!isRequired);
  };
  return (
    <main className="space-y-8">
      <div className="flex flex-row items-start sm:items-center justify-between">
        <div className="flex flex-row gap-2 text-[#0F172A] items-center text-[22px]">
          <FaEdit />
          <p className="font-semibold">Add Job Opening</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
          <button className="bg-[#0F172A] p-2 px-3 rounded-lg text-white">
            Save Draft
          </button>
          <button
            className="bg-white p-2 px-3 rounded-lg border"
            onClick={openModal}
          >
            Preview Job
          </button>
          <button className=" p-2  ">Cancel</button>
        </div>
      </div>
      <Modal onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4">Confirm Save</h2>
      </Modal>
      <form className="bg-white rounded-lg border ">
        <div className=" w-ful p-8">
          <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium ">
            <img src="/jobicon.png" alt="img" className="w-5" />
            Job Information
          </div>
          <div className="flex mt-8 flex-col sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full">
            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">Job Title*</span>
              <input
                type="text"
                placeholder="Add job title"
                className="p-3 border rounded-lg w-full"
              />
            </label>

            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">Department*</span>
              <select className="p-3 border rounded-lg w-full text-gray-400">
                <option value="" className="text-gray-400">
                  Select a Department
                </option>
                <option value="marketing" className="text-gray-400">
                  Marketing
                </option>
                <option value="engineering" className="text-gray-400">
                  Engineering
                </option>
                <option value="hr" className="text-gray-400">
                  Human Resources
                </option>
                <option value="sales" className="text-gray-400">
                  Sales
                </option>
                <option value="support" className="text-gray-400">
                  Customer Support
                </option>
              </select>
            </label>
            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">
                Employment Type*
              </span>
              <select className="p-3 border rounded-lg w-full text-gray-400">
                <option value="" className="text-gray-400">
                  Select employment type
                </option>
                <option value="marketing" className="text-gray-400">
                  Full time
                </option>
                <option value="engineering" className="text-gray-400">
                  Part time
                </option>
                <option value="hr" className="text-gray-400">
                  Internship
                </option>
              </select>
            </label>
          </div>

          <div className="flex flex-col mt-4 sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full">
            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">Hiring Lead*</span>
              <select className="p-3 border rounded-lg w-full text-gray-400">
                <option value="" className="text-gray-400">
                  Select hiring leads
                </option>
                <option value="marketing" className="text-gray-400">
                  lead
                </option>
                <option value="engineering" className="text-gray-400">
                  lead
                </option>
                <option value="hr" className="text-gray-400">
                  lead
                </option>
                <option value="sales" className="text-gray-400">
                  lead
                </option>
                <option value="support" className="text-gray-400">
                  lead
                </option>
              </select>
            </label>

            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">
                Reporting Manager*
              </span>
              <select className="p-3 border rounded-lg w-full text-gray-400">
                <option value="" className="text-gray-400">
                  Select a reporting manager
                </option>
                <option value="marketing" className="text-gray-400">
                  lead
                </option>
                <option value="engineering" className="text-gray-400">
                  lead
                </option>
                <option value="hr" className="text-gray-400">
                  lead
                </option>
                <option value="sales" className="text-gray-400">
                  lead
                </option>
                <option value="support" className="text-gray-400">
                  lead
                </option>
              </select>
            </label>
            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">
                Minimum Experience
              </span>
              <input
                type="text"
                placeholder="Add minimum years of experience"
                className="p-3 border rounded-lg w-full"
              />
            </label>
          </div>
        </div>
        <div className="w-full h-[0.7px] bg-gray-200 " />
        <div className="p-8">
          <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium ">
            <img src="/jobdescription.png" alt="img" className="w-5" />
            Job Description
          </div>
          <label className="flex flex-col mb-4 sm:w-1/3 w-full mt-8">
            <span className="text-[14px] text-gray-400 mb-2">Description*</span>
            <textarea
              placeholder="Write job description"
              className="p-3 border rounded-lg w-full"
            />
          </label>
        </div>
        <div className="w-full h-[0.7px] bg-gray-200 " />

        <div className=" w-ful p-8">
          <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium ">
            <img src="/loctaion.png" alt="img" className="w-5" />
            Location
          </div>
          <div className="flex mt-8 flex-col sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full">
            {/* First Input */}
            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">Street 1</span>
              <input
                type="text"
                placeholder="Add street"
                className="p-3 border rounded-lg w-full"
              />
            </label>
            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">Street 2</span>
              <input
                type="text"
                placeholder="Add street"
                className="p-3 border rounded-lg w-full"
              />
            </label>
            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">Zip</span>
              <input
                type="text"
                placeholder="Add Zip"
                className="p-3 border rounded-lg w-full"
              />
            </label>
          </div>

          <div className="flex flex-col mt-4 sm:flex-row sm:gap-4 gap-2 items-center justify-between w-full">
            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">Country</span>
              <input
                type="text"
                placeholder="Add country"
                className="p-3 border rounded-lg w-full"
              />
            </label>
            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">State</span>
              <input
                type="text"
                placeholder="Add state"
                className="p-3 border rounded-lg w-full"
              />
            </label>
            <label className="flex flex-col mb-4 sm:w-1/3 w-full">
              <span className="text-[14px] text-gray-400">City</span>
              <input
                type="text"
                placeholder="Add city"
                className="p-3 border rounded-lg w-full"
              />
            </label>
          </div>
        </div>
        <div className="w-full h-[0.7px] bg-gray-200 " />

        <div className="p-8">
          <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium ">
            <img src="/compensation.png" alt="img" className="w-5" />
            Compensation
          </div>
          <label className="flex flex-col mb-4 sm:w-1/3 w-full mt-8">
            <span className="text-[14px] text-gray-400 mb-2">Compensation</span>
            <input
              placeholder="Add annual compensation amount"
              className="p-3 border rounded-lg w-full"
            />
          </label>
        </div>
        <div className="w-full h-[0.7px] bg-gray-200 " />

        <div className="p-8">
          <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium mb-8">
            <img src="/jobicon.png" alt="img" className="w-5" />
            Application Requirements
          </div>
          <div className="flex flex-wrap gap-5">
            {/* First Item */}
            <div className="border rounded-lg w-[200px] flex flex-col">
              <div className="p-4 items-center flex font-medium">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3"
                />
                Resume
              </div>
              <div className="w-full h-[1px] bg-gray-300" />
              <div className="flex flex-row gap-5 p-3 items-center">
                <button
                  onClick={handleToggle}
                  className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    isRequired ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                      isRequired ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-gray-700 text-sm">Required</span>
              </div>
            </div>

            {/* Second Item */}
            <div className="border rounded-lg w-[200px] flex flex-col">
              <div className="p-4 items-center flex font-medium">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3"
                />
                Resume
              </div>
              <div className="w-full h-[1px] bg-gray-300" />
              <div className="flex flex-row gap-5 p-3 items-center">
                <button
                  onClick={handleToggle}
                  className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    isRequired ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                      isRequired ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-gray-700 text-sm">Required</span>
              </div>
            </div>

            {/* Third Item */}
            <div className="border rounded-lg w-[200px] flex flex-col">
              <div className="p-4 items-center flex font-medium">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3"
                />
                Resume
              </div>
              <div className="w-full h-[1px] bg-gray-300" />
              <div className="flex flex-row gap-5 p-3 items-center">
                <button
                  onClick={handleToggle}
                  className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    isRequired ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                      isRequired ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-gray-700 text-sm">Required</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[0.7px] bg-gray-200 " />
        <div className="p-8">
          <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium mb-8">
            <img src="/question.png" alt="img" className="w-5" />
            Custom Questions
          </div>
          <div className="flex flex-col items-start sm:items-center gap-1 sm:gap-8 sm:flex-row">
            <label className="flex flex-col mb-4 sm:w-1/3 w-full mt-8">
              <span className="text-[14px] text-gray-400 mb-2">
                Question Title
              </span>
              <input
                placeholder="Add question"
                className="p-3 border rounded-lg w-full"
              />
            </label>
            <button
              onClick={handleToggle}
              className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors mt-0 sm:mt-8 ${
                isRequired ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                  isRequired ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-gray-700 text-sm mt-0 sm:mt-8">Required</span>

            <div className="flex flex-row gap-3 mt-0 sm:mt-8">
              <button className="text- bg-[#0F172A] text-white rounded-lg p-3 px-2">
                Add Question
              </button>
              <button className="border p-3 px-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gray-300" />
        <div className="p-8">
          <div className="flex flex-row items-center gap-2 text-[#0F172A] text-[18px] font-medium mb-8">
            <img src="/jobpost.png" alt="img" className="w-5" />
            Share Job Posting
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-12">
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-[14px]">Share to</label>
              <div className="p-4 items-center flex font-medium border rounded-lg">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3"
                />
                LinkedIn
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-[14px]">Share to</label>
              <div className="p-4 items-center flex font-medium border rounded-lg">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3"
                />
                Company Website
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-[14px]">Share to</label>
              <div className="p-4 items-center flex font-medium border rounded-lg">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3"
                />
                Glassdoor
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-[14px]">Share to</label>
              <div className="p-4 items-center flex font-medium border rounded-lg">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer mr-3"
                />
                Indeed
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Createjobopening;
