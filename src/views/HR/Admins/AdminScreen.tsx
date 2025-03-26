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
import {
  getUsers,
  openDeleteModal,
  openEditModal,
} from '@/store/slices/userSlice';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import DeleteAdminUser from './DeleteAdminUser';
import EditAdminUser from './EditAdminUser';
import { fetchUserRoles } from '@/store/slices/userRolesSlice';

const AdminScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

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
        searchQuery: searchQuery,
      }) as any
    );
  }, [currentPage, filter, searchQuery]);

  const handleOpenDeleteModal = (user) => {
    dispatch(openDeleteModal(user));
  };
  // Search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(
      getUsers({
        page: currentPage,
        pageSize,
        filter,
        searchQuery: query,
      }) as any
    );
  };

  const headers = [
    {
      title: 'User Name',
      accessor: 'firstName',
      render: (cellValue, { row }) => (
        <ProfileAvatarItem
          src={row.profilePictureUrl}
          title={`${row.firstName} ${row.lastName}`}
          subtitle=""
        />
      ),
    },
    {
      title: 'Role',
      accessor: 'Role.name',
      render: (cellValue: any, { row }) => {
        switch (row.roleId) {
          case 1:
            return 'Admin';
          case 2:
            return 'SuperAdmin';
          case 3:
            return 'Employee';
          case 4:
            return 'Manager';
          default:
            '';
            break;
        }
      },
    },
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
      title: '',
      accessor: 'id',
      render: (userId, { row }) => (
        <FaTrash
          onClick={() => {
            handleOpenDeleteModal(row);
          }}
          size={14}
          className="cursor-pointer"
        />
      ),
    },
    {
      title: '',
      accessor: '',
      render: (userId, { row }) => (
        <FaEdit
          onClick={() => {
            dispatch(openEditModal(row));
          }}
          size={14}
          className="cursor-pointer"
        />
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
              <label className="text-sm text-[#abaeb4]">Filter</label>
              <select
                className="p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Select</option>
                <option value="2">Super Admins</option>
                <option value="1">Hr Admins</option>
                <option value="4">Managers</option>
                <option value="3">Employess</option>
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
            tableConfig={{ rowBorder: true, selectable: false }}
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
          <CreateUserForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <EditAdminUser />
      <DeleteAdminUser />
    </div>
  );
};

export default AdminScreen;
