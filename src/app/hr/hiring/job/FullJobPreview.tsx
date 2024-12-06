import { JobListing } from '@/types/job';

const FullJobPreview = ({ jobData }: { jobData: JobListing }) => {
  return (
    <div className=" p-4 border border-gray-300 rounded shadow-md">
      <div>
        {/* <p>
        <strong>Hiring Lead:</strong> {jobData.data.hiringLead}
      </p>
      <p>
        <strong>Reporting To:</strong> {jobData.data.reportingTo}
      </p>

      <div>
        <strong>Location:</strong>
        <p>{jobData.data.location.street1}</p>
        {jobData.data.location.street2 && <p>{jobData.data.location.street2}</p>}
      </div> */}

        {/* Modal Header */}
        <div className="text-[#0F172A] text-[22px] font-semibold">
          Job Opening Preview
        </div>

        {/* Job Title Section */}
        <div className="flex flex-col mt-8">
          <p className="text-gray-400 text-[12px]">Job Title</p>
          <h1 className="text-[#0F172A] text-[22px] font-medium">
            {jobData.data.tittle}
          </h1>
        </div>

        {/* Department, Employment Type, Experience */}
        <div className="flex flex-row w-full sm:w-[70%] items-center justify-between">
          <div className="flex flex-col mt-8">
            <p className="text-gray-400 text-[12px]">Department</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.data.department.name}
            </h1>
          </div>
          <div className="flex flex-col mt-8">
            <p className="text-gray-400 text-[12px]">Employment Type</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.data.employmentType}
            </h1>
          </div>
          <div className="flex flex-col mt-8">
            <p className="text-gray-400 text-[12px]">Min. Exp.</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.data.minYearsExperience} years
            </h1>
          </div>
        </div>

        {/* Job Description */}
        <div className="flex flex-col mt-8">
          <p className="text-gray-400 text-[12px]">Description</p>
          <h1 className="text-[#0F172A] text-[16px] font-medium">
            {jobData.data.description}
          </h1>
        </div>

        {/* Compensation */}
        <div className="flex flex-col mt-8">
          <p className="text-gray-400 text-[12px]">Compensation</p>
          <h1 className="text-[#0F172A] text-[16px] font-medium">
            {jobData.data.salary}
          </h1>
        </div>

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
              {jobData.data.location.city}, {jobData.data.location.state},{' '}
              {jobData.data.location.country} - {jobData.data.location.zipCode}
            </h1>
          </div>
          <div className="flex flex-col ">
            <p className="text-gray-400 text-[12px]">Country</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.data.location.country}
            </h1>
          </div>
          <div className="flex flex-col ">
            <p className="text-gray-400 text-[12px]">City</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.data.location.city}
            </h1>
          </div>
          <div className="flex flex-col ">
            <p className="text-gray-400 text-[12px]">Postal Code</p>
            <h1 className="text-[#0F172A] text-[16px] font-medium">
              {jobData.data.location.zipCode}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullJobPreview;
