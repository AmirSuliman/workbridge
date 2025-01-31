'use client';

import TabsContainer from '@/components/common/TabsComponent/TabsContainer';
import { useRouter, useSearchParams } from 'next/navigation';
import { AllEmployees } from './AllEmployees';
import DepartmentTable from './DepartmentTable';

const Employees = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  return (
    <div className="w-full h-full">
      <TabsContainer containerClasses="my-1 pb-4 sticky top-0">
        <div className="flex gap-0  my-2 border-b-[1px] border-gray-border overflow-x-auto ">
          <button
            className={`px-[3%] text-xs  py-3 text-dark-navy  whitespace-nowrap  ${
              !tab || tab === '0'
                ? 'font-semibold border-b-2 !border-dark-navy'
                : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              route.push('/hr/employees?tab=0');
            }}
          >
            Employees
          </button>
          <button
            className={`px-[3%] text-xs py-3 text-dark-navy  whitespace-nowrap  ${
              tab === '1' ? 'font-semibold border-b-2 !border-dark-navy' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              route.push('/hr/employees?tab=1');
            }}
          >
            Department
          </button>
        </div>
        {(!tab || tab === '0') && <AllEmployees />}
        {tab === '1' && <DepartmentTable />}
      </TabsContainer>
    </div>
  );
};

export default Employees;
