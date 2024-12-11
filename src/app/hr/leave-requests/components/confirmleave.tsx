import { FaCheck } from "react-icons/fa";

interface ConfirmProps {
  employee: Employee | null;
  onClose: () => void;
}
const ConfirmLeave: React.FC<ConfirmProps> = () => {
    return (
      <div className="w-[600px] bg-white p-6 rounded-lg ">
        <h1 className="font-semibold text-[22px]">Leave Request</h1>
        
        <div className="flex flex-row items-center gap-8 mt-8">
          <label className="w-full">
            <span className="mb-2 text-gray-400 text-[12px]">Employee</span>
            <input
              type="text"
              placeholder="Darlene Robertson"
              className="w-full p-3 rounded border border-gray-300 text-black"
            />
          </label>
  
          <label className="w-full">
            <span className="mb-2 text-gray-400 text-[12px]">Leave Request</span>
            <input
              type="text"
              placeholder="13 Days (17 Nov. - 31 Nov.)"
              className="w-full p-3 rounded border border-gray-300 text-black"
            />
          </label>
        </div>
  
        <label className="w-full mt-8 flex flex-col">
          <span className="mb-1 text-gray-400 text-[12px]">Note</span>
          <textarea
            placeholder="Add a message (optional)"
            className="w-full p-4 rounded border border-gray-300 text-black resize-none"
            rows={5}
          />
        </label>

        <div className="flex flex-row items-center gap-5 w-full mt-24 px-8">
           <button
             type="button"
             className="p-4 text-center text-white bg-[#25A244] rounded text-[14px] flex items-center justify-center gap-2 w-full hover:bg-green-700"
           >
             Confirm Request <FaCheck />
           </button>
           
           <button
             type="button"
             className="p-4 text-center text-black border border-gray-300 rounded text-[14px] w-full hover:bg-gray-100"
           >
             Cancel
           </button>
         </div>
         
      </div>
    );
  };
  
  export default ConfirmLeave;
  