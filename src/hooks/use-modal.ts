import { useState } from 'react';

export function useModal() {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return {
    showDialog,
    openModal: open,
    closeModal: close,
  };
}
