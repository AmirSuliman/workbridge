import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { GoZap } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';
import {
  fetchAiReviewData,
  clearAiReviewData,
} from '@/store/slices/candidateEvaluationSlice';
import { AppDispatch, RootState } from '@/store/store';

interface AIReviewButtonProps {
  jobId: string | string[];
  onClear: () => void;
}

const AIReviewButton = ({ jobId, onClear }: AIReviewButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.aiReview);
  const [isSorted, setIsSorted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSortClick = useCallback(async () => {
    setIsModalOpen(true);
    try {
      await dispatch(fetchAiReviewData(jobId)).unwrap();
      setIsSorted(true);
    } catch (error) {
      console.error('Failed to fetch AI Review:', error);
    } finally {
      setIsModalOpen(false);
    }
  }, [dispatch, jobId]);

  const handleClearClick = () => {
    setIsSorted(false);
    dispatch(clearAiReviewData());
    onClear();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSortClick}
        style={{
          background:
            'linear-gradient(273.81deg, #0F172A -0.31%, #334F90 50.29%, #0F172A 110.09%)',
          borderImageSource:
            'linear-gradient(176.57deg, #042269 -0.73%, #0A1123 104.64%)',
          borderImageSlice: 1,
        }}
        className={` text-white border-[#E0E0E0] rounded-[10px] flex items-center justify-center px-4 py-2 gap-2 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        <GoZap size={20} />
        {loading ? 'Sorting...' : isSorted ? 'Sorted with AI' : 'Sort with AI'}
      </button>
      {isSorted && (
        <button
          onClick={handleClearClick}
          className="text-gray-500 hover:text-black"
        >
          <RxCross2 size={24} />
        </button>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center ">
            <h2 className="text-xl font-bold text-center mb-4">
              Sorting Candidates
            </h2>

            <img
              src="\animation_ai_review.gif"
              alt="AI Review Animation"
              className="w-32 h-32 mb-4"
            />

            <p className="text-gray-700 mb-4">
              Letting AI work its magic! Sorting candidates with the most
              potential.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="border border-gray-300 rounded-lg  px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIReviewButton;
