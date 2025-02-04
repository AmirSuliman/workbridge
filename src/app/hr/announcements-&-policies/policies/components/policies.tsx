import { getAllPolicies } from '@/services/getAllPolicies';
import { Policy } from '@/types/policy';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiChevronRight } from 'react-icons/bi';
import { FaBox } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';

const Policies = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([]);
  const [activeFilter, setActiveFilter] = useState<'Draft' | 'Published'>(
    'Published'
  ); // Default to published
  const router = useRouter();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await getAllPolicies(1, 1000);
        console.log('API Response:', response); 
        const allPolicies = response.data.data.items || [];
        console.log('Extracted Policies:', allPolicies); 
  
        setPolicies(allPolicies);
        setFilteredPolicies(
          allPolicies.filter((policy) => policy.status === 'Published')
        ); 
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch policies.');
      }
    };
  
    fetchPolicies();
  }, []);
  

  const filterPolicies = (status: 'Draft' | 'Published') => {
    const filtered = policies.filter((policy) => policy.status === status);
    setFilteredPolicies(filtered); // Update the filtered policies
  };

  const handleFilterClick = (status: 'Draft' | 'Published') => {
    setActiveFilter(status); // Set the active filter
    filterPolicies(status); // Filter the policies by the selected status
  };

  console.log('Filtered Policies: ', filteredPolicies);

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex flex-row items-center justify-between w-full mb-4">
        <div className="flex flex-row items-center gap-3">
          <FaBox size={24} />
          <h1 className="text-[18px] font-medium">All Policies</h1>
        </div>
        <div className="flex gap-4">
          {/* Filter buttons */}
          <button
            onClick={() => handleFilterClick('Draft')}
            className={`flex items-center justify-center gap-2 text-sm px-4 py-2 rounded transition duration-300 ${
              activeFilter === 'Draft'
                ? 'bg-black text-white'
                : 'bg-transparent text-black border border-black'
            }`}
          >
            Draft Policies
          </button>
          <button
            onClick={() => handleFilterClick('Published')}
            className={`flex items-center justify-center gap-2 text-sm px-4 py-2 rounded transition duration-300 ${
              activeFilter === 'Published'
                ? 'bg-black text-white'
                : 'bg-transparent text-black border border-black'
            }`}
          >
            Published Policies
          </button>
          <Link
            href="/hr/announcements-&-policies/policies/create-policy"
            className="flex flex-row items-center text-sm gap-2 bg-black p-2 rounded text-white text-[12px] hover:bg-gray-800"
          >
            Create Policy <MdAddCircle size={22} />
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left mt-8">
          <thead className="text-[14px] font-normal">
            <tr>
              <th className="border-b text-gray-400 px-4 py-4">Policy Name</th>
              <th className="border-b text-gray-400 px-4 py-4">
                Effective Date
              </th>
              <th className="border-b text-gray-400 px-4 py-4">Policy Type</th>
              <th className="border-b text-gray-400 px-4 py-4">Uploaded By</th>
              <th className="border-b text-gray-400 px-4 py-4">Accepted By</th>
              <th className="border-b text-gray-400 px-4 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredPolicies.length > 0 ? (
              filteredPolicies.map((policy) => (
                <tr
                  onClick={() =>
                    router.push(
                      `/hr/announcements-&-policies/policies/${policy.id}`
                    )
                  }
                  key={policy.id}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="border-b border-gray-300 p-4 text-[14px]">
                    {policy.title}
                  </td>
                  <td className="border-b border-gray-300 p-4 text-[14px]">
                    {new Date(policy.effectiveDate).toLocaleDateString()}
                  </td>
                  <td className="border-b border-gray-300 p-4 text-[14px]">
                    {policy.type}
                  </td>
                  <td className="border-b border-gray-300 p-4 text-[14px]">
                    John Doe {/* Placeholder for 'Uploaded By' */}
                  </td>
                  <td className="border-b border-gray-300 p-4 text-[14px]">
                    {`${policy.employeeAccepted} / ${policy.totalEmployees}`}{' '}
                    employees
                  </td>
                  <td className="border-b border-gray-300 p-4 text-[14px] cursor-pointer">
                    <span className="hover:bg-black hover:text-white w-[30px] border border-gray-400 rounded-md flex items-center justify-center">
                      <BiChevronRight size={22} />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="border-b border-gray-300 p-4 text-center text-gray-500"
                >
                  No policies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Policies;
