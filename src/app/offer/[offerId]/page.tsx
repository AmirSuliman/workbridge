'use client';

import Button from '@/components/Button';
import axiosInstance from '@/lib/axios';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

type OfferData = {
  tittle: string;
  department: { name: string };
  employmentType: string;
  minYearsExperience: string;
  description: string;
  compensation: string;
  status: string;
};

const Page = () => {
  const { offerId } = useParams();
  const token = useSearchParams().get('token');

  const [jobData, setJobData] = useState<OfferData>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axiosInstance.get(`/offer/${offerId}`, {
          params: { token },
        });
        setJobData(response?.data.data);
        console.log('response', response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOffer();
  }, [offerId, token]);

  const updateOfferStatus = async (status: string) => {
    if (!offerId || !token) return;

    try {
      setLoading(true);
      setStatus(status);

      const response = await axiosInstance.put(`/offer/accept/${offerId}`, {
        token,
        status,
      });

      if (response?.status === 200) {
        setJobData((prevData) =>
          prevData ? { ...prevData, status } : { status } as OfferData
        );
        toast.success(`Offer ${status} successfully!`);
      } else {
        setError('Failed to update offer status. Please try again.');
        toast.error('Failed to update offer status.');
      }
    } catch (err) {
      setError('An unexpected error occurred while updating the offer status.');
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000]/50 flex items-center justify-center z-50">
      <div className="max-w-4xl my-4 lg:my-8 p-4 bg-white rounded-lg">
        <header className="flex items-center gap-4 justify-between pb-4 border-b-[1px] border-[#E0E0E0]">
          <h2 className="font-semibold text-lg">Offer</h2>
        </header>
        <main className="overflow-y-auto my-8">
          <h6 className="font-medium text-xs opacity-50">Job Title</h6>
          <h1 className="font-medium text-xl">{jobData?.tittle}</h1>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6">
            <div>
              <h6 className="font-medium text-xs opacity-50">Department</h6>
              <h4 className="font-medium text-base">
                {jobData?.department?.name}
              </h4>
            </div>
            <div>
              <h6 className="font-medium text-xs opacity-50">
                Employment Type
              </h6>
              <h4 className="font-medium text-base">
                {jobData?.employmentType}
              </h4>
            </div>
            <div>
              <h6 className="font-medium text-xs opacity-50">Min. Exp.</h6>
              <h4 className="font-medium text-base">
                {jobData?.minYearsExperience}
              </h4>
            </div>
          </div>
          <h6 className="font-medium text-xs opacity-50">Description</h6>
          <p className="font-medium text-base">
            {jobData?.description || 'No description'}
          </p>
          <h6 className="font-medium text-xs opacity-50 mt-4">Compensation</h6>
          <h4 className="font-medium text-base">{jobData?.compensation}</h4>
        </main>
        {jobData?.status === 'rejected' && (
          <p className="text-red-500">This offer is already rejected.</p>
        )}

        {jobData?.status === 'accepted' && (
          <p className="text-green-500">This offer is already accepted.</p>
        )}

        {jobData?.status === 'negotiation' && (
          <footer className="flex items-center gap-4 justify-center pt-4 border-t-[1px] border-[#E0E0E0]">
            <Button
              onClick={() => updateOfferStatus('accepted')}
              name={loading && status === 'accepted' ? '' : 'Accept Offer'}
              icon={
                loading && status === 'accepted' ? (
                  <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
                ) : (
                  <FaCheck />
                )
              }
              bg="#00B87D"
              className="w-full max-w-sm mx-auto bg-[#00B87D] text-white font-medium"
            />

            <Button
              onClick={() => updateOfferStatus('rejected')}
              name={loading && status === 'rejected' ? '' : 'Reject Offer'}
              icon={
                loading && status === 'rejected' ? (
                  <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
                ) : (
                  <IoClose size={22} />
                )
              }
              bg="#F53649"
              className="w-full max-w-sm mx-auto bg-[#F53649] text-white font-medium"
            />
          </footer>
        )}
      </div>
    </div>
  );
};

export default Page;
