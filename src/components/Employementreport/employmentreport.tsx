import Button from '@//components/Button';
import { PiArrowUpRightThin } from 'react-icons/pi';
import MonthlyBarChart from './barchart';
import { FiUsers } from 'react-icons/fi';
const Employeementreport =()=>{

    return(
        <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4">
        <div className="flex flex-row items-center justify-between w-full p-4">
            <div className="flex flex-row items-center gap-2">
                <img src="/Vector (Stroke).png" alt="img"/>
                <h1 className="font-medium text-[#0F172A]">Employee Report</h1>
            </div>
            <Button
              name="See All"
              icon={<PiArrowUpRightThin size={18} />}
              bg="transparent"
              textColor="black"
            />        
            </div>

            <div className="flex flex-row items-center justify-between w-full p-4">
            <div className="flex flex-row items-center gap-2">
               <FiUsers/>
                <p className="text-[#0F172A] text-[14px]">88 total employees</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
             <p className="text-[#0F172A] text-sm ">Filter</p>
             <select className="p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
               <option value="">Select</option>
               <option value="option1">Option 1</option>
               <option value="option2">Option 2</option>
               <option value="option3">Option 3</option>
             </select>
           </div>
                 
            </div>
            <MonthlyBarChart/>
        </section>
    )
}
export default Employeementreport;