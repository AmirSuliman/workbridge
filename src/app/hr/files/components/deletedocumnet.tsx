import { FaTimes } from "react-icons/fa";

const Deletedocument = ({ setIsModalOpen4 }) => {
    return (
      <div className="w-full sm:w-[600px] p-8 bg-white rounded shadow-lg relative">
        <button
          onClick={() => setIsModalOpen4(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="font-semibold text-xl mb-4">Delete</h2>
       <div className="text-center mt-16">
       <p className="text-[22px]">Are you sure want to delete this item?</p>
       <p className="text-[16px] font-semibold">This action is irreversible</p>
       <div className='flex flex-row items-center w-full p-4 mt-24 gap-6 px-8'>
        <button className='rounded w-full bg-[#0F172A] text-white p-4 text-center text-[14px]'>Confirm</button>
        <button className='rounded w-full border  p-4 text-center text-[14px]'>Cancel</button>
      </div>
       </div>
      </div>
    );
  };

export default Deletedocument;