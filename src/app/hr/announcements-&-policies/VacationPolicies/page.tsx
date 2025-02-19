'use client';
import { useState, useEffect } from 'react';
import { BiEdit, BiPlusCircle, BiTrash } from 'react-icons/bi';
import { FaBullhorn } from 'react-icons/fa';
import Modal from '@/components/modal';
import axiosInstance from '@/lib/axios';
import SendHolidayNotification from './sendholidaynotification';
import toast from 'react-hot-toast';
import Image from 'next/image';
interface User {
  id: number;
  firstName: string;
  lastName: string;
}
interface Country {
  id: number;
  country: string;
  code: string;
}


interface Holiday {
  id: number;
  title: string;
  date: string;
  type: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  user?: User; 
  countryholidays: {
    id: number;
    holidayId: number;
    countryId: number;
    sickLeave: number;
    vacationLeave: number;
    createdAt: string;
    updatedAt: string;
    country: Country;
  }[];
}


const VacationPolicies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState<number | null>(null);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<number>(3); 
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [primaryCountry, setPrimaryCountry] = useState<number | ''>('');
  const [additionalCountries, setAdditionalCountries] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [addCountries, setAddCountries] = useState(false);
 
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get('/countries');
        if (response.data?.data?.items) {
          setCountries(response.data.data.items);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    const fetchHolidays = async (countryId: number) => {
      try {
        const response = await axiosInstance.get(`/holidays/${countryId}`);
        if (response.data?.data?.rows) {
          setHolidays(response.data.data.rows.map((item) => ({
            id: item.holiday.id,
            title: item.holiday.title,
            date: item.holiday.date,
            type: item.holiday.type,
            createdBy: item.holiday.createdBy,
            user: item.holiday.user, // Include user object
            countryholidays: [item],
          })));
        }
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };
    
    
    
    
    useEffect(() => {
      fetchCountries();
      fetchHolidays(selectedCountry);
    }, [selectedCountry]);
    

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      fetchHolidays(selectedCountry); 
    }
  };
  

  const deleteModal = (holidayId: number) => {
    setHolidayToDelete(holidayId);
    console.log(holidayId, 'id');
    setIsModalOpen2(true);
  };

  const handleDeleteHoliday = async () => {
    if (holidayToDelete !== null) {
      try {
        const response = await axiosInstance.delete(
          `/holiday/${holidayToDelete}`
        );

        if (response.status === 200) {
          toast.success("Holiday successfully deleted!")
          setHolidays(
            holidays.filter((holiday) => holiday.id !== holidayToDelete)
          );
          setIsModalOpen2(false);
        }
      } catch (error) {
        console.error('Error deleting holiday:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}.${date.getFullYear()}`;
  };

  const openEditModal = (holiday: Holiday) => {
    if (!holiday) return;
    setSelectedHoliday(holiday);
    setTitle(holiday.title);
    setDate(new Date(holiday.date).toISOString().split('T')[0]);
    setType(holiday.type);
    setPrimaryCountry(holiday.countryholidays?.[0]?.countryId || '');
    setAdditionalCountries(
      holiday.countryholidays
        ? holiday.countryholidays.map((ch) => ch.countryId)
        : []
    );
    setIsModalOpen3(true);
  };

  const handlePrimaryCountryChange = (e) => {
    setPrimaryCountry(Number(e.target.value));
  };

  const handleAdditionalCountriesChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setAdditionalCountries(selectedOptions);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHoliday) return;

    setLoading(true);

    try {
      await axiosInstance.put(`/holiday/${selectedHoliday.id}`, {
        title,
        date,
        type,
        countries: [primaryCountry, ...additionalCountries].filter(Boolean),
      });

      setHolidays((prev) =>
        prev.map((holiday) =>
          holiday.id === selectedHoliday.id
            ? { ...holiday, title, date, type }
            : holiday
        )
      );

      setIsModalOpen3(false);
    } catch (error) {
      console.error('Error updating holiday:', error);
    } finally {
      setLoading(false);
    }
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

  const handleHolidayAdded = (newHoliday) => {
    setHolidays((prevHolidays) => [...prevHolidays, newHoliday]);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-row items-center gap-4 font-medium text-[22px] mb-12">
        <FaBullhorn /> Policies In-use
      </div>

      {/* Dropdown and Add Button */}
      <div className="flex flex-row items-center justify-between">
      <select
  id="countries"
  name="countries"
  value={selectedCountry}
  onChange={(e) => setSelectedCountry(Number(e.target.value))}
  className="border p-2 rounded w-[400px] focus:outline-none"
>
  {countries.map((country) => (
    <option key={country.id} value={country.id}>
      {country.country}
    </option>
  ))}
</select>


        <button
          onClick={toggleModal}
          className="flex flex-row items-center gap-2 text-[12px] text-white bg-black rounded p-2"
        >
          Add Holiday <BiPlusCircle size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="w-full mt-8 overflow-x-auto">
        <table className="w-full mt-8 border-collapse">
          <thead className="font-medium text-gray-400 border-b">
            <tr>
              <td className="p-3 text-left">Title</td>
              <td className="p-3 text-left">Date</td>
              <td className="p-3 text-left">Type</td>
              <td className="p-3 text-left">Created by</td>
              <td className="p-3 text-center"></td>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr
                key={holiday.id}
                className="hover:bg-gray-50 text-[14px] border-b"
              >
                <td className="p-4">{holiday.title}</td>
                <td className="p-4">{formatDate(holiday.date)}</td>
                <td className="p-4">{holiday.type}</td>
<td className="p-4">
  {holiday.user ? `${holiday.user.firstName} ${holiday.user.lastName}` : ''}
</td>
                <td className="p-4 text-center flex justify-center space-x-2">
                  <Image src="/delete.svg" alt='delete' width={13} height={13}
                    className="cursor-pointer"
                    title="Delete"
                    onClick={() => deleteModal(holiday.id)}
                  />
                  <Image src="/edit.svg" alt='edit' width={13} height={13}
                    className="cursor-pointer"
                    title="Edit"
                    onClick={() => openEditModal(holiday)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
  <Modal onClose={toggleModal}>
    <div className="p-6 w-full sm:w-[600px]">
      <h2 className="text-lg font-bold mb-4">Add Holiday</h2>
      <SendHolidayNotification toggleModal={toggleModal} onHolidayAdded={fetchHolidays} />
      </div>
  </Modal>
)}

      {isModalOpen2 && (
        <Modal onClose={() => setIsModalOpen2(false)}>
          <div className="p-6 w-full sm:w-[500px]">
            <h2 className="text-lg font-bold mb-4 text-center mt-8">
              Are you sure you want to delete this holiday?
            </h2>
            <div className="flex items-center w-full p-8 gap-5">
              <button
                type="submit"
                className="px-4 py-3 w-full bg-black rounded text-white"
                onClick={handleDeleteHoliday}
              >
                Confirm
              </button>
              <button
                type="button"
                className="px-4 py-3 text-black w-full border rounded"
                onClick={() => setIsModalOpen2(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {isModalOpen3 && selectedHoliday && (
        <Modal onClose={() => setIsModalOpen3(false)}>
          <div className="p-6 bg-white w-full sm:w-[600px]">
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
                  <select
                    multiple
                    value={additionalCountries.map(String)}
                    onChange={handleAdditionalCountriesChange}
                    className="border p-2 rounded w-full focus:outline-none"
                  >
                    {countries
                      .filter((c) => c.id !== primaryCountry)
                      .map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.country}
                        </option>
                      ))}
                  </select>

                  <p className="text-sm text-gray-400 mt-2">
                    Hold down Ctrl (Windows) or Command (Mac) to select multiple
                    countries.
                  </p>
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
                  onClick={() => setIsModalOpen3(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default VacationPolicies;
