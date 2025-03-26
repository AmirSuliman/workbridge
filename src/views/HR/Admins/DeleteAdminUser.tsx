import Button from '@/components/Button';
import Modal from '@/components/modal/Modal';
import { closeDeleteModal, removeUser } from '@/store/slices/userSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  active: boolean;
  profilePictureUrl?: string;
}
const DeleteAdminUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { deleteModalOpen, employeeToDelete } = useSelector(
    (state: RootState) => state.users
  ) as { deleteModalOpen: boolean; employeeToDelete: User | null };
  const [loading, setLoading] = useState(false);

  if (!deleteModalOpen || !employeeToDelete) return null; // Don't render if modal is closed

  const handleDelete = async () => {
    if (!employeeToDelete) return;
    try {
      setLoading(true);
      await dispatch(removeUser(employeeToDelete.id)).unwrap();
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user.');
    } finally {
      setLoading(false);
      dispatch(closeDeleteModal());
    }
  };

  return (
    <Modal onClose={() => dispatch(closeDeleteModal())}>
      <section className="p-8 min-h-80 flex flex-col">
        <h1 className="font-semibold text-xl my-4">Delete</h1>
        <p className="text-lg text-center">
          Are you sure you want to delete this item?
        </p>
        <p className="font-semibold text-base text-center mb-auto">
          This action is irreversible.
        </p>
        <div className="flex items-center gap-4 justify-center mt-4 mb-0">
          <Button
            disabled={loading}
            onClick={handleDelete}
            name={loading ? '' : 'Confirm'}
            icon={
              loading && (
                <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
              )
            }
            className="disabled:cursor-not-allowed"
          />
          <Button
            onClick={() => dispatch(closeDeleteModal())}
            bg="transparent"
            textColor="black"
            name="Cancel"
          />
        </div>
      </section>
    </Modal>
  );
};
export default DeleteAdminUser;
