import { useState } from 'react';
import { BiEdit, BiPlusCircle, BiTrash } from 'react-icons/bi';
import { FaBullhorn } from 'react-icons/fa';
import Modal from '@/components/modal';
import Sendholidaynotification from './sendholidaynotification';

const VacationPolicies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
            <tr className="hover:bg-gray-50 text-[14px] border-b">
              <td className="p-4">Independence Day</td>
              <td className="p-4">28.11.2025</td>
              <td className="p-4">National Holiday</td>
              <td className="p-4">Juliette Nicolas</td>
              <td className="p-4 text-center flex justify-center space-x-2">
                <BiTrash size={18} className="cursor-pointer" title="Delete" />
                <BiEdit size={18} className="cursor-pointer" title="Edit" />
              </td>
            </tr>

            <tr className="hover:bg-gray-50 text-[14px] border-b">
              <td className="p-4">Independence Day</td>
              <td className="p-4">28.11.2025</td>
              <td className="p-4">National Holiday</td>
              <td className="p-4">Juliette Nicolas</td>
              <td className="p-4 text-center flex justify-center space-x-2">
                <BiTrash size={18} className="cursor-pointer" title="Delete" />
                <BiEdit size={18} className="cursor-pointer" title="Edit" />
              </td>
            </tr>

            <tr className="hover:bg-gray-50 text-[14px] border-b">
              <td className="p-4">Independence Day</td>
              <td className="p-4">28.11.2025</td>
              <td className="p-4">National Holiday</td>
              <td className="p-4">Juliette Nicolas</td>
              <td className="p-4 text-center flex justify-center space-x-2">
                <BiTrash size={18} className="cursor-pointer" title="Delete" />
                <BiEdit size={18} className="cursor-pointer" title="Edit" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <div className="p-6 w-full sm:w-[600px]">
            <h2 className="text-lg font-bold mb-4">Add Holiday</h2>
             <Sendholidaynotification onCancel={toggleModal}/>
          </div>
        </Modal>
      )}
    </>
  );
};

export default VacationPolicies;
