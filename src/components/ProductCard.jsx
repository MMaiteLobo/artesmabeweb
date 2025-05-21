import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useImageGallery } from '../hooks/useImageGallery';
import { useResponsive } from '../hooks/useResponsive';
import { formatPrice, validateQuantity } from '../utils/formatters';
import { responsiveStyles } from '../styles/responsive';
import { commonStyles } from '../styles/common';
import NavigationButtons from './ui/NavigationButtons';
import QuantitySelector from './ui/QuantitySelector';
import ImageThumbnails from './ui/ImageThumbnails';
import CharacteristicsList from './ui/CharacteristicsList';
import { Close } from '@mui/icons-material';
import { useFloatingButtons } from '../context/FloatingButtonsContext';

const ProductCard = ({ product, onClose }) => {
  if (!product) return null;

  const { isMobile, getResponsiveValue, getResponsiveSx } = useResponsive();
  const { addToCart, showNotification, hideNotification } = useCart();
  const { setIsVisible } = useFloatingButtons();

  useEffect(() => {
    setIsVisible(false);
    return () => setIsVisible(true);
  }, [setIsVisible]);

  // Create safe product with minimal defaults
  const safeProduct = {
    id: product.id || '',
    name: product.name || 'Producto sin nombre',
    description: product.description || '',
    price: product.price || 0,
    variants: product.variants || [],
    characteristics: product.characteristics || {}
  };

  // Create safe variants with proper image handling
  const safeVariants = useCallback(() => {
    return safeProduct.variants.map(variant => ({
      id: variant.id || '',
      name: variant.name || 'Variante sin nombre',
      price: variant.price || safeProduct.price || 0,
      characteristics: variant.characteristics || {},
      images: Array.isArray(variant.images) 
        ? variant.images 
        : variant.image 
          ? [variant.image]
          : []
    }));
  }, [safeProduct.variants, safeProduct.price]);

  // Initialize state with the first variant
  const [selectedVariant, setSelectedVariant] = useState(safeVariants()[0]);
  const [quantity, setQuantity] = useState(1);

  // Reset selected variant when variants change
  useEffect(() => {
    const variants = safeVariants();
    if (variants.length > 0) {
      setSelectedVariant(variants[0]);
    }
  }, [safeVariants]);

  const {
    currentIndex,
    nextImage,
    prevImage,
    selectImage
  } = useImageGallery(selectedVariant?.images || []);

  const handleVariantChange = useCallback((event) => {
    const newVariant = safeVariants().find(v => v.id === event.target.value);
    if (newVariant) {
      setSelectedVariant(newVariant);
      selectImage(0);
    }
  }, [safeVariants, selectImage]);

  const handleNextImage = useCallback(() => {
    const currentVariantIndex = safeVariants().findIndex(v => v.id === selectedVariant.id);
    const currentImageIndex = currentIndex;
    const currentVariant = safeVariants()[currentVariantIndex];
    
    // Si hay más imágenes en la variante actual
    if (currentImageIndex < currentVariant.images.length - 1) {
      nextImage();
    } 
    // Si es la última imagen de la variante actual y hay más variantes
    else if (currentVariantIndex < safeVariants().length - 1) {
      const nextVariant = safeVariants()[currentVariantIndex + 1];
      setSelectedVariant(nextVariant);
      selectImage(0);
    }
  }, [currentIndex, nextImage, safeVariants, selectedVariant.id, selectImage]);

  const handlePrevImage = useCallback(() => {
    const currentVariantIndex = safeVariants().findIndex(v => v.id === selectedVariant.id);
    const currentImageIndex = currentIndex;
    
    // Si no es la primera imagen de la variante actual
    if (currentImageIndex > 0) {
      prevImage();
    } 
    // Si es la primera imagen de la variante actual y hay variantes anteriores
    else if (currentVariantIndex > 0) {
      const prevVariant = safeVariants()[currentVariantIndex - 1];
      setSelectedVariant(prevVariant);
      selectImage(prevVariant.images.length - 1);
    }
  }, [currentIndex, prevImage, safeVariants, selectedVariant.id, selectImage]);

  const handleQuantityChange = useCallback((newQuantity) => {
    if (validateQuantity(newQuantity)) {
      setQuantity(newQuantity);
    }
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!selectedVariant?.images?.[0]) return;
    
    const cartItem = {
      id: safeProduct.id,
      name: safeProduct.name,
      price: selectedVariant.price,
      variant: selectedVariant.name,
      variantId: selectedVariant.id,
      characteristics: selectedVariant.characteristics,
      quantity: quantity,
      image: selectedVariant.images[0]
    };
    
    console.log('Adding to cart:', cartItem);
    addToCart(cartItem);
    onClose();
  }, [addToCart, safeProduct, selectedVariant, quantity, onClose]);

  // Only render if we have at least one variant
  if (!safeVariants().length) return null;

  return (
    <Box sx={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      bgcolor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 10000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: { xs: 0, md: 4 }
    }}>
      <Box sx={{
        width: '100%',
        height: { xs: '100%', md: 'auto' },
        maxWidth: { md: '1200px' },
        maxHeight: { md: '90vh' },
        bgcolor: 'background.paper',
        borderRadius: { xs: 0, md: 2 },
        overflow: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: { xs: 8, md: 16 },
            top: { xs: 8, md: 16 },
            zIndex: 1,
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <Close />
        </IconButton>
        <Box sx={{ 
          flex: 1,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          p: { xs: 2, md: 2 }
        }}>
          <Grid container spacing={getResponsiveValue(responsiveStyles.grid.spacing)}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '100%',
                  overflow: 'hidden',
                  borderRadius: 2,
                  mb: 2
                }}
              >
                <img
                  src={selectedVariant?.images?.[currentIndex] || ''}
                  alt={`${safeProduct.name} - ${selectedVariant?.name}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <NavigationButtons
                  onPrev={handlePrevImage}
                  onNext={handleNextImage}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 2,
                    zIndex: 1
                  }}
                />
              </Box>
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                overflowX: 'auto',
                py: 1,
                '&::-webkit-scrollbar': {
                  height: 4
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 2
                }
              }}>
                {safeVariants().map((variant, variantIndex) => (
                  <Box key={variant.id} sx={{ display: 'flex', gap: 1 }}>
                    {variant.images.map((image, imageIndex) => {
                      const isSelected = selectedVariant.id === variant.id && currentIndex === imageIndex;
                      return (
                        <Box
                          key={`${variant.id}-${imageIndex}`}
                          onClick={() => {
                            setSelectedVariant(variant);
                            selectImage(imageIndex);
                          }}
                          sx={{
                            width: 80,
                            height: 80,
                            minWidth: 80,
                            borderRadius: 1,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: isSelected ? 'divider' : 'transparent',
                            transition: 'all 0.2s ease-in-out',
                            position: 'relative',
                            opacity: isSelected ? 1 : 0.6,
                            '&:hover': {
                              transform: 'scale(1.05)',
                              opacity: 1,
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.1)'
                              }
                            }
                          }}
                        >
                          <img
                            src={image}
                            alt={`${safeProduct.name} - ${variant.name} - ${imageIndex + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              filter: isSelected ? 'none' : 'brightness(0.9)'
                            }}
                          />
                          {isSelected && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
                              }}
                            />
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <Box>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    fontSize: { xs: '1.75rem', md: '2.125rem' }
                  }}>
                    {safeProduct.name}
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ 
                    fontWeight: 500,
                    mb: 2
                  }}>
                    {formatPrice(selectedVariant.price)}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    mb: 3
                  }}>
                    {safeProduct.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel id="dialog-variant-label" 
                        sx={{ 
                          color: 'text.secondary',
                          '&.Mui-focused': {
                            color: 'text.secondary'
                          }
                        }}
                      >
                        Variante
                      </InputLabel>
                      <Select
                        labelId="dialog-variant-label"
                        value={selectedVariant.id}
                        label="Variante"
                        onChange={handleVariantChange}
                        sx={{
                          '&:hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'primary.main',
                              borderWidth: '1px'
                            }
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'divider',
                            borderWidth: '1px'
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'divider',
                            borderWidth: '1px'
                          }
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: 200
                            }
                          },
                          disablePortal: true
                        }}
                      >
                        {safeVariants().map((variant) => (
                          <MenuItem key={variant.id} value={variant.id}>
                            {variant.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {selectedVariant.characteristics && Object.keys(selectedVariant.characteristics).length > 0 && (
                    <Box sx={{ 
                      mt: 3,
                      '& .MuiListItem-root': {
                        py: 0.25,
                        minHeight: '32px'
                      }
                    }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 500,
                        mb: 0.5,
                        color: 'text.primary',
                        position: 'relative',
                        top: '4px'
                      }}>
                        Características:
                      </Typography>
                      <CharacteristicsList characteristics={selectedVariant.characteristics} />
                    </Box>
                  )}
                </Box>

                <Box sx={{ 
                  mt: 'auto',
                  pt: 3,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Typography variant="body1" sx={{ 
                    minWidth: '80px',
                    color: 'text.secondary'
                  }}>
                    Cantidad:
                  </Typography>
                  <QuantitySelector
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                    sx={{
                      maxWidth: '120px',
                      '& input[type=number]': {
                        '-moz-appearance': 'textfield',
                        '&::-webkit-outer-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0
                        },
                        '&::-webkit-inner-spin-button': {
                          '-webkit-appearance': 'none',
                          margin: 0
                        }
                      },
                      '& .MuiInputBase-input': {
                        textAlign: 'center',
                        padding: '8px 0'
                      },
                      '& .MuiButtonBase-root': {
                        padding: '8px'
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    sx={{ 
                      flex: 1,
                      ml: 2,
                      py: 1.5,
                      fontWeight: 500,
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    Agregar al carrito
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;