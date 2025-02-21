'use client';

import { getPolicy } from '@/services/getPolicy';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import PolicyAcceptanceInfo from '../components/PolicyAcceptanceInfo';
import PreviewPolicy from '../components/PreviewPolicy';
import DeletePolicyModal from '../components/DeletePolicyModal';
import Link from 'next/link';

const Policy = () => {
  const { policyId } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [policyData, setPolicyData] = useState({});

  useEffect(() => {
    const fetchPolicie = async () => {
      try {
        const response = await getPolicy(policyId);
        setPolicyData(response.data.data || {});
        console.log('policy res: ', response.data.data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch policy.');
      }
    };

    fetchPolicie();
  }, []);
  console.log('policyData: ', policyData);

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
        <PreviewPolicy previewData={policyData} />
        <PolicyAcceptanceInfo />
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

export default Policy;
