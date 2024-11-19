import { fetchUserRoles } from '@/store/slices/userRolesSlice';
import { Lato } from 'next/font/google';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TabsContainer from '../common/TabsComponent/TabsContainer';
import WorkBridgeLogo from '../icons/work-bridge-logo';
import HRForm from './HRForm';
// Main User Management Form component
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '300', '700'],
});
export default function CreateUserForm() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserRoles() as any);
  }, []);

  return (
    <div
      className={` bg-white justify-content-center rounded-sm md:min-w-[35rem] md:min-h-[28rem] px-8 p-4`}
    >
      <WorkBridgeLogo classNames="max-w-[9rem]  mb-[1.5rem]" />

      <h1 className={`${lato.className} font-[700] text-[#282828] mb-2`}>
        Add New User
      </h1>
      <p
        className={`${lato.className} text-sm font-[400] text-[#282828] mb-4 `}
      >
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      </p>
      <TabsContainer>
        {/* <div className="flex items-center gap-6  border-light-gray pb-2  border-b-[1px] "> */}
        {/* <Tab
            index={0}
            tabStyles="text-xs text-[#6D6D6D]"
            activeTabStyle="!text-[#7152F3]"
          >
            Add Super Admin{' '}
          </Tab> */}
        {/* <Tab
            index={1}
            tabStyles="text-xs text-[#6D6D6D]"
            activeTabStyle="!text-[#7152F3]"
          >
            Add New Employee{' '}
          </Tab> */}
        {/* <Tab
            index={2}
            tabStyles="text-xs text-[#6D6D6D]"
            activeTabStyle="!text-[#7152F3]"
          >
            Add New HR{' '}
          </Tab> */}
        {/* </div> */}
        {/* <TabPanel classNames="min-h-[12rem]" index={0}>
          <h1>Add New HR</h1>
        </TabPanel> */}
        {/* <TabPanel classNames="min-h-[12rem]" index={1}>
          <h1>Add new Employee</h1>
        </TabPanel> */}
        {/* <TabPanel classNames="min-h-[12rem]" index={2}> */}
        <HRForm />
        {/* </TabPanel> */}
      </TabsContainer>
    </div>
  );
}
