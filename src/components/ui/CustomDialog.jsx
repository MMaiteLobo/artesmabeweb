import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { dialogStyles, buttonStyles } from '../../styles/common';

function CustomDialog({ 
  open, 
  onClose, 
  title, 
  children, 
  actions,
  maxWidth = 'md',
  fullWidth = true
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      sx={{
        '& .MuiDialog-paper': dialogStyles.paper
      }}
    >
      <DialogTitle sx={dialogStyles.title}>
        {title}
        <IconButton
          onClick={onClose}
          size="small"
          sx={buttonStyles.text}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={dialogStyles.content}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={dialogStyles.actions}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default CustomDialog; 