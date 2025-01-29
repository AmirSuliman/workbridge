import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';

interface Country {
  id: number;
  country: string;
  code: string;
}

interface Employee {
  id: number;
  firstName: string;
}

const SendHolidayNotification = ({ toggleModal  }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [addCountries, setAddCountries] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [primaryCountry, setPrimaryCountry] = useState<number | null>(null);
  const [additionalCountries, setAdditionalCountries] = useState<number[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [createdBy, setCreatedBy] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axiosInstance.get('/countries');
        if (countriesResponse.data?.data?.items) {
          setCountries(countriesResponse.data.data.items);
        }

        const employeesResponse = await axiosInstance.get('/employees');
        if (employeesResponse.data?.data?.items) {
          setEmployees(employeesResponse.data.data.items);
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

  const handleAdditionalCountriesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setAdditionalCountries(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedDate = date.split("T")[0];

    const payload = {
      title,
      date: formattedDate,
      type,
      createdBy,
      countries: primaryCountry ? [primaryCountry, ...additionalCountries] : [],
    };

    try {
      const response = await axiosInstance.post('/holiday/', payload);
      const newHoliday = response.data; // Assuming the response contains the new holiday
      addHolidayToState(newHoliday); // Update state in the parent component
      toggleModal(); // Close the modal
    } catch (error) {
      console.error('Error creating holiday:', error.response?.data || error.message);
      alert(`Failed to create holiday: ${error.response?.data?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 mt-8">
          <label className="block text-sm font-medium mb-2 text-gray-400">Holiday Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add Holiday title" className="p-4 w-full border text-gray-400 rounded focus:outline-none" required />
        </div>

        <div className="flex flex-row items-center justify-between gap-4 mt-8 w-full">
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium mb-2 text-gray-400">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-4 w-full border text-gray-400 rounded focus:outline-none" required />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium mb-2 text-gray-400">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="p-4 w-full border text-gray-400 rounded focus:outline-none" required>
              <option value="" disabled>Select Holiday Type</option>
              <option value="Public">Public</option>
              <option value="Company">Company</option>
              <option value="Restricted">Restricted</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-4 mt-8 w-full">

        <div className="mb-4 w-full">
          <label className="block text-sm font-medium mb-2 text-gray-400">Created By</label>
          <select value={createdBy} onChange={(e) => setCreatedBy(Number(e.target.value))} className="p-4 w-full border text-gray-400 rounded focus:outline-none" required>
            <option value="" disabled>Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>{employee.firstName}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 w-full">
          <label className="block text-sm font-medium mb-2 text-gray-400">Primary Country</label>
          <select value={primaryCountry || ''} onChange={handlePrimaryCountryChange} className="p-4 w-full border text-gray-400 focus:outline-none" required>
            <option value="" disabled>Select a country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>{country.country}</option>
            ))}
          </select>
        </div>
        </div>

        <div className="flex flex-row items-center p-4 mt-4 mb-4 gap-2">
          <input type="checkbox" checked={addCountries} onChange={() => setAddCountries(!addCountries)} />
          <p className="text-[14px]">Add Holiday to other countries?</p>
        </div>

        {addCountries && (
          <div className="mb-4">
            <select multiple onChange={handleAdditionalCountriesChange} className="border p-2 rounded w-full focus:outline-none">
              {countries.filter(c => c.id !== primaryCountry).map((country) => (
                <option key={country.id} value={country.id}>{country.country}</option>
              ))}
            </select>
            <p className="text-sm text-gray-400 mt-2">Hold down Ctrl (Windows) or Command (Mac) to select multiple countries.</p>
          </div>
        )}

        <div className="flex items-center w-full p-8 gap-5">
          <button type="submit" disabled={loading} className="px-4 py-3 w-full bg-black rounded text-white">
            {loading ? 'Submitting...' : 'Confirm'}
          </button>
          <button type="button" className="px-4 py-3 text-black w-full border rounded" onClick={toggleModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default SendHolidayNotification;
