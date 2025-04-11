import Modal from '@/components/modal';

const SuccessMessage = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className='min-w-[300px] lg:min-w-[600px] px-8 py-4 border-2 border-[#00B87D] flex items-center rounded'>
        <p className='text-sm text-center text-[#00B87D] max-w-lg'>
          The account has been successfully created, and the setup instructions
          have been sent to the employee via email.
        </p>
      </div>
    </Modal>
  );
};
export default SuccessMessage;
