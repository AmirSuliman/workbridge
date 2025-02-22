import { PiArrowUpRightThin } from 'react-icons/pi';
import MonthlyBarChart from './barchart';
import { FiUsers } from 'react-icons/fi';
import Button from '../Button';
import Link from 'next/link';

const Employeementreport = () => {
  return (
    <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] p-4">
      <div className="flex flex-row items-center justify-between w-full p-4">
        <div className="flex flex-row items-center gap-2">
          <img src="/Vector (Stroke).png" alt="img" />
          <h1 className="font-medium  text-[18px] text-[#0F172A]">
            Employee Report
          </h1>
        </div>
        <Link href="/hr/evaluation-&-reports">
          <Button
            name="See All"
            icon={<PiArrowUpRightThin size={18} />}
            bg="transparent"
            textColor="black"
            className="!text-[10px]"
          />
        </Link>
      </div>

      <div className="flex flex-row items-center justify-between w-full p-4">
        <div className="flex flex-row items-center gap-2">
          <FiUsers />
          <p className="text-[#0F172A] text-[14px]">88 total employees</p>
        </div>
        <label className="flex flex-row gap-2 items-center">
          <p className="text-[#0F172A] text-[12px] ">Filter</p>
          <select className="p-2 text-[#0F172A] text-[12px] border w-[120px] border-gray-300 rounded-md focus:outline-none ">
            <option value="">Select</option>
            <optgroup label="Gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </optgroup>
            <optgroup label="Age">
              <option value="Under30">Under 30 years</option>
              <option value="Above30">Above 30 years</option>
            </optgroup>
            <optgroup label="Experience">
              <option value="Under5">Under 5 years</option>
              <option value="Above5">Above 5 years</option>
            </optgroup>
            <optgroup label="Employment Type">
              <option value="Fulltime">Fulltime</option>
              <option value="Part Time">Part Time</option>
              <option value="Freelance">Freelance</option>
            </optgroup>
          </select>
        </label>
      </div>
      <MonthlyBarChart />
    </section>
  );
};
export default Employeementreport;
