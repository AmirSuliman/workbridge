export const ApplicationRequirements = ({
  toggleStates,
  handleToggle,
  register,
}) => {
  return (
    <div className="flex flex-wrap gap-5">
      {/* First Item */}
      <div className="border rounded-lg w-[200px] flex flex-col">
        <div className="p-4 text-[14px] items-center flex font-medium">
          <input
            type="checkbox"
            value="Resume"
            className="form-checkbox h-5 w-5  accent-black cursor-pointer mr-3"
            {...register('Resume')}
          />
          Resume
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Resume')}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.Resume ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.Resume ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-gray-700 text-[12px]">Required</span>
        </div>
      </div>

      {/* Second Item */}
      <div className="border rounded-lg w-[200px] flex flex-col">
        <div className="p-4 items-center flex font-medium text-[14px]">
          <input
            type="checkbox"
            value="Portfolio"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('Portfolio')}
          />
          Portfolio
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Portfolio')}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.Portfolio ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.Portfolio ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-gray-700 text-[12px]">Required</span>
        </div>
      </div>
      {/* 3rd Item */}
      <div className="border rounded-lg w-[200px] flex flex-col">
        <div className="p-4 items-center flex font-medium text-[14px]">
          <input
            type="checkbox"
            value="CoverLetter"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('CoverLetter')}
          />
          Cover Letter
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('CoverLetter')}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.CoverLetter ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.CoverLetter ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-gray-700 text-[12px]">Required</span>
        </div>
      </div>
      {/* 4th Item */}
      <div className="border rounded-lg w-[200px] flex flex-col">
        <div className="p-4 items-center flex font-medium text-[14px]">
          <input
            type="checkbox"
            value="Address"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('Address')}
          />
          Address
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Address')}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.Address ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.Address ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-gray-700 text-[12px]">Required</span>
        </div>
      </div>
      {/* 5th Item */}
      <div className="border rounded-lg w-[200px] flex flex-col">
        <div className="p-4 items-center flex font-medium text-[14px]">
          <input
            type="checkbox"
            value="DesiredSalary"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('DesiredSalary')}
          />
          Desired Salary
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('DesiredSalary')}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.DesiredSalary ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.DesiredSalary ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-gray-700 text-[12px]">Required</span>
        </div>
      </div>
      {/* 6th Item */}
      <div className="border rounded-lg w-[200px] flex flex-col">
        <div className="p-4 items-center flex font-medium text-[14px]">
          <input
            type="checkbox"
            value="Education"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('Education')}
          />
          Education
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Education')}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.Education ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.Education ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-gray-700 text-[12px]">Required</span>
        </div>
      </div>
      {/* 7th Item */}
      <div className="border rounded-lg w-[200px] flex flex-col">
        <div className="p-4 items-center flex font-medium text-[14px]">
          <input
            type="checkbox"
            value="LinkedInProfile"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('LinkedInProfile')}
          />
          LinkedIn Profile
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('LinkedInProfile')}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.LinkedInProfile ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.LinkedInProfile ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-gray-700 text-[12px]">Required</span>
        </div>
      </div>
      {/* 8th Item */}
      <div className="border rounded-lg w-[200px] flex flex-col">
        <div className="p-4 items-center flex font-medium text-[14px]">
          <input
            type="checkbox"
            value="Website"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('Website')}
          />
          Website
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Website')}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.Website ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.Website ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-gray-700 text-[12px]">Required</span>
        </div>
      </div>
      {/* 9th Item */}
      <div className="border rounded-lg w-[200px] flex flex-col">
        <div className="p-4 items-center flex font-medium text-[14px]">
          <input
            type="checkbox"
            value="Referral"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('Referral')}
          />
          Referral
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Referral')}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.Referral ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.Referral ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-gray-700 text-[12px]">Required</span>
        </div>
      </div>
    </div>
  );
};
