// Breakpoints
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

// Image Sizes
export const IMAGE_SIZES = {
  productCard: {
    width: '400px',
    height: '400px',
    thumbnail: {
      width: '80px',
      height: '80px'
    }
  },
  categoryCard: {
    width: '300px',
    height: '300px'
  }
};

// Scrollbar Configurations
export const SCROLLBAR_CONFIG = {
  webkit: {
    height: '4px',
    track: {
      background: '#f1f1f1'
    },
    thumb: {
      background: '#888',
      borderRadius: '4px'
    }
  },
  mobile: {
    display: 'none',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none'
  }
};

// Transitions and Animations
export const TRANSITIONS = {
  default: 'all 0.3s',
  fast: 'all 0.2s',
  hover: {
    transform: 'translateY(-4px)',
    boxShadow: 6
  },
  scale: {
    transform: 'scale(1.05)'
  },
  opacity: {
    transition: 'opacity 0.2s'
  }
};

// Dialog Configurations
export const DIALOG_CONFIG = {
  product: {
    maxWidth: 'md',
    fullWidth: true,
    paper: {
      margin: { xs: 0, sm: 2 },
      width: { xs: '100%', sm: 'auto' },
      maxWidth: { xs: '100%', sm: 'md' },
      maxHeight: { xs: '100%', sm: '90vh' },
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
    },
    content: {
      p: { xs: 2, sm: 3 }
    },
    title: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      pb: 1,
      px: { xs: 1, sm: 2 }
    }
  }
};

// Navigation Controls
export const NAVIGATION_CONTROLS = {
  button: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    color: 'text.secondary',
    hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: 'text.primary',
      transform: 'translateY(-50%) scale(1.05)'
    }
  }
};

// Touch Configurations
export const TOUCH_CONFIG = {
  swipeThreshold: 50,
  touchStart: null,
  touchEnd: null
};

// Quantity Controls
export const QUANTITY_CONFIG = {
  min: 1,
  input: {
    width: '40px',
    textAlign: 'center',
    padding: '8px 0',
    MozAppearance: 'textfield',
    WebkitAppearance: 'none',
    margin: 0
  }
}; 