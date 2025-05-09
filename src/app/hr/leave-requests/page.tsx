'use client';
import React, { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Table from './components/table';

type SortOption = undefined | 'duration' | 'returningDay' | 'leaveDay';

const AllLeaveRequests = () => {
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<SortOption>(undefined);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value === '' ? undefined : e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value === '' ? undefined : (e.target.value as SortOption));
  };

  return (
    <div className='flex flex-col bg-white p-6 border rounded-lg w-full'>
      <div className='flex flex-row items-center gap-2 flex-wrap w-full'>
        <div className='flex flex-row gap-2 items-center lg:mr-auto lg:ml-0'>
          <FaRegCalendarAlt size={20} />
          <h1 className='text-[22px] font-semibold'>Leave Requests</h1>
        </div>

        <div className='flex flex-row items-center gap-1'>
          <label htmlFor='sort' className='mr-2 text-gray-400 text-[12px]'>
            Sort
          </label>
          <select
            id='sort'
            className='border rounded px-2 py-1 text-[12px]'
            value={sort}
            onChange={handleSortChange}
          >
            <option value=''>Select</option>
            <option value='duration'>Duration</option>
            <option value='leaveDay'>Leave Day</option>
            <option value='returningDay'>Returning Day</option>
          </select>
        </div>
        <div className='flex flex-row items-center gap-1'>
          <label htmlFor='filter' className='mr-2 text-gray-400 text-[12px]'>
            Filter
          </label>
          <select
            id='filter'
            className='border rounded px-2 py-1 text-[12px]'
            value={filter}
            onChange={handleFilterChange}
          >
            <option value=''>All</option>
            <option value='Vacation'>Vacation</option>
            <option value='Sick'>Sick Leave</option>
          </select>
        </div>
      </div>

      <Table filter={filter} sort={sort} />
    </div>
  );
};

export default AllLeaveRequests;
