import Button from '@/components/Button';
import SearchInput from '@/components/common/SearchBar';
import { useRouter } from 'next/navigation';
import { CiCirclePlus } from 'react-icons/ci';

export const AllEmployees = () => {
  const router = useRouter();
  return (
    <main>
      <div className="flex gap-3 my-3">
        <SearchInput placeholder="Search Employees" value="" />
        <div className="flex gap-2  items-center">
          <label className="text-sm text-[#abaeb4]">Sort</label>
          <select className="p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray ">
            <option>Select</option>
            <option>Recently Added</option>
            <option>Recently Added</option>
            <option>Recently Added</option>
          </select>
        </div>
        <div className="flex gap-2  items-center">
          <label className="text-sm text-[#abaeb4]">Filter</label>
          <select className="p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray ">
            <option>Select</option>
            <option>Recently Added</option>
            <option>Recently Added</option>
            <option>Recently Added</option>
          </select>
        </div>
        <Button
          name="Add new Employee"
          icon={<CiCirclePlus />}
          onClick={() => router.push('/hr/employees/create-employee')}
        />
      </div>
    </main>
  );
};
