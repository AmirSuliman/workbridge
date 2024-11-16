'use client'
import Button from '@/src/components/Button'
import { Pagination } from '@/src/components/common/Pagination'
import ProfileAvatarItem from '@/src/components/common/ProfileAvatarItem'
import SearchInput from '@/src/components/common/SearchBar'
import EmployeesIcon from '@/src/components/icons/employees-icon'
import Modal from '@/src/components/Modal/Modal'
import CreateUserForm from '@/src/components/UserForms/CreateUserForm'
import FormHeading from '@/src/components/UserInformation/FormHeading'
import Table from '@/src/components/UserInformation/Table'
import { IMAGES } from '@/src/constants/images'
import { getUsers } from '@/src/store/slices/userSlice'
import { RootState } from '@/src/store/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

const AdminScreen = () => {
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    const users = useSelector((state: RootState) => state.users);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalItems = 100;
    const pageSize = 4;
    console.log(users, "users");
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        console.log(`Current Page: ${page}`);
        // Perform additional actions here, such as fetching new data based on `page`
    };

    useEffect(() => {
        dispatch(getUsers({
            page: currentPage,
            pageSize: pageSize,
            filter: '',
            sortBy: "",
            sortOrder: "asc"
        }) as any);
    }, [currentPage]);


    const headers = [
        { title: "Admin Name", accessor: "firstName", render: (cellValue, { row }) => <ProfileAvatarItem src={row.profilePictureUrl} title={`${row.firstName} ${row.lastName}`} subtitle="-" /> },
        { title: "Job Title", accessor: "Role.name" },
        { title: "Department", accessor: "3", render: (cellValue) => "Department" },
        { title: "Email", accessor: "email", render: (value: any) => <Link href={`mailto:${value}`} className="text-blue-500">{value}</Link> },
        { title: "Hire Date", accessor: "hireDate", render: () => <div className='flex flex-col '> <div className='text-sm text-dark-navy font-[500]'>24.01.2024</div> <div className='text-[10px] text-dark-navy font-[500]'>1 Year 4 Months </div> </div> },
        { title: "", accessor: "" },
        { title: "", accessor: "x" },
        {
            title: "", accessor: "actions", render: () => <MdOutlineKeyboardArrowRight
                className='w-6 h-6 border border-gray-border rounded-sm hover:cursor-pointer hover:bg-gray-100' />
        },
    ];

    useEffect(() => {
        dispatch(getUsers({
            page: currentPage,
            pageSize: pageSize,
            filter: '',
            sortBy: "",
            sortOrder: "asc"
        }) as any);
    }, []);

    return (
        <div className='h-full'>
            <FormHeading textClasses='text-xl font-[600] font-semibold ' classNames='mb-4' icon={<EmployeesIcon classNames='w-6' />} text='Admins' />

            <div className='bg-white border border-gray-border rounded-md p-3 '>
                <div className="flex justify-between items-center mb-3">

                    <div className="flex gap-3 my-3"> <SearchInput placeholder='Search Employees' value='' />
                        <div className="flex gap-2 items-center w-full">
                            <label className='text-sm text-[#abaeb4]' >Sort</label>
                            <select className='p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray ' >
                                <option>Select</option>
                                <option>Recently Added</option>
                                <option>Recently Added</option>
                                <option>Recently Added</option>
                            </select>
                        </div>

                        <div className="flex gap-2  items-center w-full">
                            <label className='text-sm text-[#abaeb4]' >Filter</label>
                            <select className='p-2 border w-full max-w-xs border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray ' >
                                <option>Select</option>
                                <option>Recently Added</option>
                                <option>Recently Added</option>
                                <option>Recently Added</option>
                            </select>
                        </div>
                    </div>
                    <Button name='Add New Admin' onClick={toggleModal} icon={<IoIosAddCircleOutline className='w-4' />} classNames='bg-dark-navy text-white text-xs ' />
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
                        maxPagesToShow={4} // Show up to 5 pages at once
                        setCurrentPage={handlePageChange}
                    />
                </div>

            </div>
            {isModalOpen && (
                <Modal onClose={toggleModal}>
                    <CreateUserForm />
                </Modal>
            )}
        </div>
    )
}

export default AdminScreen