import Candidatecomponent from '@/components/Candidatecomponent/candidate';
import CandidateInfo from '@/components/Candidatecomponent/candidateinfo';
import Jobapplied from '@/components/Candidatecomponent/jobapplied';
import { FaArrowRight } from 'react-icons/fa';

const Candidate = () => {
  return (
    <main className="space-y-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2 text-[22px] font-semibold">
          <img src="/jobicon.png" alt="img" className="w-5" />
          Software Engineer
        </div>
        <a href="/hr/Hiring/interview-process">
          <button className="flex flex-row items-center gap-4 p-3 bg-[#0F172A] text-white text-[12px] rounded-lg">
            Proceed to First Round Interview <FaArrowRight />{' '}
          </button>
        </a>
      </div>
      <div className="p-6 bg-white border rounded-lg mt-8">
        <Candidatecomponent />

        <div className="w-full h-[1.5px] bg-gray-300 mt-8" />
        <CandidateInfo />
      </div>

      <Jobapplied />
    </main>
  );
};
export default Candidate;
