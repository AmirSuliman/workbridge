import { FaDownload } from "react-icons/fa6";
import SimpleBarChart from "./charts/quartleychart";
import { BiTrendingUp } from "react-icons/bi";
const QuartelyReport =()=>{

    return(
        <div className="p-6 bg-white border rounded-[10px]">
           <div className="flex flex-row items-center justify-between w-full mb-12">
                      <div className="flex flex-row items-center gap-2"><BiTrendingUp/>Quarterly Reports </div>
                      <div className="flex flex-row items-center gap-4">
                         <div className="text-[12px] text-gray-400 flex flex-row items-center gap-2">Filter 
                           <select className="border rounded p-2">
                              <option>All Quarters</option>
                              <option>All Quarters</option>
                              <option>All Quarters</option>
                           </select>
                           </div>
                          <button className="p-2 bg-black rounded text-white text-[12px] flex flex-row items-center gap-2"><FaDownload/> Download</button>
                      </div>
                     </div>
                     <SimpleBarChart/>
            </div>
    )
}

export default QuartelyReport;