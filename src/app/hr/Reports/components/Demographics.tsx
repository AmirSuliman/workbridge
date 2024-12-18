import { BiArrowFromRight } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
const Demographics=()=>{

    return(
        <div className="p-6 bg-white border rounded-[10px]">
           <div className="flex flex-row items-center justify-between w-full">
                   <div className="flex flex-row items-center gap-2"><BiArrowFromRight/>Demographics </div>
                   <div className="flex flex-row items-center gap-4">
                       <button className="p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2"><FaDownload/> Download</button>
                   </div>
            </div>
            <Image src='/map.png' alt="img" width={1000} height={1000} className="mt-10"/>

            <div className="flex flex-col sm:flex-row items-center w-full sm:w-[80%] gap-8 mt-8">
               <div className="flex flex-col gap-1 p-4 w-full border rounded">
                <p className="text-[14px] ">Kosova</p>
                <p className="text-[16px] font-medium">34 employees</p>
                </div> 
                <div className="flex flex-col gap-1 p-4 w-full border rounded">
                <p className="text-[14px] ">Albania</p>
                <p className="text-[16px] font-medium">34 employees</p>
                </div> 
                <div className="flex flex-col gap-1 p-4 w-full border rounded">
                <p className="text-[14px] ">N. Macedonia</p>
                <p className="text-[16px] font-medium">34 employees</p>
                </div> 
                <div className="flex flex-col gap-1 p-4 w-full border rounded">
                <p className="text-[14px] ">South Asia</p>
                <p className="text-[16px] font-medium">34 employees</p>
                </div> 

            </div>
        </div>
    )
}

export default Demographics;