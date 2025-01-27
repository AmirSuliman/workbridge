'use client';
import Button from '@/components/Button';
import { Pagination } from '@/components/common/Pagination';
import ProfileAvatarItem from '@/components/common/ProfileAvatarItem';
import SearchInput from '@/components/common/SearchBar';
import EmployeesIcon from '@/components/icons/employees-icon';
import Modal from '@/components/modal/Modal';
import CreateUserForm from '@/components/UserForms/CreateUserForm';
import FormHeading from '@/components/UserInformation/FormHeading';
import Table from '@/components/UserInformation/Table';
import { fetchUserRoles } from '@/store/slices/userRolesSlice';
import { getUsers } from '@/store/slices/userSlice';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const AdminScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fetch users on page change or filter/sort update
  useEffect(() => {
    dispatch(
      getUsers({
        page: currentPage,
        pageSize,
        filter,
        sortBy,
        searchQuery: searchQuery,
        sortOrder,
      }) as any
    );
  }, [currentPage, filter, sortBy, sortOrder, searchQuery]);

  // Search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(
      getUsers({
        page: currentPage,
        pageSize,
        filter,
        sortBy,
        sortOrder,
        searchQuery: query,
      }) as any
    );
  };

  const headers = [
    {
      title: 'Admin Name',
      accessor: 'firstName',
      render: (cellValue, { row }) => (
        <ProfileAvatarItem
          src={row.profilePictureUrl}
          title={`${row.firstName} ${row.lastName}`}
          subtitle="-"
        />
      ),
    },
    { title: 'Role', accessor: 'Role.name' },
    {
      title: 'Status',
      accessor: 'active',
      render: (cellValue: any) => (cellValue ? 'Active' : 'Inactive'),
    },
    {
      title: 'Email',
      accessor: 'email',
      render: (value: any) => (
        <Link href={`mailto:${value}`} className="text-blue-500">
          {value}
        </Link>
      ),
    },
    {
      title: 'Hire Date',
      accessor: 'hireDate',
      render: () => (
        <div className="flex flex-col">
          <div className="text-sm text-dark-navy font-[500]">24.01.2024</div>
          <div className="text-[10px] text-dark-navy font-[500]">
            1 Year 4 Months
          </div>
        </div>
      ),
    },
    {
      title: '',
      accessor: 'actions',
      render: () => (
        <MdOutlineKeyboardArrowRight className="w-6 h-6 border border-gray-border rounded-sm hover:cursor-pointer hover:bg-gray-100" />
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchUserRoles() as any);
  }, []);

  return (
    <div className="h-full">
      <FormHeading
        textClasses="text-xl font-[600] font-semibold"
        classNames="mb-4"
        icon={<EmployeesIcon classNames="w-6" />}
        text="Admins"
      />
      <div className="bg-white border border-gray-border rounded-md p-3">
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-3 my-3">
            <SearchInput
              placeholder="Search Employees"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="flex gap-2 items-center w-full">
              <label className="text-sm text-[#abaeb4]">Sort</label>
              <select
                className="p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Select</option>
                <option value="recently_added">Recently Added</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="flex gap-2 items-center w-full">
              <label className="text-sm text-[#abaeb4]">Filter</label>
              <select
                className="p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <Button
            name="Add New Admin"
            onClick={() => setIsModalOpen(true)}
            icon={<IoIosAddCircleOutline className="w-4" />}
            className="bg-dark-navy text-white text-xs"
          />
        </div>
        <div>
          <Table
            isLoading={users.status === 'loading'}
            headers={headers}
            values={users.users}
            tableConfig={{ rowBorder: true, selectable: true }}
          />
          <Pagination
            styles={{ container: 'mt-5 gap-x-2 !justify-end' }}
            totalItems={users.total}
            pageSize={users.pageSize}
            currentPage={currentPage}
            maxPagesToShow={4}
            setCurrentPage={handlePageChange}
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateUserForm />
        </Modal>
      )}
    </div>
  );
};

export default AdminScreen;
