import Tab from '@/components/common/TabsComponent/Tab';
import TabPanel from '@/components/common/TabsComponent/TabPanel';
import TabsContainer from '@/components/common/TabsComponent/TabsContainer';
import { AllEmployees } from './AllEmployees';
import DepartmentTable from './DepartmentTable';

const Employees = () => {
  return (
    <div className="w-full h-full  p-5">
      <TabsContainer containerClasses="my-1 pb-4 sticky top-0">
        <div className="flex gap-0  my-2 border-b-[1px] border-gray-border overflow-x-auto ">
          <Tab
            index={0}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Employees
          </Tab>
          <Tab
            index={1}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Department
          </Tab>
        </div>
        <div>
          <TabPanel index={0}>
            <AllEmployees />
          </TabPanel>
          <TabPanel index={1}>
            <DepartmentTable/>
          </TabPanel>
        </div>
      </TabsContainer>
    </div>
  );
};

export default Employees;
