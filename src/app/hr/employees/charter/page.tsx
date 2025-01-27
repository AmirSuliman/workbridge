'use client';

import clsx from 'clsx';
import { OrgChart } from 'd3-org-chart';
// import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { FC, useEffect, useReducer, useRef, useState } from 'react';
import { useQuery } from 'react-query';

// import SaveViewModal from '@/components/Modal/SaveViewModal';
// import { PrivateEquityTitle } from '@/components/PrivateEquityTitle';
// import { SelectCompany } from '@/components/SelectCompany';
// import { Spinner } from '@/components/Spinner';
import api from '@/modules/api/client';
import { initialState, reducer } from '@/store/reducer';
import { DataTypes } from '@/types/data';
// import { ModalHandle } from '@/types/misc';
import { prepareOrgChartData } from '@/utils/misc';
// import { ExportActions, Workforce } from '@/views/OrgChart/Actions';
// import { OrgChartInsights } from '@/views/OrgChart/OrgChartInsights';
import { OrgChartComponent } from '@/components/EmployeeCharter/OrgChartComponent';
import { orgChartData } from '@/utils/dummyOrgCharData';
import { EmployeeData } from '@/types/employee';
import Link from 'next/link';
import { getCharter } from '@/services/getCharter';

// import { OrgChartComponent } from './OrgChartComponent';
// import ShowEmptyModal from './ShowEmptyModal';

// import RunAction = DataTypes.RunAction;
// import EUserRoles = DataTypes.EUserRoles;

const OrgChartPage: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [compact, setCompact] = useState(false);
  // const [action, setAction] = useState<RunAction | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<number>(4);
  const [search, setSearch] = useState('');
  // const [isActionLoading, setIsActionLoading] = useState(false);
  const [employeesData, setEmployeesData] = useState<EmployeeData[]>([]);
  // const router = useRouter();
  const params = useParams();
  const queryParams = useSearchParams();
  const refOrgChart = useRef(new OrgChart<EmployeeData>());
  // const modalRef = useRef<ModalHandle>(null);
  // const saveViewRef = useRef<ModalHandle>(null);

  const { data: session } = useSession();
  const user = session?.user as unknown as DataTypes.User;

  const { data: view, isLoading: isViewLoading } = useQuery(
    ['o-view', queryParams.get('viewId')],
    () =>
      api('GET /saveView/{id}', {
        params: {
          id: Number(queryParams.get('viewId')),
        },
        query: {
          associations: true,
        },
      }),
    {
      select: (res) => res.data.data,
      enabled: !!queryParams.get('viewId'),
      refetchOnWindowFocus: false,
    }
  );

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

  const onTerminate = (employee: EmployeeData, node: any) => {
    dispatch({ type: 'TOGGLE_TERMINATE_EMPLOYEE', payload: [employee] });
    dispatch({
      type: 'TERMINATED_PARENTS',
      payload: { node, employee },
    });
    dispatch({
      type: 'PARENT_TOTAL_TERMINATED_EMPLOYEES',
      payload: { parentId: node.data.parentId, employeeId: employee.id },
    });
    // dispatch({
    //   type: 'CALCULATE_REVENUE_AND_COST',
    //   payload: employee.isTerminated ? -employee.salary : employee.salary,
    // });
  };

  // useEffect(() => {
  //   // if (orgChartResponse || view?.view) {
  //   if (orgChartResponse) {
  //     const data = orgChartResponse ?? view?.view;
  //     // dispatch({
  //     //   type: 'TERMINATED_EMPLOYEE',
  //     //   payload: data?.orgChartData.filter((e: EmployeeData) => e.isTerminated),
  //     // });
  //     dispatch({
  //       type: 'TOTAL_TERMINATED_EMPLOYEES_PER_PARENT',
  //       payload: data?.orgChartData,
  //     });
  //     dispatch({
  //       type: 'SET_REVENUE_COST',
  //       payload: {
  //         totalCost: data.totalCost,
  //         totalSaved: data.totalSaved,
  //       },
  //     });
  //     if (view) {
  //       setSelectedCompany(view.companyId);
  //     }
  //   }
  // }, [orgChartResponse, view]);

  // const employeesData = prepareOrgChartData(
  //   !!queryParams.get('viewId')
  //     ? view?.view?.orgChartData
  //     : orgChartResponse?.orgChartData
  // );

  return (
    <div
      id="parent"
      className="w-full h-full relative overflow-hidden no-scrollbar "
    >
      <div className="bg-white rounded-lg p-6 shadow-lg items-center mb-8 h-20 flex space-x-2 justify-end w-full top-0 left-0">
        <Link
          href="/public"
          onClick={(e) => {
            e.preventDefault();
            // router.back();
          }}
          className="flex items-center space-x-1 mr-auto"
        >
          <div className="bg-primary rounded-full w-6 h-6 p-1 flex items-center justify-center mr-2">
            {/* <ArrowLeftIcon className="text-white" /> */}
          </div>
          <div className="flex flex-col -space-y-1">
            <div className="text-100C18 text-lg">Company Charter</div>
          </div>
        </Link>
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
              'border border-primary rounded-full px-4 py-2',
              !compact && 'bg-primary text-white'
            )}
            onClick={() => setCompact(false)}
          >
            Horizontal
          </button>
          <button
            className={clsx(
              'border border-primary rounded-full px-4 py-2',
              compact && 'bg-primary text-white'
            )}
            onClick={() => setCompact(true)}
          >
            Vertical
          </button>
        </div>
      </div>
      <OrgChartComponent
        employees={employeesData}
        refOrgChart2={refOrgChart}
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
        onTerminate={onTerminate}
      />
    </div>
  );
};

export default OrgChartPage;
