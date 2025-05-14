import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { NAVIGATION_CONTROLS } from '../../constants/config';

function NavigationButtons({ onPrev, onNext, showOnMobile = false }) {
  return (
    <>
      <IconButton
        onClick={onPrev}
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          ...NAVIGATION_CONTROLS.button,
          display: { xs: showOnMobile ? 'flex' : 'none', sm: 'flex' },
          '&:hover': NAVIGATION_CONTROLS.button.hover
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        onClick={onNext}
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          ...NAVIGATION_CONTROLS.button,
          display: { xs: showOnMobile ? 'flex' : 'none', sm: 'flex' },
          '&:hover': NAVIGATION_CONTROLS.button.hover
        }}
      >
        <ChevronRight />
      </IconButton>
    </>
  );
}

export default NavigationButtons; 