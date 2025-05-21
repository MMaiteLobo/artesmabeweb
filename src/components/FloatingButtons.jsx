import { IconButton, Box } from '@mui/material';
import { WhatsApp, KeyboardArrowUp } from '@mui/icons-material';
import { useScrollTrigger } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useFloatingButtons } from '../context/FloatingButtonsContext';
import { useScrollTo } from '../hooks/useScrollTo';

const FloatingButtons = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const location = useLocation();
  const isProductDetail = location.pathname === '/products' && location.state?.product;
  const { isVisible } = useFloatingButtons();
  const { scrollToTop } = useScrollTo();

  if (isProductDetail || !isVisible) return null;

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999 }}>
      {/* WhatsApp Button */}
      <IconButton
        component="a"
        href="https://wa.me/5491167924239"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          bgcolor: '#25D366',
          color: 'white',
          '&:hover': {
            bgcolor: '#128C7E',
            transform: 'scale(1.1)'
          },
          width: 40,
          height: 40,
          boxShadow: 2,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <WhatsApp sx={{ fontSize: 24 }} />
      </IconButton>

      {/* Back to Top Button */}
      {trigger && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark'
            },
            width: 40,
            height: 40,
            boxShadow: 2,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <KeyboardArrowUp sx={{ fontSize: 24 }} />
        </IconButton>
      )}
    </Box>
  );
};

export default FloatingButtons; 