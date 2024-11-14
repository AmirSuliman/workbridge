import { PiListChecksLight } from 'react-icons/pi';

const SendInvite = () => {
  return (
    <form className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
        <PiListChecksLight size={24} />
        First Round
      </h2>

      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Send Interview Invite</span>
        <select
          name="invite"
          className="outline-none opacity-50 rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        >
          <option value="">Select invite type</option>
          <option value="Onsite">Onsite</option>
          <option value="Online">Google Meet</option>
        </select>
      </label>

      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Date</span>
        <input
          type="date"
          name="date"
          value="date"
          className="outline-none opacity-50 rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
      </label>

      <label className="font-medium text-sm flex flex-col">
        <span className="opacity-35">Time</span>
        <input
          type="time"
          name="time"
          value="Time"
          className="outline-none opacity-50 rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full"
        />
      </label>
    </form>
  );
};
export default SendInvite;
