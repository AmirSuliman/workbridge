import { HiSpeakerphone } from "react-icons/hi";
import Image from "next/image";
import { PiArrowUpRightThin } from "react-icons/pi";

const  Newpolicyupdate = ()=>{

    return(
        <div className="p-6 bg-white rounded-[10px] border">
           <h1 className="text-[18px] font-medium flex flex-row items-center gap-2">             
            <HiSpeakerphone  size={22}/>
           New Policies Update</h1>

           <div className="flex flex-row items-center justify-between w-full">
             <div className="flex flex-row items-center gap-2 mt-8">
                 <Image src='/Group 1000004576.png' alt="img" width={40} height={40} /> 
                 <div className="flex flex-col">
                    <p className="text-[14px] font-semibold">Work from Home Policy Update</p>
                    <div className="flex flex-row items-center gap-5">
                        <p className="text-[12px]">Posted by: <span className="font-semibold">Juliette Nicols</span></p>
                        <p className="text-[12px]">Effective Date:  <span className="font-semibold">October 23, 2024</span></p>
                    </div>
                 </div>
             </div>
              <button className="border rounded p-2 flex flex-row items-center gap-3 text-[10px] mt-8">View <PiArrowUpRightThin size={18} /></button>
           </div>

           <div className="w-full h-[1px] bg-gray-200 mt-4"/>

           <div className="flex flex-row items-center justify-between w-full">
             <div className="flex flex-row items-center gap-2 mt-4">
                 <Image src='/Group 1000004576.png' alt="img" width={40} height={40} /> 
                 <div className="flex flex-col">
                    <p className="text-[14px] font-semibold">Work from Home Policy Update</p>
                    <div className="flex flex-row items-center gap-5">
                        <p className="text-[12px]">Posted by: <span className="font-semibold">Juliette Nicols</span></p>
                        <p className="text-[12px]">Effective Date:  <span className="font-semibold">October 23, 2024</span></p>
                    </div>
                 </div>
             </div>
              <button className="border rounded p-2 flex flex-row items-center gap-3 text-[10px] mt-8">View <PiArrowUpRightThin size={18} /></button>
           </div>

           <div className="w-full h-[1px] bg-gray-200 mt-4"/>
           
           <div className="flex flex-row items-center justify-between w-full">
             <div className="flex flex-row items-center gap-2 mt-4">
                 <Image src='/Group 1000004576.png' alt="img" width={40} height={40} /> 
                 <div className="flex flex-col">
                    <p className="text-[14px] font-semibold">Work from Home Policy Update</p>
                    <div className="flex flex-row items-center gap-5">
                        <p className="text-[12px]">Posted by: <span className="font-semibold">Juliette Nicols</span></p>
                        <p className="text-[12px]">Effective Date:  <span className="font-semibold">October 23, 2024</span></p>
                    </div>
                 </div>
             </div>
              <button className="border rounded p-2 flex flex-row items-center gap-3 text-[10px] mt-8">View <PiArrowUpRightThin size={18} /></button>
           </div>
        </div>
    )
}

export default Newpolicyupdate;