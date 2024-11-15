import { PiListChecksLight } from 'react-icons/pi';

const Onboarding = () => {
  return (
    <form className="max-w-fit">
      <h2 className="flex font-medium text-lg items-center gap-4 col-span-full">
        <PiListChecksLight size={24} />
        Onboarding
      </h2>
      <p className="opacity-35 font-medium text-sm mt-6 mb-1">Share Document</p>
      <label className="lg:pr-12 font-medium text-sm flex items-center gap-4 outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full cursor-pointer">
        <div className="relative h-5 w-5">
          <input
            type="checkbox"
            name="Onboarding"
            className=" outline-none appearance-none h-5 w-5 border-[1px] border-[#0F172A] rounded-sm bg-white peer checked:bg-[#0F172A] checked:border-[#0F172A]"
          />
          <span className="text-[#0F172A] peer-checked:text-white peer-checked:bg-[#0F172A] flex items-center justify-center rounded-sm absolute top-0 right-0 inset-0 pointer-events-none">
            ✓
          </span>
        </div>
        <span>Onboarding Document</span>
      </label>
      <p className="opacity-35 font-medium text-sm mt-6 mb-1">Share Document</p>
      <label className="lg:pr-12 font-medium text-sm flex items-center gap-4 outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full cursor-pointer">
        <div className="relative h-5 w-5">
          <input
            type="checkbox"
            name="Policies"
            className=" outline-none appearance-none h-5 w-5 border-[1px] border-[#0F172A] rounded-sm bg-white peer checked:bg-[#0F172A] checked:border-[#0F172A]"
          />
          <span className="text-[#0F172A] peer-checked:text-white peer-checked:bg-[#0F172A] flex items-center justify-center rounded-sm absolute top-0 right-0 inset-0 pointer-events-none">
            ✓
          </span>
        </div>
        <span>Company Policies</span>
      </label>
      <p className="opacity-35 font-medium text-sm mt-6 mb-1">Share Document</p>
      <label className="lg:pr-12 font-medium text-sm flex items-center gap-4 outline-none rounded border-[1px] border-[#E8E8E8] px-3 py-2 w-full cursor-pointer">
        <div className="relative h-5 w-5">
          <input
            type="checkbox"
            name="Holidays"
            className=" outline-none appearance-none h-5 w-5 border-[1px] border-[#0F172A] rounded-sm bg-white peer checked:bg-[#0F172A] checked:border-[#0F172A]"
          />
          <span className="text-[#0F172A] peer-checked:text-white peer-checked:bg-[#0F172A] flex items-center justify-center rounded-sm absolute top-0 right-0 inset-0 pointer-events-none">
            ✓
          </span>
        </div>
        <span>Company Holidays</span>
      </label>
    </form>
  );
};
export default Onboarding;
