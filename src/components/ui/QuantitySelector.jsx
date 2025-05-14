import { Box, IconButton, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { QUANTITY_CONFIG } from '../../constants/config';
import { hoverStyles } from '../../styles/common';

function QuantitySelector({ value, onChange, min = QUANTITY_CONFIG.min }) {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    onChange(Math.max(min, value - 1));
  };

  const handleChange = (event) => {
    const newValue = Math.max(min, parseInt(event.target.value) || min);
    onChange(newValue);
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      overflow: 'hidden',
      maxWidth: '120px',
      ...hoverStyles.border
    }}>
      <IconButton
        onClick={handleDecrement}
        size="small"
        sx={{ 
          borderRadius: 0,
          borderRight: '1px solid',
          borderColor: 'divider',
          padding: '4px',
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
      >
        <Remove fontSize="small" />
      </IconButton>
      <TextField
        type="number"
        value={value}
        onChange={handleChange}
        inputProps={{ 
          min,
          style: { 
            textAlign: 'center',
            padding: '4px 0',
            width: '40px',
            MozAppearance: 'textfield',
            WebkitAppearance: 'none',
            margin: 0
          }
        }}
        sx={{ 
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none'
            },
            '&:hover fieldset': {
              border: 'none'
            }
          },
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
          }
        }}
      />
      <IconButton
        onClick={handleIncrement}
        size="small"
        sx={{ 
          borderRadius: 0,
          borderLeft: '1px solid',
          borderColor: 'divider',
          padding: '4px',
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
      >
        <Add fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default QuantitySelector; 