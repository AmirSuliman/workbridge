import Button from '@/components/Button';
import Modal from '@/components/modal/Modal';
import axiosInstance from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';

const DeletePolicyModal = ({ onClose }) => {
  const router = useRouter();
  const { policyId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/policy/${policyId}`);
      toast.success('Policy deleted successfully!');
      setLoading(false);
      onClose();
      router.back();
      console.log(response);
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Failed to delete file.');
      } else {
        toast.error('Failed to delete file.');
      }
    }
  };

  return (
    <Modal onClose={onClose}>
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
export default DeletePolicyModal;