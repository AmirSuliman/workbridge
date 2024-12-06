import { JobPreviewData } from '@/types/job';
import React from 'react';

const JobPreview = ({ jobData }: { jobData: JobPreviewData }) => {
  return (
    <div className=" p-4 border border-gray-300 rounded shadow-md">
      <div>
        {/* <p>
        <strong>Hiring Lead:</strong> {jobData.hiringLead}
      </p>
      <p>
        <strong>Reporting To:</strong> {jobData.reportingTo}
      </p>

      <div>
        <strong>Location:</strong>
        <p>{jobData.location.street1}</p>
        {jobData.location.street2 && <p>{jobData.location.street2}</p>}
      </div> */}

        {/* Modal Header */}
        <div className="text-[#0F172A] text-[22px] font-semibold">
          Job Opening Preview
        </div>

        {/* Job Title Section */}
        <div className="flex flex-col mt-8">
          <p className="text-gray-400 text-[12px]">Job Title</p>
          <h1 className="text-[#0F172A] text-[22px] font-medium">
            {jobData.tittle}
          </h1>
        </div>

        {/* Department, Employment Type, Experience */}
        <div className="flex flex-row w-full sm:w-[70%] items-center justify-between">
          <div className="flex flex-col mt-8">
            <p className="text-gray-400 text-[12px]">Department</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.department}
            </h1>
          </div>
          <div className="flex flex-col mt-8">
            <p className="text-gray-400 text-[12px]">Employment Type</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.employmentType}
            </h1>
          </div>
          <div className="flex flex-col mt-8">
            <p className="text-gray-400 text-[12px]">Min. Exp.</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.minYearsExperience} years
            </h1>
          </div>
        </div>

        {/* Job Description */}
        <div className="flex flex-col mt-8">
          <p className="text-gray-400 text-[12px]">Description</p>
          <h1 className="text-[#0F172A] text-[16px] font-medium">
            {jobData.description}
          </h1>
        </div>

        {/* Compensation */}
        <div className="flex flex-col mt-8">
          <p className="text-gray-400 text-[12px]">Compensation</p>
          <h1 className="text-[#0F172A] text-[16px] font-medium">
            {jobData.salary}
          </h1>
        </div>

        {/* Divider */}
        <div className="w-full h-[1.5px] bg-gray-300 mt-8" />

        {/* Upload Buttons Section */}
        {jobData?.requirements && (
          <div className="mt-8 flex flex-col gap-5">
            {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-5">
          {['Resume', 'Portfolio', 'Cover Letter'].map((label) => (
            <div key={label} className="flex flex-col gap-1">
              <p className="text-gray-400 text-[14px]">{label}*</p>
              <button className="bg-[#0F172A] flex flex-row p-3 w-[270px] items-center justify-between rounded-lg text-white">
                Upload {label} <FaCloudUploadAlt />
              </button>
            </div>
          ))}
        </div> */}

            {/* Additional Details Section */}
            <div>
              <strong>Requirements:</strong>
              <ul>
                {jobData?.requirements.map((req, index) => (
                  <li key={index}>
                    {req.name} {req.required && <span>(Required)</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Websites to Share:</strong>
              <ul>
                {jobData?.shareWebsites.map((site, index) => (
                  <li key={index}>{site}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Questions:</strong>
              <ul>
                {jobData?.questions.map((question, index) => (
                  <li key={index}>
                    {question.question}{' '}
                    {question.required && <span>(Required)</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Divider */}

        {/* Example Question Section */}
        {/* <div className="flex flex-col gap-2">
        <p className="text-[#0F172A] font-medium text-[14px]">
          This text is for an example question?
        </p>
        <input
          type="text"
          placeholder="Type your answer here"
          className="p-4 rounded-lg border w-[60%]"
        />
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <p className="text-[#0F172A] font-medium text-[14px]">
          This text is for an example question?
        </p>
        <input
          type="text"
          placeholder="Type your answer here"
          className="p-4 rounded-lg border w-[60%]"
        />
      </div> */}

        <div className="w-full h-[1.5px] bg-gray-300 mt-8 mb-8" />

        <div className="flex flex-row items-center gap-4 flex-wrap justify-between">
          <div className="flex flex-col ">
            <p className="text-gray-400 text-[12px]">Address</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.location.city}, {jobData.location.state},{' '}
              {jobData.location.country} - {jobData.location.zipCode}
            </h1>
          </div>
          <div className="flex flex-col ">
            <p className="text-gray-400 text-[12px]">Country</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.location.country}
            </h1>
          </div>
          <div className="flex flex-col ">
            <p className="text-gray-400 text-[12px]">City</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.location.city}
            </h1>
          </div>
          <div className="flex flex-col ">
            <p className="text-gray-400 text-[12px]">Postal Code</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.location.zipCode}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPreview;
