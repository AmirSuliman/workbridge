import ScreenLoader from '@/components/common/ScreenLoader';
import { fetchSurveys } from '@/store/slices/surveySlice';
import { AppDispatch, RootState } from '@/store/store';
import { SurveyProps } from '@/types/common';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

const Evaluationlist = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (
      state: RootState
    ): {
      data: { items: SurveyProps[] } | null;
      loading: boolean;
      error: string | null;
    } => state.surveys
  );

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

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

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 text-[14px] text-gray-400">
                Sent by
              </th>
              <th className="text-left p-4 text-[14px] text-gray-400">
                Employee/Manager
              </th>
              <th className="text-left p-4 text-[14px] text-gray-400">
                Department
              </th>
              <th className="text-left p-4 text-[14px] text-gray-400">
                No. of Employees
              </th>
              <th className="text-left p-4 text-[14px] text-gray-400">Date</th>
              <th className="text-left p-4 text-[14px] text-gray-400">
                Status
              </th>
              <th className="p-4 text-[12px] text-gray-600"></th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td className="text-center p-1" colSpan={6}>
                  <ScreenLoader />
                </td>
              </tr>
            </tbody>
          ) : error ? (
            <tbody>
              <tr>
                <td className="text-center p-1" colSpan={6}>
                  Error: {error}
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
  {data?.items?.map((survey) => (
    <tr
      key={survey.id}
      className="border-b"
      onClick={() => {
        router.push(
          `/hr/evaluation-&-reports/evaluation/${survey.managers[0]?.id}?survey=${survey.id}`
        );
      }}
    >
      <td className="p-4 text-[14px] text-gray-800">
        {`${survey?.user?.firstName} ${survey?.user?.lastName}`}
      </td>
      <td className="p-4 text-[14px] text-gray-800">
        {survey.managers.length > 0
          ? `${survey.managers[0]?.firstName} ${survey.managers[0]?.lastName}`
          : "N/A"}
      </td>
      <td className="p-4 text-[14px] text-gray-800">
        {survey.managers[0]?.department?.name || "N/A"}
      </td>
      <td className="p-4 text-[14px] text-gray-800">
        {survey.managerEmployeeCount[survey.managers[0]?.id] || 0}
      </td>
      <td className="p-4 text-[14px] text-gray-800">
        {new Date(survey.createdAt).toLocaleDateString()}
      </td>
      <td
        className={`p-4 text-[14px] ${
          survey.status === "Completed" ? "text-[#00B87D]" : "text-gray-800"
        }`}
      >
        {survey.status}
      </td>
      <td className="p-4 text-[14px] text-gray-800 text-end mr-0 ml-auto">
        <button className="flex flex-row items-center justify-end gap-3 p-1 px-3 border rounded">
          {survey.status === "Completed" ? "View Results" : "View"}
          <BiChevronRight />
        </button>
      </td>
    </tr>
  ))}
</tbody>

          )}
        </table>
      </div>
    </div>
  );
};

export default Evaluationlist;
