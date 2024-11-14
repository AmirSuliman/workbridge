import {BiChevronRight} from "react-icons/bi"

    const Jobapplied = () => {
        const jobApplications = [
          {
            jobType: "Software Engineer",
            Type:"full time",
            hiringLead: "John Doe",
            createdOn: "2024-11-01",
            status: "Applied",
          },
          {
            jobType: "Frontend Developer",
            Type:"Full time",
            hiringLead: "Jane Smith",
            createdOn: "2024-10-25",
            status: "Interviewing",
          },
          {
            jobType: "UX Designer",
            Type:"Part time",
            hiringLead: "Emily White",
            createdOn: "2024-09-15",
            status: "Offer Sent",
          },
        ];
      
        return (
          <div className="p-6 bg-white rounded-lg border">
            <h1 className="text-xl font-semibold mb-4">Also Applied</h1>
            <p className="mb-4">This candidate has also applied to these job openings</p>
      
            <table className="min-w-full table-auto border-collapse mt-6">
              <thead className="">
                <tr className="border-b text-gray-400 font-medium">
                  <th className="px-6 py-4 text-left text-[14px]  ">Job Opening</th>
                  <th className="px-6 py-4 text-left text-[14px]  ">Type</th>
                  <th className="px-6 py-4 text-left text-[14px]  ">Hiring Lead</th>
                  <th className="px-6 py-4 text-left text-[14px]  ">Created On</th>
                  <th className="px-6 py-4 text-left text-[14px]  ">Status</th>
                </tr>
              </thead>
              <tbody>
                {jobApplications.map((job, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm ">{job.jobType}</td>
                    <td className="px-6 py-4 text-sm ">{job.Type}</td>
                    <td className="px-6 py-4 text-sm ">{job.hiringLead}</td>
                    <td className="px-6 py-4 text-sm ">{job.createdOn}</td>
                    <td className="px-6 py-4 text-sm ">{job.status}</td>
                    <td className=" py-4">
                     <span className="border border-gray-300 rounded-lg p-2 flex items-center justify-center hover:bg-gray-100 cursor-pointer">
                       <BiChevronRight className="text-gray-600 text-lg" />
                     </span>
                   </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      };
      
 

export default Jobapplied;