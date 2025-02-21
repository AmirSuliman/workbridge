import { JobApplicationsState } from '@/types/next-auth';

export const HiringTabs = ({
  activeTab,
  setActiveTab,
  jobApplication,
}: {
  activeTab: string;
  setActiveTab: (value: string) => void;
  jobApplication: JobApplicationsState;
}) => {
  const stage = jobApplication.data?.items[0]?.stage || 'Applied';
  return (
    <nav className="relative flex items-center gap-8 border-b border-gray-300">
      {stage === 'Onboarding' && (
        <button
          onClick={() => {
            setActiveTab('Onboarding');
          }}
          className={`py-2 px-4 ${
            activeTab === 'Onboarding'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'text-gray-600'
          }`}
        >
          Interview Summary
        </button>
      )}
      <button
        onClick={() => {
          setActiveTab('jobOpenings');
        }}
        className={`py-2 px-4 ${
          activeTab === 'jobOpenings'
            ? 'text-black font-semibold border-b-2 border-black'
            : 'text-gray-600'
        }`}
      >
        Interview Process
      </button>
      <button
        onClick={() => setActiveTab('candidates')}
        className={`py-2 px-4 ${
          activeTab === 'candidates'
            ? 'text-black font-semibold border-b-2 border-black'
            : 'text-gray-600'
        }`}
      >
        Candidate Information
      </button>
    </nav>
  );
};
