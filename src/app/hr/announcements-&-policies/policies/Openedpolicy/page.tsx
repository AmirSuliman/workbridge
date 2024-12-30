import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import Workfromhome from '../components/wfhpolicy';
import Image from 'next/image';
const Openedpolicy = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-[22px] font-semibold">All policy</h1>
        <div className="flex flex-row items-center gap-2">
          <button className="bg-black text-[14px] text-white p-2 rounded px-4 flex flex-row items-center gap-3">
            Edit Policy <FaEdit />
          </button>
          <button className="p-2 bg-white rounded flex flex-row items-center gap-3 border text-[14px]">
            Delete Policy <FaDeleteLeft />
          </button>
        </div>
      </div>

      <div className="p-6 bg-white border rounded-[10px] mt-8 flex flex-col sm:flex-row items-start gap-6">
        <div className="w-full sm:w-[70%]">
          <Workfromhome />
        </div>
        <div className="flex flex-col gap-8 p-6 border rounded-[10px] flex-1 ">
          <h1 className="font-semibold text-[16px]">
            Employee acceptance info
          </h1>
          <div className="flex flex-row items-center justify-between w-full ">
            <div className="flex flex-row items-center gap-2 ">
              <Image src="/user.png" alt="img" width={30} height={30} />
              <p className="text-[12px]">Darlene Robertson</p>
            </div>
            <button className="p-1 text-[12px] bg-[#D5F6DD] text-[#00B87D] rounded ">
              Accepted
            </button>
          </div>
          <div className="flex flex-row items-center justify-between w-full ">
            <div className="flex flex-row items-center gap-2 ">
              <Image src="/user.png" alt="img" width={30} height={30} />
              <p className="text-[12px]">Darlene Robertson</p>
            </div>
            <button className="p-1 text-[12px] bg-[#D5F6DD] text-[#00B87D] rounded ">
              Accepted
            </button>
          </div>
          <div className="flex flex-row items-center justify-between w-full ">
            <div className="flex flex-row items-center gap-2 ">
              <Image src="/user.png" alt="img" width={30} height={30} />
              <p className="text-[12px]">Darlene Robertson</p>
            </div>
            <button className="p-1 text-[12px] bg-[#D5F6DD] text-[#00B87D] rounded ">
              Accepted
            </button>
          </div>
          <div className="flex flex-row items-center justify-between w-full ">
            <div className="flex flex-row items-center gap-2 ">
              <Image src="/user.png" alt="img" width={30} height={30} />
              <p className="text-[12px]">Darlene Robertson</p>
            </div>
            <button className="p-1 text-[12px] bg-[#D5F6DD] text-[#00B87D] rounded ">
              Accepted
            </button>
          </div>
          <div className="flex flex-row items-center justify-between w-full ">
            <div className="flex flex-row items-center gap-2 ">
              <Image src="/user.png" alt="img" width={30} height={30} />
              <p className="text-[12px]">Darlene Robertson</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="p-1 text-[12px] bg-[#FDCED3] text-[#F53649] rounded ">
                Not Accepted
              </button>
              <p className="text-[9px]">Send reminder</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full ">
            <div className="flex flex-row items-center gap-2 ">
              <Image src="/user.png" alt="img" width={30} height={30} />
              <p className="text-[12px]">Darlene Robertson</p>
            </div>
            <div className="flex flex-col gap-2 items-end-end">
              <button className="p-1 text-[12px] bg-[#FDCED3] text-[#F53649] rounded ">
                Not Accepted
              </button>
              <p className="text-[9px]">Send reminder</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Openedpolicy;
