'use client';

// import clsx from 'clsx';
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

  const { data: companies, isLoading: isCompaniesLoading } = useQuery(
    'companies-org-chart',
    () =>
      api('GET /companies', {
        query: {
          size: 50,
          page: 1,
        },
      }),
    {
      select: (res) => res.data.data,
      refetchOnWindowFocus: false,
    }
  );

  const { data: orgChartResponse, isLoading } = useQuery(
    ['o-employees', selectedCompany],
    () =>
      api('GET /company/{id}/organogram', {
        params: {
          id: selectedCompany,
        },
        query: {
          withCEO: true,
          flat: true,
        },
      }),
    {
      select: ({ data }) => data.data,
      enabled: !queryParams.get('viewId') && selectedCompany > 0,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );

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

  useEffect(() => {
    // if (orgChartResponse || view?.view) {
    if (orgChartResponse) {
      const data = orgChartResponse ?? view?.view;
      // dispatch({
      //   type: 'TERMINATED_EMPLOYEE',
      //   payload: data?.orgChartData.filter((e: EmployeeData) => e.isTerminated),
      // });
      dispatch({
        type: 'TOTAL_TERMINATED_EMPLOYEES_PER_PARENT',
        payload: data?.orgChartData,
      });
      dispatch({
        type: 'SET_REVENUE_COST',
        payload: {
          totalCost: data.totalCost,
          totalSaved: data.totalSaved,
        },
      });
      if (view) {
        setSelectedCompany(view.companyId);
      }
    }
  }, [orgChartResponse, view]);

  useEffect(() => {
    setSelectedCompany(!!params.id ? Number(params.id) : 4);
  }, [companies?.items, params.id]);

  const employeesData = prepareOrgChartData(
    !!queryParams.get('viewId')
      ? view?.view?.orgChartData
      : orgChartResponse?.orgChartData
  );

  return (
    <div
      id="parent"
      className="w-full h-full relative overflow-hidden no-scrollbar "
    >
      <OrgChartComponent
        employees={orgChartData}
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
