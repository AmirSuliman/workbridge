import { fetchJobApplications } from '@/store/slices/jobApplicationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const ProceedToNextRoundButton = () => {
  const { candidateId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const jobId = searchParams?.get('job');

  useEffect(() => {
    const params = {
      candidateId: candidateId || undefined,
      jobId: jobId || undefined,
    };
    dispatch(fetchJobApplications(params));
  }, [dispatch, candidateId, jobId]);

  const jobApplication = useSelector(
    (state: RootState) => state.jobApplications
  );

  const stage = jobApplication.data?.items[0].stage;
  // const isRating = jobApplication.data?.items[0].isRatting;

  console.log('jobApplication: ', jobApplication.data?.items[0]);

  const RenderButtonText = () => {
    if (stage === 'Applied') return 'Proceed to First Round Interview';
    else if (stage === 'First') return 'Proceed to Technical Round Interview';
    else if (stage === 'Technical') return 'Proceed to Second Round Interview';
    else if (stage === 'Second') return 'Proceed to Negotiation';
    else if (stage === 'Negotiation') return 'Proceed to Offer';
    else if (stage === 'Offer' || stage == 'Onboarding')
      return 'Proceed to Onboarding';
    else if (stage === 'Onboarded') return 'Already Onboarded';
  };
  return (
    <Link
      href={`/hr/hiring/interview-process?candidate=${candidateId}&job=${jobId}`}
      className="flex flex-row items-center gap-4 p-3 bg-[#0F172A] text-white text-[12px] rounded-lg"
    >
      {RenderButtonText()} <FaArrowRight />{' '}
    </Link>
  );
};
export default ProceedToNextRoundButton;
