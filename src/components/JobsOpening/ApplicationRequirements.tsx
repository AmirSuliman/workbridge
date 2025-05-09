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
            value="resume"
            className="form-checkbox h-5 w-5  accent-black cursor-pointer mr-3"
            {...register('resume')}
            onChange={handleCheckboxChange('resume')}
            checked={checkboxStates.resume}
          />
          Resume
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('resume', checkboxStates.resume)}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.resume ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.resume ? 'translate-x-4' : 'translate-x-0'
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
            value="portfolio"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('portfolio')}
            onChange={handleCheckboxChange('portfolio')}
            checked={checkboxStates.portfolio}
          />
          Portfolio
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('portfolio', checkboxStates.portfolio)}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.portfolio ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.portfolio ? 'translate-x-4' : 'translate-x-0'
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
            value="coverLetter"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('coverLetter')}
            onChange={handleCheckboxChange('coverLetter')}
            checked={checkboxStates.coverLetter}
          />
          Cover Letter
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() =>
              handleToggle('coverLetter', checkboxStates.coverLetter)
            }
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.coverLetter ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.coverLetter ? 'translate-x-4' : 'translate-x-0'
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
            value="address"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('address')}
            onChange={handleCheckboxChange('address')}
            checked={checkboxStates.address}
          />
          Address
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('address', checkboxStates.address)}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.address ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.address ? 'translate-x-4' : 'translate-x-0'
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
            value="desiredSalary"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('desiredSalary')}
            onChange={handleCheckboxChange('desiredSalary')}
            checked={checkboxStates.desiredSalary}
          />
          Desired Salary
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() =>
              handleToggle('desiredSalary', checkboxStates.desiredSalary)
            }
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.desiredSalary ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.desiredSalary ? 'translate-x-4' : 'translate-x-0'
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
            value="education"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('education')}
            onChange={handleCheckboxChange('education')}
            checked={checkboxStates.education}
          />
          Education
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('education', checkboxStates.education)}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.education ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.education ? 'translate-x-4' : 'translate-x-0'
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
            value="linkedin"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('linkedin')}
            onChange={handleCheckboxChange('linkedin')}
            checked={checkboxStates.linkedin}
          />
          LinkedIn Profile
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('linkedin', checkboxStates.linkedin)}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.linkedin ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.linkedin ? 'translate-x-4' : 'translate-x-0'
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
            value="website"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('website')}
            onChange={handleCheckboxChange('website')}
            checked={checkboxStates.website}
          />
          Website
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('website', checkboxStates.website)}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.website ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.website ? 'translate-x-4' : 'translate-x-0'
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
            value="referral"
            className="form-checkbox h-5 w-5 accent-black cursor-pointer mr-3"
            {...register('referral')}
            onChange={handleCheckboxChange('referral')}
            checked={checkboxStates.referral}
          />
          Referral
        </div>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex flex-row gap-5 p-3 items-center">
          <button
            type="button"
            onClick={() => handleToggle('referral', checkboxStates.referral)}
            className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              toggleStates.referral ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                toggleStates.referral ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <span className="text-gray-700 text-[12px]">Required</span>
        </div>
      </div>
    </div>
  );
};
