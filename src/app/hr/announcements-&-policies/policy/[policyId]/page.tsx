'use client';

import { getPolicy } from '@/services/getPolicy';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import DeletePolicyModal from '../../policies/components/DeletePolicyModal';
import Link from 'next/link';
import PreviewPolicy from '../../policies/components/PreviewPolicy';

const Polices = () => {
  const { policyId } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [policyData, setPolicyData] = useState(null); // Default to null to check if data is loaded
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    // Check if the policyId is valid
    if (!policyId) {
      setError('Invalid policy ID.');
      setLoading(false);
      return;
    }

    const fetchPolicie = async () => {
      setLoading(true); // Set loading to true before starting the request
      try {
        const response = await getPolicy(policyId);

        // Ensure the response is valid and contains the expected data
        if (response?.data?.data) {
          setPolicyData(response.data.data);
          console.log('policy res: ', response.data.data);
        } else {
          throw new Error('Policy data is missing.');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicie();
  }, [policyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  // Render the policy data once it's loaded
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-[22px] font-semibold">All policy</h1>
        <div className="flex flex-row items-center gap-2">
          <Link
            href={`/hr/announcements-&-policies/policies/edit?id=${policyId}`}
            className="bg-black text-[14px] text-white p-2 rounded px-4 flex flex-row items-center gap-3"
          >
            Edit Policy <FaEdit />
          </Link>
          <button
            type="button"
            onClick={() => setOpenDeleteModal(true)}
            className="p-2 bg-white rounded flex flex-row items-center gap-3 border text-[14px]"
          >
            Delete Policy <FaDeleteLeft />
          </button>
        </div>
      </div>

      <div className="p-6 bg-white border rounded-[10px] mt-8 flex flex-col gap-4 xl:flex-row">
        {policyData && <PreviewPolicy previewData={policyData} />}
      </div>
      {openDeleteModal && (
        <DeletePolicyModal
          onClose={() => {
            setOpenDeleteModal(false);
          }}
        />
      )}
    </>
  );
};

export default Polices;
