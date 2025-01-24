import React, { forwardRef, useImperativeHandle } from 'react';

import { useModal } from '@/hooks/use-modal';

type Props = {
  show: () => void;
  hide: () => void;
};

const ShowEmptyModal = forwardRef<Props>((props, ref) => {
  const modal = useModal();
  useImperativeHandle(ref, () => ({
    show() {
      modal.openModal();
    },
    hide() {
      modal.closeModal();
    },
  }));
  return (
    <div
    // title="Run d-Crystal"
    // size="medium"
    // showDialog={modal.showDialog}
    // onDismiss={modal.closeModal}
    >
      <div className="flex flex-col justify-center h-40 items-center px-8">
        <div className="mb-4">Please select employees to run d-Crystal</div>
        <div className="text-979599 italic text-xs">
          Select employees and one of the options to Terminate, Offshore or
          Upgrade.
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="px-8 py-2 bg-gray-200 text-sm border-primary rounded-full w-24 flex justify-center"
          onClick={modal.closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

ShowEmptyModal.displayName = 'ShowEmptyModal';

export default ShowEmptyModal;
