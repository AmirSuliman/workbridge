import { JobListing } from '@/types/job';
import { FaCloudUploadAlt, FaUpload } from 'react-icons/fa';

const FullJobPreview = ({ jobData }: { jobData: JobListing }) => {
  return (
    <div className=" p-8 border border-gray-300 rounded shadow-md">
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
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: jobData?.data.description || '',
          }}
        />
      </div>

      {/* Compensation */}
      <div className="flex flex-col mt-8">
        <p className="text-gray-400 text-[12px]">Compensation</p>
        <h1 className="text-[#0F172A] text-[16px] font-medium">
          {jobData.data.salary}
        </h1>
      </div>

      {jobData.data?.applicationRequirements && (
        <div className="w-full h-[1.5px] bg-gray-300 my-8" />
      )}

      {jobData.data?.applicationRequirements && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full gap-8 my-12">
          {jobData.data?.applicationRequirements.map((requirement) => {
            const documents = ['Resume', 'Portfolio', 'CoverLetter'];
            const isUploadDoc = documents.includes(requirement.name);
            return isUploadDoc ? (
              <div key={requirement.id} className="flex flex-col gap-1">
                <p className="form-label">
                  {requirement.name}
                  {requirement.required ? '*' : ''}
                </p>
                <button className="bg-[#0F172A] flex flex-row gap-4 p-3 text-sm items-center justify-between rounded text-white">
                  Upload {requirement.name} <FaUpload />
                </button>
              </div>
            ) : (
              <label key={requirement.id}>
                <p className="form-label">
                  {requirement.name} {requirement.required ? '*' : ''}
                </p>
                <input
                  type="text"
                  placeholder="Type your answer here"
                  className="form-input py-3"
                />
              </label>
            );
          })}
        </div>
      )}
      {jobData.data?.customQuestions && (
        <div className="w-full h-[1.5px] bg-gray-300 my-8" />
      )}

      {/* Example Question Section */}
      {jobData.data?.customQuestions && (
        <div className="flex flex-col gap-8 mt-4">
          {jobData.data?.customQuestions.map((question) => (
            <label key={question.id}>
              <p className="text-[#0F172A] font-medium text-[14px] mb-1">
                {question.question} {question.required ? '*' : ''}
              </p>
              <input
                type="text"
                placeholder="Type your answer here"
                className="form-input py-3 max-w-lg"
              />
            </label>
          ))}
        </div>
      )}

      {jobData.data?.customQuestions && (
        <div className="w-full h-[1.5px] bg-gray-300 my-8" />
      )}

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
  );
};

export default FullJobPreview;
