'use client';

import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useReducer, useState } from 'react';

import { OrgChartComponent } from '@/components/EmployeeCharter/OrgChartComponent';
import { getCharter } from '@/services/getCharter';
import { initialState, reducer } from '@/store/reducer';
import { DataTypes } from '@/types/data';
import { EmployeeData } from '@/types/employee';
import OrgChartWithHoverPositions from '@/components/EmployeeCharter/OrgChartWithHoverPositions';

const OrgChartPage: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [compact, setCompact] = useState(false);
  const [search, setSearch] = useState('');
  const [employeesData, setEmployeesData] = useState<EmployeeData[]>([]);
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user as unknown as DataTypes.User;

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
      <div className="bg-white rounded-lg p-6 shadow-lg items-center mb-8 h-20 flex space-x-2 justify-end w-full top-0 left-0">
        <button
          // href="/public"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="flex items-center space-x-1 mr-auto"
        >
          <div className="bg-primary rounded-full w-6 h-6 p-1 flex items-center justify-center mr-2">
            {/* <ArrowLeftIcon className="text-white" /> */}
          </div>
          <div className="flex flex-col -space-y-1">
            <div className="text-100C18 text-lg">Company Charter</div>
          </div>
        </button>
        <div className="relative w-60">
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
              {/* <XMarkIcon className="w-4 h-4" /> */}
            </button>
          )}
        </div>
        <div className="flex space-x-2 text-sm ml-auto">
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
      {/* <OrgChartComponent
        employees={employeesData}
        terminatedEmployees={state.terminatedEmployees}
        terminatedParents={state.terminatedParents}
        totalTerminated={state.totalTerminated}
        selectedEmployees={state.selectedEmployees}
        compact={compact}
        search={search}
        user={user}
        onSelectedEmployees={(id) =>
          dispatch({ type: 'TOGGLE_SELECTED_EMPLOYEES', payload: id })
        }
      /> */}

      <OrgChartWithHoverPositions
        onSelectedEmployees={state.selectedEmployees}
        employees={employeesData}
        compact={compact}
        user={user}
        search={search}
      />
    </div>
  );
};

export default OrgChartPage;
