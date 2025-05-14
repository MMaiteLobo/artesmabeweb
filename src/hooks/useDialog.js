import { useState, useCallback } from 'react';

export const useDialog = (initialState = false) => {
  const [open, setOpen] = useState(initialState);
  const [dialogData, setDialogData] = useState(null);

  const openDialog = useCallback((data = null) => {
    setDialogData(data);
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
    setDialogData(null);
  }, []);

  const toggleDialog = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return {
    open,
    dialogData,
    openDialog,
    closeDialog,
    toggleDialog
  };
}; 