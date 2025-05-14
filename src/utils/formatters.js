// Formateo de precios
export const formatPrice = (price) => {
  if (typeof price !== 'number') {
    console.warn('formatPrice received non-number value:', price);
    return '$0';
  }
  return `$${price.toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
};

// Validación de cantidades
export const validateQuantity = (quantity, min = 1, max = 100) => {
  const num = Number(quantity);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

// Manejo de imágenes
export const imageUtils = {
  // Validar URL de imagen
  isValidImageUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Obtener dimensiones de imagen
  getImageDimensions: (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = url;
    });
  },

  // Validar formato de imagen
  isValidImageFormat: (url) => {
    const validFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    return validFormats.some(format => url.toLowerCase().endsWith(format));
  },

  // Optimizar URL de imagen
  optimizeImageUrl: (url, width, height) => {
    if (!url) return '';
    // Aquí podrías integrar con un servicio de optimización de imágenes
    return url;
  }
};

// Validación de formularios
export const formValidation = {
  // Validar email
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validar teléfono
  isValidPhone: (phone) => {
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    return phoneRegex.test(phone);
  },

  // Validar nombre
  isValidName: (name) => {
    return name.length >= 2 && name.length <= 50;
  },

  // Validar dirección
  isValidAddress: (address) => {
    return address.length >= 5 && address.length <= 200;
  },

  // Validar código postal
  isValidPostalCode: (code) => {
    const postalCodeRegex = /^\d{4,10}$/;
    return postalCodeRegex.test(code);
  },

  // Validar formulario completo
  validateForm: (formData) => {
    const errors = {};
    
    if (!formValidation.isValidName(formData.name)) {
      errors.name = 'El nombre debe tener entre 2 y 50 caracteres';
    }
    
    if (!formValidation.isValidEmail(formData.email)) {
      errors.email = 'Ingrese un email válido';
    }
    
    if (!formValidation.isValidPhone(formData.phone)) {
      errors.phone = 'Ingrese un teléfono válido';
    }
    
    if (!formValidation.isValidAddress(formData.address)) {
      errors.address = 'La dirección debe tener entre 5 y 200 caracteres';
    }
    
    if (!formValidation.isValidPostalCode(formData.postalCode)) {
      errors.postalCode = 'Ingrese un código postal válido';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

// Utilidades de texto
export const textUtils = {
  // Truncar texto
  truncate: (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  // Capitalizar primera letra
  capitalize: (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  // Formatear número con separadores
  formatNumber: (number, locale = 'es-ES') => {
    return new Intl.NumberFormat(locale).format(number);
  }
}; 