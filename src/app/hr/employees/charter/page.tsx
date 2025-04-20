'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useReducer, useState } from 'react';

import OrgChartWithPositions from '@/components/EmployeeCharter/OrgChartWithPositions';
import { getCharter } from '@/services/getCharter';
import { initialState, reducer } from '@/store/reducer';
import { EmployeeData } from '@/types/employee';
import { FaBackspace } from 'react-icons/fa';

const OrgChartPage: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [compact, setCompact] = useState(true);
  const [search, setSearch] = useState('');
  const [employeesData, setEmployeesData] = useState<EmployeeData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCharter = async () => {
      try {
        const response = await getCharter();
        console.log('charter response: ', response);
        setEmployeesData(response.data.data.orgChartData);
      } catch (error) {
        console.log('charter error: ', error);
      }
    };
    fetchCharter();
  }, []);

  return (
    <div
      id="parent"
      className="w-full h-full relative overflow-hidden no-scrollbar "
    >
      <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-2  w-full top-0 left-0">
       <div className='flex flex-row items-center justify-between w-full'>
       <button
          // href="/public"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="flex items-center space-x-1 mr-auto"
        >
          {/*<div className="bg-primary rounded-full sm:w-6 h-0 w-0 sm:h-6 p-1 flex items-center justify-center mr-2">
             <ArrowLeftIcon className="text-white" /> 
          </div>*/}
          <div className="flex flex-col -space-y-1 ml-2">
            <div className="text-100C18 text-md sm:text-lg">Company Charter</div>
          </div>
        </button>
        <div className="relative w-40 lg:hidden block">
          <input
            className="w-full border border-979599 rounded-full p-2 text-sm outline-0"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search..."
          />
          {search.length > 0 && (
            <button
              className="absolute top-3 right-2"
              onClick={() => setSearch('')}
            >
              <FaBackspace className="w-4 h-4" />
            </button>
          )}
        </div>
       </div>
       
        
        <div className="flex flex-row space-x-2 text-sm ">
        <div className="relative w-60 hidden lg:block">
          <input
            className="w-full border border-979599 rounded-full p-2 text-sm outline-0"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search..."
          />
          {search.length > 0 && (
            <button
              className="absolute top-3 right-2"
              onClick={() => setSearch('')}
            >
              <FaBackspace className="w-4 h-4" />
            </button>
          )}
        </div>
          <button
            className={clsx(
              'border border-primary rounded-full px-4 py-2 text-black',
              !compact && 'bg-black text-white'
            )}
            onClick={() => setCompact(false)}
          >
            Horizontal
          </button>
          <button
            className={clsx(
              'border border-primary rounded-full px-4 py-2 text-black',
              compact && 'bg-black text-white'
            )}
            onClick={() => setCompact(true)}
          >
            Vertical
          </button>
        </div>
      </div>
      <OrgChartWithPositions
        onSelectedEmployees={state.selectedEmployees}
        employees={employeesData}
        compact={compact}
        search={search}
      />
    </div>
  );
};

export default OrgChartPage;
