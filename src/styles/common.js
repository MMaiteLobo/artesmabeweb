import { SCROLLBAR_CONFIG, TRANSITIONS } from '../constants/config';

// Estilos de botones comunes
export const buttonStyles = {
  primary: {
    bgcolor: 'primary.main',
    color: 'white',
    '&:hover': {
      bgcolor: 'primary.dark'
    }
  },
  secondary: {
    bgcolor: 'secondary.main',
    color: 'white',
    '&:hover': {
      bgcolor: 'secondary.dark'
    }
  },
  outlined: {
    border: '1px solid',
    borderColor: 'primary.main',
    color: 'primary.main',
    '&:hover': {
      bgcolor: 'primary.light',
      color: 'primary.dark'
    }
  },
  text: {
    color: 'text.primary',
    '&:hover': {
      bgcolor: 'action.hover'
    }
  }
};

// Estilos de tarjetas
export const cardStyles = {
  base: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: TRANSITIONS.default,
    borderRadius: 2,
    cursor: 'pointer',
    '&:hover': TRANSITIONS.hover
  },
  media: {
    position: 'relative',
    paddingTop: '100%',
    '& img': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  },
  content: {
    flexGrow: 1,
    p: 2
  }
};

// Estilos de diálogos
export const dialogStyles = {
  paper: {
    margin: { xs: 0, sm: 2 },
    width: { xs: '100%', sm: 'auto' },
    maxWidth: { xs: '100%', sm: 'md' },
    maxHeight: { xs: '100%', sm: '90vh' },
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    ...SCROLLBAR_CONFIG.mobile
  },
  title: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    pb: 1,
    px: { xs: 1, sm: 2 }
  },
  content: {
    p: { xs: 2, sm: 3 },
    ...SCROLLBAR_CONFIG.mobile
  },
  actions: {
    p: 2,
    justifyContent: 'flex-end'
  }
};

// Scrollbar Styles
export const scrollbarStyles = {
  custom: {
    '&::-webkit-scrollbar': {
      width: '4px',
      height: '4px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '4px',
      '&:hover': {
        background: '#555'
      }
    }
  },
  mobile: {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }
};

// Estilos de hover y transiciones
export const hoverStyles = {
  scale: {
    transition: TRANSITIONS.fast,
    '&:hover': TRANSITIONS.scale
  },
  lift: {
    transition: TRANSITIONS.default,
    '&:hover': TRANSITIONS.hover
  },
  opacity: {
    transition: TRANSITIONS.opacity,
    '&:hover': {
      opacity: 1
    }
  },
  border: {
    transition: TRANSITIONS.fast,
    '&:hover': {
      borderColor: 'primary.main'
    }
  }
};

// Estilos de listas
export const listStyles = {
  item: {
    py: 0.5, // padding vertical (top + bottom): 0.5 * 8px = 4px. A cada item de la lista se le agrega un padding vertical de 4px.
    px: 0 // padding horizontal (left + right): 0. A cada item de la lista se le agrega un padding horizontal de 0.
  },
  text: {
    display: 'flex', // pone el contenido (clave y valor) en la misma linea
    alignItems: 'center', //alinea verticalmente ambos textos en el centro
    '& .MuiTypography-root': { //a todos los Typography dentro del Box se les aplica el siguiente estilo
      mr: 1, //margin right: 8px, para separar la clave del valor
      color: 'text.secondary' //usa el color secundario del tema para el texto
    }
  }
};

// Estilos de campos de formulario
export const formFieldStyles = {
  input: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none'
      },
      '&:hover fieldset': {
        border: 'none'
      }
    }
  },
  select: {
    '& .MuiSelect-select': {
      py: 1
    }
  }
};

// Estilos de notificaciones
export const notificationStyles = {
  snackbar: {
    '& .MuiSnackbar-root': {
      top: '24px !important'
    }
  },
  alert: {
    width: '100%',
    fontSize: '1.1rem',
    py: 1,
    px: 2,
    boxShadow: 3,
    '& .MuiAlert-icon': {
      fontSize: '1.5rem'
    }
  }
};

// Estilos comunes para ProductCard
export const commonStyles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }
  },
  cardMedia: {
    height: 200,
    objectFit: 'cover',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.9
    }
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }
  },
  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: 2,
      overflow: 'hidden'
    }
  },
  snackbar: {
    '& .MuiAlert-root': {
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }
  },
  thumbnail: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 1,
    cursor: 'pointer',
    border: '2px solid transparent',
    '&:hover': {
      borderColor: 'primary.main',
      opacity: 0.8
    }
  },
  selectedThumbnail: {
    borderColor: 'primary.main',
    opacity: 1
  },
  navigationButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255,255,255,0.8)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.9)'
    }
  },
  prevButton: {
    left: 8
  },
  nextButton: {
    right: 8
  },
  quantityInput: {
    width: 60,
    '& input': {
      textAlign: 'center',
      padding: '8px 4px'
    }
  },
  characteristicsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    '& li': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 1,
      '&:before': {
        content: '"•"',
        color: 'primary.main',
        marginRight: 1
      }
    }
  }
}; 