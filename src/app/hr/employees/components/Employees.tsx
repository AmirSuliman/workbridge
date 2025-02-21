'use client';

import TabButton from '@/components/common/TabsComponent/button';
import TabComponent from '@/components/common/TabsComponent/TabComponent';
import TabsContainer from '@/components/common/TabsComponent/TabsContainer';
import { AllEmployees } from './AllEmployees';
import DepartmentTable from './DepartmentTable';

const Employees = () => {
  return (
    <div className="w-full h-full">
      <TabsContainer containerClasses="my-1 pb-4 sticky top-0">
        <div className="flex gap-0  my-2 border-b-[1px] border-gray-border overflow-x-auto ">
          <TabButton
            isRootTab={true}
            name="Employees"
            href="/hr/employees?tab=0"
          />
          <TabButton name="Department" href="/hr/employees?tab=1" />
        </div>
        <TabComponent index="0" isRootTab={true}>
          <AllEmployees />
        </TabComponent>
        <TabComponent index="1">
          <DepartmentTable />
        </TabComponent>
      </TabsContainer>
    </div>
  );
};

export default Employees;
