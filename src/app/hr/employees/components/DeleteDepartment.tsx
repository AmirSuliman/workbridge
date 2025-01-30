import { BiLoaderCircle } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import axiosInstance from '@/lib/axios';
import Modal from '@/components/modal';
import Button from '@/components/Button';
import { useParams, useRouter } from 'next/navigation';

const DeleteDepartment = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const { id } = useParams();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/department/${id}`);
      console.log('delete response: ', response.data);
      toast.success('Department deleted successfully!');
      setLoading(false);
      onClose();
      route.back();
    } catch (error) {
      console.error(error);
      setLoading(false);

      if (isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || 'Failed to delete Department.'
        );
      } else {
        toast.error('Failed to delete Department.');
      }
    }
  };
  return (
    <Modal onClose={onClose}>
      <section className="p-8 min-h-80 flex flex-col">
        <h1 className="font-semibold text-xl my-4">Delete</h1>
        <p className="text-xl text-center">
          Are you sure you want to delete this department?
        </p>
        <p className="font-bold text-base text-center mb-auto">
          All employees will no longer have any departments assigned.
        </p>
        <div className="flex items-center gap-4 justify-center mt-4 mb-0">
          <Button
            disabled={loading}
            onClick={handleSubmit}
            name={loading ? '' : 'Confirm'}
            icon={
              loading && (
                <BiLoaderCircle className="h-5 w-5 duration-100 animate-spin" />
              )
            }
            className="disabled:cursor-not-allowed"
          />
          <Button
            onClick={onClose}
            bg="transparent"
            textColor="black"
            name="Cancel"
          />
        </div>
      </section>
    </Modal>
  );
};
export default DeleteDepartment;
