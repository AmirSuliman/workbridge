'use client';

import { PiListChecksLight } from 'react-icons/pi';
import Button from '../Button';
import GenerateOffer from './GenerateOffer';
import { useState } from 'react';

const OfferAndNegotiation = () => {
  const [showOffer, setShowOffer] = useState(false);
  const handlePopup = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowOffer(!showOffer);
  };

  return (
    <form className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
        <PiListChecksLight size={24} />
        Offer and Negotiation
      </h2>
      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Start Date</span>
        <input
          type="text"
          name="startDate"
          value="24.02.2025"
          className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
      </label>
      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Compensation</span>
        <input
          type="text"
          name="Compensation"
          value="$98,000"
          className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
      </label>
      <div className="w-fit h-fit mt-auto mb-0" onClick={handlePopup}>
        <Button name="Generate Offer" />
      </div>
      {showOffer && (
        <GenerateOffer setShowOffer={(value: boolean) => setShowOffer(value)} />
      )}
    </form>
  );
};
export default OfferAndNegotiation;
