import { fetchJobApplications } from '@/store/slices/jobApplicationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

const Jobapplied = ({ candidateId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { data } = useSelector((state: RootState) => state.jobApplications);
  useEffect(() => {
    const params = {
      // page: 1,
      // size: 10000,
      candidateId: candidateId,
      // associations: true,
    };
    dispatch(fetchJobApplications(params));
  }, [dispatch, candidateId]);

  return (
    <div className="p-6 bg-white rounded-lg border">
      <h1 className="text-xl font-semibold mb-4">Also Applied</h1>
      <p className="mb-4">
        This candidate has also applied to these job openings
      </p>

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
          {data?.items.map((job, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm ">{job.job.tittle}</td>
              <td
                className={`px-6 py-4 text-sm ${
                  job.stage === 'Rejected' ? 'text-[#F53649]' : ''
                }`}
              >
                {job.stage}
              </td>
              <td className="px-6 py-4 text-sm ">{'N/A'}</td>
              <td className="px-6 py-4 text-sm ">
                {job.createdAt.split('T')[0]}
              </td>
              <td className="px-6 py-4 text-sm ">{job.job.status}</td>
              <td className=" py-4">
                <span
                  onClick={() => router.push(`/hr/hiring/job/${job.job.id}`)}
                  className="border border-gray-300 rounded-lg p-2 flex items-center justify-center hover:bg-black hover:text-white cursor-pointer"
                >
                  <BiChevronRight className="text-lg" />
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
