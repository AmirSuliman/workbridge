'use client';
import { useState, useEffect } from 'react';
import { PiListChecksLight } from 'react-icons/pi';
import axiosInstance from '@/lib/axios';


interface OnboardingProps {
  id: number ;
  candidateId:  string;
}

interface FileOption {
  id: number | string;
  label: string;
}
const Onboarding = ({ jobId, candidateId }) => {
  const [isOpenOnboarding, setIsOpenOnboarding] = useState(false);
  const [isOpenPolicies, setIsOpenPolicies] = useState(false);
  const [selectedOnboardingFiles, setSelectedOnboardingFiles] = useState<string[] | number[]>([]);
  const [onboardingOptions, setOnboardingOptions] = useState<OnboardingProps[]>([]);
  const [selectedPolicyFiles, setSelectedPolicyFiles] = useState<string[] | number[]>([]);
  const [policyOptions, setPolicyOptions] = useState<FileOption[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(jobId, 'jobid');
  useEffect(() => {
    const fetchOnboardingFiles = async () => {
      try {
        const response = await axiosInstance.get('/files');
        if (response.data?.data?.items && Array.isArray(response.data.data.items)) {
          const options = response.data.data.items.map((file) => ({
            id: file.id,
            label: file.fileName,
          }));
          setOnboardingOptions(options);
        }
      } catch (error) {
        console.error('Error fetching onboarding files:', error);
      }
    };

    const fetchPolicyFiles = async () => {
      try {
        const response = await axiosInstance.get('/policies');
        if (response.data?.data && Array.isArray(response.data.data)) {
          const options = response.data.data.map((file) => ({
            id: file.id,
            label: file.title,
          }));
          setPolicyOptions(options);
        }
      } catch (error) {
        console.error('Error fetching policy files:', error);
      }
    };

    fetchOnboardingFiles();
    fetchPolicyFiles();
  }, []);

  const toggleOnboardingDropdown = () => setIsOpenOnboarding(!isOpenOnboarding);
  const togglePolicyDropdown = () => setIsOpenPolicies(!isOpenPolicies);

  const handleOnboardingSelection = (id) => {
    setSelectedOnboardingFiles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePolicySelection = (id) => {
    setSelectedPolicyFiles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      fileIds: selectedOnboardingFiles,
      policyIds: selectedPolicyFiles,
    };

    try {
      const response = await axiosInstance.post(
        `/onboarding/${jobId}/${candidateId}`,
        payload
      );
      console.log('Onboarding finalized successfully:', response.data);
    } catch (error) {
      console.error('Error finalizing onboarding:', error);
      alert('An error occurred while finalizing onboarding.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {/* Heading */}
      <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
        <PiListChecksLight size={24} />
        Onboarding
      </h2>

      {/* Onboarding Select Input */}
      <div className="mt-6 relative">
        <p className="text-gray-400 text-[14px]">Onboarding Document</p>
        <div
          onClick={toggleOnboardingDropdown}
          className="font-medium text-sm flex w-[300px] items-center gap-4 outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-3 cursor-pointer"
        >
          <span>
            {selectedOnboardingFiles.length > 0
              ? `${selectedOnboardingFiles.length} file(s) selected`
              : 'Select Onboarding Files'}
          </span>
          <span className="ml-auto">&#9660;</span>
        </div>

        {isOpenOnboarding && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 w-[300px] rounded shadow-lg z-10">
            {onboardingOptions.length > 0 ? (
              onboardingOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={selectedOnboardingFiles.includes(option.id)}
                    onChange={() => handleOnboardingSelection(option.id)}
                    className="outline-none appearance-none h-5 w-5 border-[1px] border-[#0F172A] rounded-sm bg-white peer checked:bg-[#0F172A] checked:border-[#0F172A]"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))
            ) : (
              <p className="text-center text-sm text-gray-400 p-4">
                No onboarding files available
              </p>
            )}
          </div>
        )}
      </div>

      {/* Display Selected Onboarding Items */}
      <div className="mt-4">
        <h3 className="font-medium text-sm">Selected Onboarding Files:</h3>
        <ul className="text-sm list-disc pl-5">
          {selectedOnboardingFiles.length > 0 ? (
            onboardingOptions
              .filter((option) => selectedOnboardingFiles.includes(option.id))
              .map((option) => <li key={option.id}>{option.label}</li>)
          ) : (
            <li className="opacity-50">No files selected</li>
          )}
        </ul>
      </div>

      {/* Policies Select Input */}
      <div className="mt-6 relative">
        <p className="text-gray-400 text-[14px]">Company Policies</p>
        <div
          onClick={togglePolicyDropdown}
          className="font-medium text-sm flex items-center gap-4 outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-3 w-[300px] cursor-pointer"
        >
          <span>
            {selectedPolicyFiles.length > 0
              ? `${selectedPolicyFiles.length} file(s) selected`
              : 'Select Policy Files'}
          </span>
          <span className="ml-auto">&#9660;</span>
        </div>

        {isOpenPolicies && (
          <div className="absolute top-full left-0 mt-2 w-[300px] bg-white border border-gray-300 rounded shadow-lg z-10">
            {policyOptions.length > 0 ? (
              policyOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={selectedPolicyFiles.includes(option.id)}
                    onChange={() => handlePolicySelection(option.id)}
                    className="outline-none appearance-none h-5 w-5 border-[1px] border-[#0F172A] rounded-sm bg-white peer checked:bg-[#0F172A] checked:border-[#0F172A]"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))
            ) : (
              <p className="text-center text-sm text-gray-400 p-4">
                No policy files available
              </p>
            )}
          </div>
        )}
      </div>

      {/* Display Selected Policy Items */}
      <div className="mt-4">
        <h3 className="font-medium text-sm">Selected Policy Files:</h3>
        <ul className="text-sm list-disc pl-5">
          {selectedPolicyFiles.length > 0 ? (
            policyOptions
              .filter((option) => selectedPolicyFiles.includes(option.id))
              .map((option) => <li key={option.id}>{option.label}</li>)
          ) : (
            <li className="opacity-50">No files selected</li>
          )}
        </ul>
      </div>

      {/* Finalize Button */}
      <div className="flex items-center justify-center w-full mt-12">
        <button
          type="submit"
          className="p-3 w-[500px] text-center bg-black text-white"
          disabled={loading}
        >
          {loading ? 'Finalizing...' : 'Finalize Onboarding'}
        </button>
      </div>
    </form>
  );
};

export default Onboarding;
