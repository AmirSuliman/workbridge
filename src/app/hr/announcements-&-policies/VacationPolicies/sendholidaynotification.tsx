'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { useSession } from 'next-auth/react';
import Select from 'react-select';

interface Country {
  id: number;
  country: string;
  code: string;
}

const SendHolidayNotification = ({ toggleModal, onHolidayAdded }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [addCountries, setAddCountries] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [primaryCountry, setPrimaryCountry] = useState<number | null>(null);
  const [additionalCountries, setAdditionalCountries] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  console.log(session, 'session');

  const [selectedCountries, setSelectedCountries] = useState<
    { value: number; label: string }[]
  >([]);

  const handleAdditionalCountriesChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions); // Store selected countries
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axiosInstance.get('/countries');
        if (countriesResponse.data?.data?.items) {
          setCountries(countriesResponse.data.data.items);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePrimaryCountryChange = (e) => {
    setPrimaryCountry(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Extracting the selected country IDs
    const additionalCountryIds = selectedCountries.map(
      (option) => option.value
    );

    const payload = {
      title,
      date,
      type,
      createdBy: session?.user?.userId || '',
      countries: primaryCountry
        ? [primaryCountry, ...additionalCountryIds]
        : [],
    };

    try {
      const response = await axiosInstance.post('/holiday/', payload);

      // Fetch updated holidays from API
      onHolidayAdded();

      toggleModal();
    } catch (error) {
      console.error('Error creating holiday:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-8">
          <label className="block text-sm font-medium mb-2 text-gray-400">
            Holiday Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add Holiday title"
            className="p-4 w-full border text-gray-400 rounded focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-row items-center justify-between gap-4 mt-8 w-full">
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium mb-2 text-gray-400">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-4 w-full border text-gray-400 rounded focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium mb-2 text-gray-400">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-4 w-full border text-gray-400 rounded focus:outline-none"
              required
            >
              <option value="" disabled>
                Select Holiday Type
              </option>
              <option value="Public">Public</option>
              <option value="Company">Company</option>
              <option value="Restricted">Restricted</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-4 mt-8 w-full">
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium mb-2 text-gray-400">
              Primary Country
            </label>
            <select
              value={primaryCountry || ''}
              onChange={handlePrimaryCountryChange}
              className="p-4 w-full border text-gray-400 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-row items-center p-4 mt-4 mb-4 gap-2">
          <input
            type="checkbox"
            checked={addCountries}
            onChange={() => setAddCountries(!addCountries)}
          />
          <p className="text-[14px]">Add Holiday to other countries?</p>
        </div>

        {addCountries && (
          <div className="mb-4">
            <Select
              isMulti
              options={countries
                .filter((c) => c.id !== primaryCountry)
                .map((country) => ({
                  value: country.id,
                  label: country.country,
                }))}
              onChange={handleAdditionalCountriesChange}
              className="w-full"
              classNamePrefix="select"
              placeholder="Search and select countries..."
            />
          </div>
        )}

        <div className="flex items-center w-full p-8 gap-5">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-3 w-full bg-black rounded text-white"
          >
            {loading ? 'Submitting...' : 'Confirm'}
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

export default SendHolidayNotification;
