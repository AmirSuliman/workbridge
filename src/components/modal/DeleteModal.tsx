import { FC } from 'react';

// import Modal from '@/components/Modal/index';
// import { Spinner } from '@/components/Spinner';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  title: string;
};

export const DeleteModal: FC<Props> = ({
  isOpen,
  onClose,
  onDelete,
  isDeleting,
  title,
}) => {
  return (
    <div
    // showDialog={isOpen}
    // onDismiss={onClose}
    // titleElement={
    //   <div className="flex items-center text-230E379 text-lg space-x-4">
    //     <ExclamationCircleIcon className="w-6 h-6 font-semibold text-A31515" />
    //     <span>Delete {title}</span>
    //   </div>
    // }
    // bodyClassName="h-104"
    >
      <div className="h-50 flex flex-col items-center justify-center -mt-8">
        <div className="text-230E379 mt-4">
          Are you sure you want to delete this {title?.toLowerCase()}?
        </div>
        <div className="text-979599 text-sm italic">
          Please note that this action is irreversible.
        </div>
      </div>
      <div className="flex justify-center mt-auto">
        <button
          type="button"
          className="px-12 py-1 bg-gray-200 text-sm border-primary rounded-full w-30 flex justify-center"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-12 py-1 bg-primary text-white text-sm rounded-full w-30 flex justify-center ml-4 disabled:bg-purple-300"
          disabled={isDeleting}
          onClick={onDelete}
        >
          {/* {isDeleting && <Spinner className="w-5 h-5 mr-2" />} */}
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};
