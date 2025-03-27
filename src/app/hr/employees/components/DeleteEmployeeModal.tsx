import Button from '@/components/Button';
import Modal from '@/components/modal/Modal';
import axiosInstance from '@/lib/axios';
import {
  closeDeleteModal,
  deleteEmployee,
} from '@/store/slices/allEmployeesSlice';
import { RootState } from '@/store/store';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

const DeleteEmployeeMoadal = () => {
  const dispatch = useDispatch();
  const { deleteModalOpen, employeeToDelete } = useSelector(
    (state: RootState) => state.employees
  );
  const [loading, setLoading] = useState(false);

  if (!deleteModalOpen || !employeeToDelete) return null; // Don't render if modal is closed

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/employee/${employeeToDelete.id}`);
      dispatch(deleteEmployee(employeeToDelete.id));
      toast.success('Employee deleted successfully!');
    } catch (error) {
      console.error(error);
      if (isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || 'Failed to delete employee.'
        );
      } else {
        toast.error('Failed to delete employee.');
      }
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
export default DeleteEmployeeMoadal;
