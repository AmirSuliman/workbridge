'use client'
import { useState } from 'react';

const Sendholidaynotification = ({ toggleModal }) => {
  const [addCountries, setAddCountries] = useState(false);

  const handleCheckboxChange = () => {
    setAddCountries(!addCountries);
  };

  return (
    <div className="w-full">
      <form>
        <div className="mb-4 mt-8">
          <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-400">
            Holiday Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Add Holiday title"
            className="p-4 w-full border text-gray-400 rounded focus:outline-none "
          />
        </div>

        <div className="flex flex-row items-center justify-between gap-4 mt-8 w-full">
          <div className="mb-4 w-full">
            <label htmlFor="date" className="block text-sm font-medium mb-2 text-gray-400">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="p-4 w-full border text-gray-400 rounded focus:outline-none "
            />
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="holidayType" className="block text-sm font-medium mb-2 text-gray-400">
              Type
            </label>
            <select
              id="holidayType"
              className="p-4 w-full border text-gray-400 rounded focus:outline-none "
            >
              <option value="" disabled selected>
                Select Holiday Type
              </option>
              <option value="National Holiday">National Holiday</option>
              <option value="Public Holiday">Public Holiday</option>
              <option value="Religious Holiday">Religious Holiday</option>
              <option value="Company Holiday">Company Holiday</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row items-center p-4 mt-4 mb-4 gap-2">
          <input
            type="checkbox"
            className="p-6"
            checked={addCountries}
            onChange={handleCheckboxChange}
          />
          <p className="text-[14px]">Add Holiday to other countries?</p>
        </div>

        {/* Conditional input for selecting other countries */}
        {addCountries && (
          <div className="mb-4">
           
            <select
              id="countries"
             // multiple
              className="p-4 w-full border text-gray-400 rounded focus:outline-none "
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="IN">India</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="BR">Brazil</option>
              <option value="ZA">South Africa</option>
              <option value="NG">Nigeria</option>
              <option value="RU">Russia</option>
            </select>
            {/*<p className="text-sm text-gray-400 mt-2">
              Hold down the Ctrl (Windows) or Command (Mac) key to select multiple countries.
            </p>*/}
          </div>
        )}

        <div className="flex items-center w-full p-8 gap-5">
          <button
            type="button"
            className="px-4 py-3 w-full bg-black rounded text-white"
          >
            Confirm
          </button>
          <button
            type="button"
            className="px-4 py-3 text-black w-full border rounded"
            onClick={toggleModal}

          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sendholidaynotification;
