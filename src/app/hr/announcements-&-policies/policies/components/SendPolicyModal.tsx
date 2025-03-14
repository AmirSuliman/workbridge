import Tab from '@/components/common/TabsComponent/Tab';
import TabPanel from '@/components/common/TabsComponent/TabPanel';
import Modal from '@/components/modal/Modal';
import PolicyToDepartments from './PolicyToDepartments';
import TabsContainer from '@/components/common/TabsComponent/TabsContainer';
import PolicyToEmployees from './PolicyToEmployees';

const SendPolicyModal = ({ onClose, postPolicy }) => {
  return (
    <Modal onClose={onClose}>
      <div className="w-full lg:min-w-[500px]">
        <TabsContainer containerClasses="p-8 min-h-80 flex flex-col w-full">
          <div className="flex gap-4 border-b-2 border-b-gray-50">
            <Tab
              index={0}
              tabStyles="text-xs  py-3 text-dark-navy  whitespace-nowrap "
              activeTabStyle="font-semibold border-b-2 !border-dark-navy"
            >
              Send by Departments
            </Tab>
            <Tab
              index={1}
              tabStyles="text-xs  py-3 text-dark-navy whitespace-nowrap "
              activeTabStyle="font-semibold border-b-2 !border-dark-navy"
            >
              Select by Employees
            </Tab>
          </div>
          <TabPanel index={0}>
            <PolicyToDepartments postPolicy={postPolicy} onClose={onClose} />
          </TabPanel>
          <TabPanel index={1}>
            <PolicyToEmployees postPolicy={postPolicy} onClose={onClose} />
          </TabPanel>
        </TabsContainer>
      </div>
    </Modal>
  );
};
export default SendPolicyModal;
