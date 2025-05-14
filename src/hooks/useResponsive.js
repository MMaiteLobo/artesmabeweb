import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useResponsive() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const getResponsiveValue = (mobile, tablet, desktop) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const getResponsiveSx = (sx) => {
    return {
      ...sx,
      ...(isMobile && sx.xs),
      ...(isTablet && sx.sm),
      ...(isDesktop && sx.md)
    };
  };

  return {
    isMobile,
    isTablet,
    isDesktop,
    getResponsiveValue,
    getResponsiveSx
  };
} 