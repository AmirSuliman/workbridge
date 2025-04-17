import { fetchUserRoles } from '@/store/slices/userRolesSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TabsContainer from '../common/TabsComponent/TabsContainer';
import WorkBridgeLogo from '../icons/work-bridge-logo';
import HRForm from './HRForm';

export default function CreateUserForm({ onClose }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserRoles() as any);
  }, []);

  return (
    <div
      className={` bg-white justify-content-center rounded-sm md:min-w-[35rem] md:min-h-[28rem] px-8 p-4`}
    >
      <WorkBridgeLogo classNames='max-w-[9rem]  mb-[1.5rem]' />
      <h1 className={`font-[700] text-[#282828] mb-2`}>Add New Employee</h1>
      <p className={`text-sm font-[400] text-[#282828] mb-4 `}>
        Please provide the required details to add a new employee. Ensure all
        fields are filled correctly to avoid errors.
      </p>
      <TabsContainer>
        <HRForm onClose={onClose} />
      </TabsContainer>
    </div>
  );
}
