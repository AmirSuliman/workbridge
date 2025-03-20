import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SurveyData {
  items: {
    id: number;
    status?: string; 
    survey: { 
      id: number; 
      status: string; 
      sendBy: string;
      user?: { firstName: string; lastName: string };
    };
    employee?: { firstName: string; lastName: string };
    manager?: { id: number; firstName: string; lastName: string };
    department?: { id: number; name: string };
    departmentHead?: { id: number; firstName: string; lastName: string }; 
    employeeCount?: number;
    createdAt: string;
  }[];
  totalPages: number;
}

const EvaluationList = ({ pageSize = 10 }: { pageSize?: number }) => {
  const [activeTab, setActiveTab] = useState<'employee' | 'department'>('employee');
  const [data, setData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchSurveys = async () => {
      setLoading(true);
      try {
        const endpoint =
          activeTab === 'employee' ? '/manager/surveys' : '/departments/surveys';
        const response = await axiosInstance.get<{ data: SurveyData; totalPages: number }>(
          endpoint,
          { params: { page: currentPage, limit: pageSize } }
        );
        setData(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, [activeTab, currentPage, pageSize]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-[10px] border">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2">Evaluations List</div>
        <div className="flex flex-row items-center gap-4">
          <div className="text-[12px] text-gray-400 flex flex-row items-center gap-2">
            Sort
            <select className="p-2 text-[12px] border rounded text-gray-700">
              <option value="2024-01-01">Select</option>
              <option value="2024-02-01">By ID</option>
              <option value="2024-03-01">Hire Date</option>
              <option value="2024-04-01">Name</option>
            </select>
          </div>
          <Link
            href="/hr/evaluation-&-reports/create-evaluation"
            className="p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2"
          >
            Create Survey
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mt-4">
        <button
          className={`p-3 ${
            activeTab === 'employee'
              ? 'border-b-2 border-black font-semibold'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('employee')}
        >
          Employee Evaluations
        </button>
        <button
          className={`p-3 ${
            activeTab === 'department'
              ? 'border-b-2 border-black font-semibold'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('department')}
        >
          Department Evaluations
        </button>
      </div>

      {/* Table */}
      <table className="w-full mt-4">
        <thead className="mt-8">
          <tr>
            <th className="p-4 text-gray-400 text-left">Sent By</th>
            <th className="p-4 text-gray-400 text-left">
              {activeTab === 'employee' ? 'Manager' : 'Department'}
            </th>
            <th className="p-4 text-gray-400 text-left">
              {activeTab === 'employee' ? 'Employee Count' : 'Department Head'}
            </th>
            <th className="p-4 text-gray-400 text-left">Created At</th>
            <th className="p-4 text-gray-400 text-left">Status</th>
            <th className="p-4 text-gray-400 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map((survey) => (
            <tr
              key={survey.id}
              className="border-b cursor-pointer"
              onClick={() => {
                const basePath = '/hr/evaluation-&-reports/evaluation';
                const departmentPath = '/hr/evaluation-&-reports/department-evaluation';

                const targetPath =
                  activeTab === 'department'
                    ? `${departmentPath}/${survey.department?.id}?survey=${survey.survey.id}&departmentHeadId=${survey.departmentHead?.id}`
                    : survey.manager
                    ? `${basePath}/${survey.manager.id}?survey=${survey.survey.id}`
                    : basePath;

                router.push(targetPath);
              }}
            >
              <td className="p-4 text-[14px] text-gray-800">
                {survey.survey.user
                  ? `${survey.survey.user.firstName} ${survey.survey.user.lastName}`
                  : survey.survey.sendBy || 'N/A'}
              </td>

              <td className="p-4 text-[14px] text-gray-800">
                {activeTab === 'employee'
                  ? survey.employee
                    ? `${survey.employee.firstName} ${survey.employee.lastName}`
                    : survey.manager
                    ? `${survey.manager.firstName} ${survey.manager.lastName}`
                    : 'N/A'
                  : survey.department?.name || 'N/A'}
              </td>

              <td className="p-4 text-[14px] text-gray-800">
                {activeTab === 'employee'
                  ? survey.employeeCount || 0
                  : `${survey.departmentHead?.firstName || 'N/A'} ${survey.departmentHead?.lastName || ''}`}
              </td>

              <td className="p-4 text-[14px] text-gray-800">
                {new Date(survey.createdAt).toLocaleDateString()}
              </td>

              <td
                className={`p-4 text-[14px] ${
                  activeTab === 'employee'
                    ? survey.status === 'Completed'
                      ? 'text-[#00B87D]'
                      : 'text-gray-800'
                    : survey.survey.status === 'Completed'
                    ? 'text-[#00B87D]'
                    : 'text-gray-800'
                }`}
              >
                {activeTab === 'employee' ? survey.status : survey.survey.status}
              </td>

              <td className="p-4 text-[14px] text-gray-800 text-end">
                <button className="flex flex-row items-center justify-end gap-3 p-1 px-3 border rounded">
                  {activeTab === 'employee'
                    ? survey.status === 'Completed'
                      ? 'View Results'
                      : 'View'
                    : survey.survey.status === 'Completed'
                    ? 'View Results'
                    : 'View'}{' '}
                  <BiChevronRight />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-end gap-2 items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`p-2 px-2 border rounded ${
            currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : ''
          }`}
        >
          <BiChevronLeft size={20} />
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className={`p-2 px-4 border rounded ${
            currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : ''
          }`}
        >
          <BiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default EvaluationList;
