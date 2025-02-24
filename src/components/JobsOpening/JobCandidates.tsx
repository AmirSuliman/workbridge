import { fetchJobApplications } from '@/store/slices/jobApplicationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import AIReviewButton from './AIReviewButton';

export const JobCandidates = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { jobId } = useParams();
  const { data } = useSelector((state: RootState) => state.jobApplications);

  const [sortOption, setSortOption] = useState<string>('');
  const [aiReviewData, setAiReviewData] = useState<any[] | null>(null);

  useEffect(() => {
    const params = {
      page: 1,
      size: 1000,
      jobId,
    };
    dispatch(fetchJobApplications(params));
  }, [dispatch, jobId]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeEvaluationModal = () => {
    setIsModalOpen(false);
  };

  const mapAiReviewDataToTableFormat = (aiReviewData: any[]) => {
    return aiReviewData.map((review) => ({
      id: review.id,
      stage: 'AI Review',
      jobId: review.jobId,
      candidateId: review.candidateId,
      candidate: {
        id: review.candidateId,
        firstName: review.candidateName.split(' ')[0] || '',
        lastName: review.candidateName.split(' ')[1] || '',
        email: review.candidateEmail,
      },
      createdAt: review.createdAt,
      interviewUrl: null,
      meetingDate: null,
      meetingType: null,
      isRating: false,
      rating: null,
      reviews: [],
      files: [],
      offer: null,
      answers: [],
      aiReview: {
        overallScore: review.overallScore,
        resumeLink: review.resumeLink,
        relevantExperience: review.relevantExperience,
        technicalSkills: review.technicalSkills,
        educationCertifications: review.educationCertifications,
        relatedWorkProjects: review.relatedWorkProjects,
        conclusion: review.conclusion,
      },
    }));
  };

  const handleAiReviewDataFetched = (reviewData: any[]) => {
    const mappedData = mapAiReviewDataToTableFormat(reviewData);
    setAiReviewData(mappedData);
  };

  const displayedItems = useMemo(() => {
    if (aiReviewData) return aiReviewData;
    return data?.items || [];
  }, [aiReviewData, data?.items]);

  const sortedItems = useMemo(() => {
    return [...displayedItems].sort((a, b) => {
      switch (sortOption) {
        case 'createdAt':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case 'stage':
          return a.stage.localeCompare(b.stage);
        case 'highestRating':
          return (b.rating || 0) - (a.rating || 0);
        case 'lowestRating':
          return (a.rating || 0) - (b.rating || 0);
        default:
          return 0; // No sorting
      }
    });
  }, [displayedItems, sortOption]);

  return (
    <div className="p-4 bg-white mt-8 rounded-lg border">
      <div className="flex flex-row items-center justify-between p-2 mb-8">
        <div className="flex flex-row items-center gap-4 text-[18px] font-medium">
          <FaUsers />
          Candidates ({data?.items.length})
        </div>
        <div className="flex flex-row items-center gap-2">
          {jobId && (
            <AIReviewButton
              jobId={jobId}
              onClear={() => {
                setAiReviewData(null);
                dispatch(fetchJobApplications({ page: 1, size: 1000, jobId }));
              }}
              onDataFetched={handleAiReviewDataFetched}
            />
          )}

          <p className="text-sm text-gray-600 font-medium">Sort</p>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="createdAt">Date Applied</option>
            <option value="stage">Status</option>
            <option value="highestRating">Highest Rating</option>
            <option value="lowestRating">Lowest Rating</option>
          </select>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="text-gray-400 font-medium p-4">
          <tr>
            <th className="px-4 py-4 text-left text-sm font-medium">
              Candidate Information
            </th>
            <th className="px-4 py-4 text-left text-sm font-medium">Status</th>
            <th className="px-4 py-4 text-left text-sm font-medium">Rating</th>
            <th className="px-4 py-4 text-left text-sm font-medium">Applied</th>
            <th className="px-4 py-4 text-left text-sm font-medium">Email</th>

            {sortedItems.some((item) => item.aiReview?.relevantExperience) && (
              <th className="px-4 py-4 text-left text-sm font-medium">
                Relevant Experience
              </th>
            )}
            {sortedItems.some((item) => item.aiReview?.technicalSkills) && (
              <th className="px-4 py-4 text-left text-sm font-medium">
                Technical Skills
              </th>
            )}

            {sortedItems.some((item) => item.aiReview?.relatedWorkProjects) && (
              <th className="px-4 py-4 text-left text-sm font-medium">
                Related Work Projects
              </th>
            )}
            {sortedItems.some((item) => item.aiReview?.conclusion) && (
              <th className="px-4 py-4 text-left text-sm font-medium">
                Conclusion
              </th>
            )}
            <th className="px-4 py-4 text-left text-sm font-medium"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedItems.map((item, index) => (
            // don't use item.candidate.id as a key here, it cause duplicate key error
            <tr key={index}>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {`${item.candidate.firstName} ${item.candidate.lastName}`}
              </td>
              <td
                className={`px-4 py-4 whitespace-nowrap text-sm ${
                  item.stage === 'Rejected' ? 'text-[#F53649]' : 'text-gray-500'
                }`}
              >
                {item.stage}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.rating != null
                  ? `${item.rating}/10`
                  : item.aiReview?.overallScore}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.createdAt ? item.createdAt.split('T')[0] : ''}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                <a
                  href={`mailto:${item.candidate.email}`}
                  className="text-blue-600"
                >
                  {item.candidate.email}
                </a>
              </td>
              {item.aiReview?.relevantExperience && (
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.aiReview.relevantExperience}
                </td>
              )}
              {item.aiReview?.technicalSkills && (
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.aiReview.technicalSkills}
                </td>
              )}

              {item.aiReview?.relatedWorkProjects && (
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.aiReview.relatedWorkProjects}
                </td>
              )}
              {item.aiReview?.conclusion && (
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => openModal(item.aiReview.conclusion)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View
                  </button>
                </td>
              )}
              <td className="px-6 py-4">
                <span
                  onClick={() =>
                    router.push(`candidate/${item.candidate.id}?job=${jobId}`)
                  }
                  className="border border-gray-300 rounded-lg p-2 flex items-center justify-center hover:bg-black hover:text-white cursor-pointer"
                >
                  <BiChevronRight className="text-lg" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Conclusion</h2>
            <p>{modalContent}</p>
            <button
              onClick={closeEvaluationModal}
              className="bg-[#0F172A] mt-4 p-2 rounded-lg text-white flex flex-row gap-4 items-center"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
