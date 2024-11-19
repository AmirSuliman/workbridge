import { ReactNode } from 'react';
import CancelIcon from '../icons/cancel-icon';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg shadow-lg max-h-[90vh]">
        <div className="relative w-full">
          <button
            onClick={onClose}
            className=" absolute top-0 right-0 mr-3 mt-3"
          >
            <CancelIcon classNames="h-4 w-4 text-black hover:text-gray-700 focus:outline-none" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
