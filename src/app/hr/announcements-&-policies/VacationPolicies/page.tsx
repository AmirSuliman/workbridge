'use client'
import { useState, useEffect } from 'react';
import { BiEdit, BiPlusCircle, BiTrash } from 'react-icons/bi';
import { FaBullhorn } from 'react-icons/fa';
import Modal from '@/components/modal';
import Sendholidaynotification from './sendholidaynotification';
import axiosInstance from '@/lib/axios';

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
  const [holidayToDelete, setHolidayToDelete] = useState<number | null>(null);

  useEffect(() => {
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

    const fetchHolidays = async () => {
      try {
        const response = await axiosInstance.get('/holidays',{
          params:{
            association: true
          }
        });
        if (response.data?.data?.items) {
          setHolidays(response.data.data.items);
        }
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchCountries();
    fetchHolidays();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
 

  const deleteModal = (holidayId: number) => {
    setHolidayToDelete(holidayId);
    console.log(holidayId, 'id');
    setIsModalOpen2(true);
  };

  const handleDeleteHoliday = async () => {
    if (holidayToDelete !== null) {
      try {
        // Make sure the URL format is /holiday/{id}, and pass the holiday ID dynamically
        const response = await axiosInstance.delete(`/holiday/${holidayToDelete}`);
        
        if (response.status === 200) {
          // Filter out the deleted holiday from the list
          setHolidays(holidays.filter(holiday => holiday.id !== holidayToDelete));
          setIsModalOpen2(false); // Close the confirmation modal
        }
      } catch (error) {
        console.error('Error deleting holiday:', error);
      }
    }
  };
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
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
          className="border p-2 rounded w-[400px] focus:outline-none"
        >
          <option value="" disabled selected>
            Select a country
          </option>
          {countries.map((country) => (
            <option key={country.id} value={country.code}>
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
              <tr key={holiday.id} className="hover:bg-gray-50 text-[14px] border-b">
                <td className="p-4">{holiday.title}</td>
                <td className="p-4">{formatDate(holiday.date)}</td>
                <td className="p-4">{holiday.type}</td>
                <td className="p-4"> {holiday.createdBy}</td>
                <td className="p-4 text-center flex justify-center space-x-2">
                  <BiTrash size={18} className="cursor-pointer" title="Delete" onClick={() => deleteModal(holiday.id)}/>
                  <BiEdit size={18} className="cursor-pointer" title="Edit" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <div className="p-6 w-full sm:w-[600px]">
            <h2 className="text-lg font-bold mb-4">Add Holiday</h2>
            <Sendholidaynotification toggleModal={toggleModal} />
          </div>
        </Modal>
      )}

{isModalOpen2 && (
        <Modal onClose={() => setIsModalOpen2(false)}>
          <div className="p-6 w-full sm:w-[500px]">
            <h2 className="text-lg font-bold mb-4 text-center mt-8">Are you sure you want to delete this holiday?</h2>
            <div className="flex items-center w-full p-8 gap-5">
              <button
                type="submit"
                className="px-4 py-3 w-full bg-black rounded text-white"
                onClick={handleDeleteHoliday} // Trigger deletion on confirm
              >
                Confirm
              </button>
              <button
                type="button"
                className="px-4 py-3 text-black w-full border rounded"
                onClick={() => setIsModalOpen2(false)} // Close modal on cancel
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default VacationPolicies;