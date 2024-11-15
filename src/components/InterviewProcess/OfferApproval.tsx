import { PiListChecksLight } from 'react-icons/pi';

const OfferApproval = () => {
  return (
    <form className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
        <PiListChecksLight size={24} />
        Offer Approval
      </h2>
      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Send Interview Invite</span>
        <input
          type="text"
          name="invite"
          value="google meet"
          className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
      </label>
      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Date</span>
        <input
          type="text"
          name="date"
          value="24.01.2023"
          className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
      </label>
      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Time</span>
        <input
          type="text"
          name="time"
          value="13:45"
          className="outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
      </label>

      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Interview Rating</span>
        <input
          type="text"
          name="rating"
          value="Select interview score"
          className="opacity-50 outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
      </label>
      {/* this div is for UI purposes */}
      <div className="hidden lg:block"></div>
      <div className="hidden lg:block"></div>

      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Notes</span>
        <textarea
          name="Notes"
          rows={5}
          className="opacity-50 outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full resize-none"
          // value=""
        >
          Add notes for interview
        </textarea>
      </label>
      {/* this div is for UI purposes */}
      <div className="hidden lg:block"></div>
      <div className="hidden lg:block"></div>
    </form>
  );
};
export default OfferApproval;
