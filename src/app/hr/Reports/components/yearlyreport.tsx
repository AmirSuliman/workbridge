import { BiCalendar } from "react-icons/bi";
import { BiArrowFromRight } from "react-icons/bi";
import StackedBarChart from './charts/weeklychart'
import { FaDownload } from "react-icons/fa";
const Yearlyreport =()=>{

    return(
        <div className="p-6 bg-white border rounded-[10px]">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center gap-2"><BiArrowFromRight/>Yearly report </div>
            <div className="flex flex-row items-center gap-4">
               <div className="text-[12px] text-gray-400 flex flex-row items-center gap-2">Year 
                 <select className="border rounded p-2">
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                 </select>
                 </div>
                <button className="p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2"><FaDownload/> Download</button>
            </div>
           </div>
           <div className="flex flex-row items-center gap-3 text-[14px] mt-4 mb-8">
               <BiCalendar/>
               04 Nov - 11 Nov, 2024
            </div>

            <h1 className="text-[16px] font-medium">Total Number of Applicants (141)</h1>
            <StackedBarChart/>
        </div>
    )
}

export default Yearlyreport;