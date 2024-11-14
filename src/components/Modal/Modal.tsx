import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh]">
        <div className="relative w-full">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none absolute top-0 right-0 mt-[-10px] p-6 text-[22px]"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
