export const ApplicationRequirements = ({
  register,
  toggleStates,
  handleToggle,
  checkboxStates,
  handleCheckboxChange,
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
            onChange={handleCheckboxChange('Resume')}
            checked={checkboxStates.Resume}
          />
          Resume
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Resume', checkboxStates.Resume)}
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
            onChange={handleCheckboxChange('Portfolio')}
            checked={checkboxStates.Portfolio}
          />
          Portfolio
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Portfolio', checkboxStates.Portfolio)}
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
            onChange={handleCheckboxChange('CoverLetter')}
            checked={checkboxStates.CoverLetter}
          />
          Cover Letter
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() =>
              handleToggle('CoverLetter', checkboxStates.CoverLetter)
            }
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
            onChange={handleCheckboxChange('Address')}
            checked={checkboxStates.Address}
          />
          Address
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Address', checkboxStates.Address)}
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
            onChange={handleCheckboxChange('DesiredSalary')}
            checked={checkboxStates.DesiredSalary}
          />
          Desired Salary
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() =>
              handleToggle('DesiredSalary', checkboxStates.DesiredSalary)
            }
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
            onChange={handleCheckboxChange('Education')}
            checked={checkboxStates.Education}
          />
          Education
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Education', checkboxStates.Education)}
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
            onChange={handleCheckboxChange('LinkedInProfile')}
            checked={checkboxStates.LinkedInProfile}
          />
          LinkedIn Profile
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() =>
              handleToggle('LinkedInProfile', checkboxStates.LinkedInProfile)
            }
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
            onChange={handleCheckboxChange('Website')}
            checked={checkboxStates.Website}
          />
          Website
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Website', checkboxStates.Website)}
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
            onChange={handleCheckboxChange('Referral')}
            checked={checkboxStates.Referral}
          />
          Referral
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('Referral', checkboxStates.Referral)}
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
