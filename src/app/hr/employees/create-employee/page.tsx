'use client';
import Button from '@/components/Button';
import Tab from '@/components/common/TabsComponent/Tab';
import TabPanel from '@/components/common/TabsComponent/TabPanel';
import TabsContainer from '@/components/common/TabsComponent/TabsContainer';
import { FormProvider, useForm } from 'react-hook-form';
import { TbEdit } from 'react-icons/tb';
import BasicInfo from '../components/form/BasicInfo';
import Documents from '../components/form/Documents';
import Employment from '../components/form/Employement';
import { EmployeeData } from '@/types/employee';

const CreateEmployee = () => {
  const formMethods = useForm<EmployeeData>();
  const { handleSubmit, reset } = formMethods;
  const onSubmit = (data) => {
    reset();
    console.log(data);
  };
  return (
    <main>
      <div className="flex justify-between">
        <p className="flex items-center gap-x-2">
          <TbEdit />
          <span>Create Employee</span>
        </p>
        <div className="flex items-center gap-x-2">
          <Button name="Save Draft" />
          <Button
            name="Cancel"
            className="bg-transparent border-none !text-black"
          />
        </div>
      </div>
      {/* tabs */}
      <TabsContainer containerClasses="my-1 pb-2 md:pb-4">
        <div className="flex gap-0  my-2 border-b-[1px] border-gray-border overflow-x-auto ">
          <Tab
            index={0}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Basic Information
          </Tab>
          <Tab
            index={1}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Employment
          </Tab>
          <Tab
            index={2}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Documents
          </Tab>
        </div>
        <div>
          {/* using form provider for multi-step form */}
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TabPanel index={0}>
                <BasicInfo />
              </TabPanel>
              <TabPanel index={1}>
                <Employment />
              </TabPanel>
              <TabPanel index={2}>
                <Documents />
              </TabPanel>
            </form>
          </FormProvider>
        </div>
      </TabsContainer>
    </main>
  );
};

export default CreateEmployee;
