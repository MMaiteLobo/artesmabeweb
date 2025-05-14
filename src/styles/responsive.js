import { BREAKPOINTS } from '../constants/config';

export const responsiveStyles = {
  // Layout
  container: {
    xs: {
      width: '100%',
      padding: '0 16px'
    },
    sm: {
      width: '100%',
      padding: '0 24px'
    },
    md: {
      width: '100%',
      maxWidth: BREAKPOINTS.lg,
      margin: '0 auto',
      padding: '0 24px'
    }
  },

  // Grid
  grid: {
    xs: {
      spacing: 2
    },
    sm: {
      spacing: 3
    },
    md: {
      spacing: 4
    }
  },

  // Typography
  typography: {
    h1: {
      xs: {
        fontSize: '2rem',
        lineHeight: 1.2
      },
      sm: {
        fontSize: '2.5rem',
        lineHeight: 1.2
      },
      md: {
        fontSize: '3rem',
        lineHeight: 1.2
      }
    },
    h2: {
      xs: {
        fontSize: '1.75rem',
        lineHeight: 1.2
      },
      sm: {
        fontSize: '2rem',
        lineHeight: 1.2
      },
      md: {
        fontSize: '2.5rem',
        lineHeight: 1.2
      }
    },
    body1: {
      xs: {
        fontSize: '1rem',
        lineHeight: 1.5
      },
      sm: {
        fontSize: '1.1rem',
        lineHeight: 1.5
      },
      md: {
        fontSize: '1.2rem',
        lineHeight: 1.5
      }
    }
  },

  // Spacing
  spacing: {
    xs: {
      section: '2rem',
      component: '1rem'
    },
    sm: {
      section: '3rem',
      component: '1.5rem'
    },
    md: {
      section: '4rem',
      component: '2rem'
    }
  },

  // Dialog
  dialog: {
    xs: {
      width: '100%',
      maxWidth: '100%',
      margin: 0,
      padding: '16px'
    },
    sm: {
      width: 'auto',
      maxWidth: 'md',
      margin: '16px',
      padding: '24px'
    },
    md: {
      width: 'auto',
      maxWidth: 'md',
      margin: '24px',
      padding: '32px'
    }
  },

  // Image
  image: {
    xs: {
      width: '100%',
      height: 'auto'
    },
    sm: {
      width: '100%',
      height: 'auto'
    },
    md: {
      width: '100%',
      height: 'auto'
    }
  },

  // Navigation
  navigation: {
    xs: {
      display: 'none'
    },
    sm: {
      display: 'flex'
    },
    md: {
      display: 'flex'
    }
  },

  // Button
  button: {
    xs: {
      width: '100%',
      padding: '8px 16px'
    },
    sm: {
      width: 'auto',
      padding: '8px 24px'
    },
    md: {
      width: 'auto',
      padding: '12px 32px'
    }
  }
}; 