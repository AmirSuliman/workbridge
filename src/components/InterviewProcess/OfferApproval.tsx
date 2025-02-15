import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import { PiArrowUpRightThin, PiListChecksLight } from 'react-icons/pi';
import { IoCheckmark } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import Link from 'next/link';
import Button from '../Button';
import { AxiosError } from 'axios';
import GenerateOffer from './GenerateOffer';
import SeeOffer from './SeeOffer';

interface OfferBy {
  firstName: string;
  lastName: string;
}

interface OfferData {
  offerBy: OfferBy | null;
  createdAt: string;
  status: string;
}
const OfferApproval = ({ jobApplication, offerId, token }) => {
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    const fetchOffer = async () => {
      if (!offerId || isNaN(offerId)) {
        setError('Offer ID must be numeric.');
        return;
      }
      if (!token) {
        setError('Token is required.');
        return;
      }

      try {
        console.log('Fetching offer data with:', { offerId, token });

        const response = await axiosInstance.get(`/offer/${offerId}`, {
          params: {
            token,
            associations: true,
          },
        });

        if (response?.data) {
          console.log('Offer Data Response:', response.data);
          setOfferData(response.data.data);
        } else {
          setError('No data received from the API.');
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error('Axios Error:', err.response || err.message);
          setError(
            err.response?.data?.message ||
              'Failed to fetch offer data. Please try again later.'
          );
        } else {
          console.error('Unexpected Error:', err);
          setError('An unexpected error occurred. Please try again.');
        }
      }
    };

    fetchOffer();
  }, [offerId, token]);

  const updateOfferStatus = async (status: string) => {
    if (!offerId || !token) return;

    try {
      const response = await axiosInstance.put(`/offer/accept/${offerId}`, {
        token,
        status,
      });

      if (response?.status === 200) {
        setOfferData((prevData) => (prevData ? { ...prevData, status } : null));
      } else {
        setError('Failed to update offer status. Please try again.');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message ||
            'Failed to update offer status. Please try again later.'
        );
      } else {
        setError(
          'An unexpected error occurred while updating the offer status.'
        );
      }
    }
  };

  if (!offerData) {
    return <div>Loading...</div>;
  }

  const sender = `${offerData.offerBy?.firstName || 'N/A'} ${
    offerData.offerBy?.lastName || ''
  }`;
  const dateSent = new Date(offerData.createdAt).toLocaleDateString();
  const timeSent = new Date(offerData.createdAt).toLocaleTimeString();
  const offerStatus = offerData.status;

  const renderActions = () => {
    if (offerStatus === 'accepted') {
      return (
        <td colSpan={2} className="p-1 lg:p-3 text-green-600 font-medium">
          <span className="border border-green-600 p-3 px-4 rounded text-[12px]">
            Offer Accepted
          </span>
        </td>
      );
    }

    if (offerStatus === 'rejected') {
      return (
        <td colSpan={2} className="p-1 lg:p-3 text-red-600 font-medium ml-8">
          <span className="border border-red-600 p-3 px-4 rounded text-[12px]">
            Offer Rejected
          </span>
        </td>
      );
    }

    return (
      <>
        <td className="p-1 lg:p-3">
          <Button
            className="text-[10px] cursor-default"
            name="Offer Accepted"
            bg="#00B87D"
            textColor="white"
            icon={<IoCheckmark />}
            // onClick={() => updateOfferStatus('accepted')}
          />
        </td>
        <td className="p-1 lg:p-3">
          <Button
            className="text-[10px] cursor-default"
            name="Rejected"
            bg="#F53649"
            textColor="white"
            icon={<RxCross1 />}
            // onClick={() => updateOfferStatus('rejected')}
          />
        </td>
      </>
    );
  };

  return (
    <section className="overflow-x-auto">
      <h2 className="flex font-medium text-lg items-center gap-4">
        <PiListChecksLight size={24} />
        Offer Approval
      </h2>
      <table className="w-full mt-4">
        <thead>
          <tr className="w-full border-b">
            <th className="table-header wide-column opacity-35 font-medium text-sm">
              Offer sent by
            </th>
            <th className="table-header narrow-column opacity-35 font-medium text-sm">
              Date sent
            </th>
            <th className="table-header narrow-column opacity-35 font-medium text-sm">
              Time sent
            </th>
            <th className="table-header narrow-column opacity-35 font-medium text-sm">
              Offer
            </th>
            <th className="table-header narrow-column opacity-35 font-medium text-sm"></th>
            <th className="table-header narrow-column opacity-35 font-medium text-sm"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-full">
            <td className="table-cell wide-column font-medium text-sm">
              {sender}
            </td>
            <td className="table-cell narrow-column font-medium text-sm">
              {dateSent}
            </td>
            <td className="table-cell narrow-column font-medium text-sm">
              {timeSent}
            </td>
            <td className="table-cell narrow-column">
              <Button
                onClick={() => setShowOffer(true)}
                className="text-[10px]"
                name="See offer"
                icon={<PiArrowUpRightThin size={18} />}
                bg="transparent"
                textColor="black"
              />
            </td>
            {renderActions()}
          </tr>
        </tbody>
      </table>

      {showOffer && (
        <SeeOffer setShowOffer={setShowOffer} jobApplication={jobApplication} />
      )}
    </section>
  );
};

export default OfferApproval;
