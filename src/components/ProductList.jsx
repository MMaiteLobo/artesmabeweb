import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import ProductCard from './ProductCard';
import { formatPrice } from '../utils/formatters';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../context/CartContext';

// Constantes para reutilización
const CATEGORIES = {
  TODOS: 'todos',
  MANTAS: 'mantas',
  TAPICES: 'tapices',
  ALFOMBRAS: 'alfombras',
  FRASCOS: 'frascos',
  INDIVIDUALES: 'individuales',
  GORROS: 'gorros',
  PORTAMACETAS: 'portamacetas',
  LLAVEROS: 'llaveros',
  SEÑALADORES: 'señaladores'
};

const CATEGORY_ORDER = [
  CATEGORIES.TODOS,
  CATEGORIES.ALFOMBRAS,
  CATEGORIES.FRASCOS,
  CATEGORIES.GORROS,
  CATEGORIES.INDIVIDUALES,
  CATEGORIES.LLAVEROS,
  CATEGORIES.MANTAS,
  CATEGORIES.PORTAMACETAS,
  CATEGORIES.SEÑALADORES,
  CATEGORIES.TAPICES
];

// Configuración de productos
const PRODUCT_CONFIG = {
  IMAGE_BASE_URL: 'https://images.pexels.com/photos/',
  DEFAULT_IMAGE: '4846097/pexels-photo-4846097.jpeg',
  MATERIALS: {
    YUTE: 'Yute Natural',
    LANA: 'Lana Merino',
    MERINO: 'Lana Merino 100% Natural',
    PREMIUM: 'Lana Merino Premium'
  }
};

const productData = [
  {
    id: 1,
    name: "Manta de Lana Natural",
    description: "Manta tejida a mano con lana 100% natural, perfecta para las noches frías.",
    image: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg",
    category: CATEGORIES.MANTAS,
    basePrice: 8500,
    variants: [
      {
        id: "1-1",
        name: "Lana Merino Natural",
        image: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg",
        price: 8500,
        characteristics: {
          Material: PRODUCT_CONFIG.MATERIALS.MERINO,
          Color: "Crudo",
          Medidas: "130x180cm"
        }
      },
      {
        id: "1-2",
        name: "Lana Merino Gris",
        image: "https://images.pexels.com/photos/4271568/pexels-photo-4271568.jpeg",
        price: 85.00,
        characteristics: {
          Material: "Lana Merino 100% Natural",
          Color: "Gris",
          Medidas: "130x180cm"
        }
      },
      {
        id: "1-3",
        name: "Lana Merino Premium",
        image: "https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
        price: 95.00,
        characteristics: {
          Material: "Lana Merino Premium",
          Color: "Beige",
          Medidas: "150x200cm"
        }
      }
    ]
  },
  {
    id: 2,
    name: "Tapiz Bohemio",
    description: "Tapiz tejido a mano con diseños étnicos y colores vibrantes.",
    image: "https://images.pexels.com/photos/4946975/pexels-photo-4946975.jpeg",
    category: CATEGORIES.TAPICES,
    basePrice: 12000,
    variants: [
      {
        id: "2-1",
        name: "Diseño Geométrico",
        image: "https://images.pexels.com/photos/4946975/pexels-photo-4946975.jpeg",
        price: 12000,
        characteristics: {
          Material: `${PRODUCT_CONFIG.MATERIALS.LANA} y Algodón`,
          Color: "Multicolor",
          Medidas: "100x150cm"
        }
      },
      {
        id: "2-2",
        name: "Diseño Étnico",
        image: "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
        price: 160.00,
        characteristics: {
          Material: "Algodón y Lana",
          Color: "Tierra",
          Medidas: "120x180cm"
        }
      }
    ]
  },
  {
    id: 3,
    name: "Alfombra de Yute",
    description: "Alfombra tejida a mano con yute natural, ideal para dar calidez a tu hogar.",
    image: "https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg",
    category: CATEGORIES.ALFOMBRAS,
    basePrice: 25000,
    variants: [
      {
        id: "3-1",
        name: "Natural Redonda",
        image: "https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg",
        price: 25000,
        characteristics: {
          Material: PRODUCT_CONFIG.MATERIALS.YUTE,
          Forma: "Redonda",
          Diámetro: "120cm"
        }
      },
      {
        id: "3-2",
        name: "Natural Rectangular",
        image: "https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
        price: 200.00,
        characteristics: {
          Material: "Yute Natural",
          Forma: "Rectangular",
          Medidas: "160x230cm"
        }
      }
    ]
  },
  {
    id: 4,
    name: "Frascos Decorados con Yute",
    description: "Frascos decorados con yute y detalles artesanales, perfectos para decoración.",
    image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
    category: CATEGORIES.FRASCOS,
    basePrice: 1500,
    variants: [
      {
        id: "4-1",
        name: "Frascos Pequeños",
        image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
        price: 1500,
        characteristics: {
          Material: `Vidrio y ${PRODUCT_CONFIG.MATERIALS.YUTE}`,
          Tamaño: "Pequeño",
          Altura: "15cm"
        }
      },
      {
        id: "4-2",
        name: "Frascos Medianos",
        image: "https://images.pexels.com/photos/4946975/pexels-photo-4946975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
        price: 55.00,
        characteristics: {
          Material: "Vidrio y Yute",
          Tamaño: "Mediano",
          Altura: "25cm"
        }
      }
    ]
  },
  {
    id: 5,
    name: "Individuales de Yute",
    description: "Individuales tejidos a mano con yute natural, perfectos para tu mesa.",
    image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
    category: CATEGORIES.INDIVIDUALES,
    basePrice: 1200,
    variants: [
      {
        id: "5-1",
        name: "Set de 4 Individuales",
        image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
        price: 1200,
        characteristics: {
          Material: PRODUCT_CONFIG.MATERIALS.YUTE,
          Cantidad: "4 unidades",
          Medidas: "30x30cm"
        }
      }
    ]
  },
  {
    id: 6,
    name: "Gorro de Lana",
    description: "Gorro tejido a mano con lana natural, ideal para el invierno.",
    image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
    category: CATEGORIES.GORROS,
    basePrice: 2500,
    variants: [
      {
        id: "6-1",
        name: "Gorro Clásico",
        image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
        price: 2500,
        characteristics: {
          Material: PRODUCT_CONFIG.MATERIALS.LANA,
          Color: "Natural",
          Talla: "Única"
        }
      }
    ]
  },
  {
    id: 7,
    name: "Portamacetas de Yute",
    description: "Portamacetas tejidos a mano con yute natural, perfectos para tus plantas.",
    image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
    category: CATEGORIES.PORTAMACETAS,
    basePrice: 1800,
    variants: [
      {
        id: "7-1",
        name: "Portamacetas Pequeño",
        image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
        price: 1800,
        characteristics: {
          Material: PRODUCT_CONFIG.MATERIALS.YUTE,
          Tamaño: "Pequeño",
          Diámetro: "15cm"
        }
      }
    ]
  },
  {
    id: 8,
    name: "Llaveros de Yute",
    description: "Llaveros artesanales tejidos con yute natural y detalles únicos.",
    image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
    category: CATEGORIES.LLAVEROS,
    basePrice: 800,
    variants: [
      {
        id: "8-1",
        name: "Llavero Simple",
        image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
        price: 800,
        characteristics: {
          Material: PRODUCT_CONFIG.MATERIALS.YUTE,
          Diseño: "Simple",
          Largo: "10cm"
        }
      }
    ]
  },
  {
    id: 9,
    name: "Señaladores de Yute",
    description: "Señaladores tejidos a mano con yute natural, perfectos para tus libros.",
    image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
    category: CATEGORIES.SEÑALADORES,
    basePrice: 600,
    variants: [
      {
        id: "9-1",
        name: "Señalador Simple",
        image: `${PRODUCT_CONFIG.IMAGE_BASE_URL}${PRODUCT_CONFIG.DEFAULT_IMAGE}`,
        price: 600,
        characteristics: {
          Material: PRODUCT_CONFIG.MATERIALS.YUTE,
          Diseño: "Simple",
          Largo: "15cm"
        }
      }
    ]
  }
];

function ProductList() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.TODOS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { showNotification, hideNotification } = useCart();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && CATEGORY_ORDER.includes(category)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = selectedCategory === CATEGORIES.TODOS
    ? productData
    : productData.filter(product => product.category === selectedCategory);

  return (
    <Box sx={{ py: { xs: 12, md: 15 }, bgcolor: 'background.default' }}>
      <Container>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 'bold', color: 'text.primary' }}
        >
          Nuestros Productos
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 6,
          width: '100%'
        }}>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={handleCategoryChange}
            aria-label="categorías de productos"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: 'center',
              maxWidth: '100%',
              '& .MuiToggleButton-root': {
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                  bgcolor: 'rgba(153, 112, 38, 0.1)',
                  borderColor: 'primary.main'
                },
                '&.Mui-selected': {
                  bgcolor: '#997026',
                  color: 'white',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  borderColor: 'primary.main',
                  '&:hover': {
                    bgcolor: '#997026',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.25)'
                  }
                }
              }
            }}
          >
            {CATEGORY_ORDER.map((category) => (
              <ToggleButton 
                key={category} 
                value={category}
                sx={{
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                  minWidth: '120px',
                  px: 3,
                  py: 1,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'primary.dark',
                  borderColor: 'primary.main',
                  '&.Mui-selected': {
                    color: 'white',
                    bgcolor: 'primary.dark',
                    '&:hover': {
                      bgcolor: 'primary.dark'
                    }
                  },
                  '&:hover': {
                    bgcolor: 'rgba(153, 112, 38, 0.1)'
                  }
                }}
              >
                {category}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card 
                onClick={() => handleProductClick(product)}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.3s ease-in-out'
                    }
                  }
                }}
              >
                <Box sx={{ 
                  position: 'relative',
                  width: '100%',
                  paddingTop: '100%',
                  overflow: 'hidden'
                }}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                  />
                </Box>
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 3,
                  bgcolor: 'background.paper',
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Box>
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="div"
                      sx={{
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                        minHeight: '2.6em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: 'text.primary',
                        mb: 1.5
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        fontSize: '0.9rem',
                        lineHeight: 1.5,
                        minHeight: '4.5em',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        opacity: 0.8,
                        mb: 2
                      }}
                    >
                      {product.description}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="h6" 
                    color="primary" 
                    sx={{ 
                      mt: 2,
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.5,
                      textAlign: 'center',
                      bgcolor: 'rgba(153, 112, 38, 0.05)',
                      p: 1.5,
                      borderRadius: 1
                    }}
                  >
                    <Box component="span" sx={{ 
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      opacity: 0.8
                    }}>
                      Desde
                    </Box>
                    {formatPrice(product.basePrice)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: 2,
              overflow: 'hidden',
              maxHeight: '90vh',
              bgcolor: 'background.paper'
            }
          }}
          PaperProps={{
            sx: {
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid',
              borderColor: 'divider'
            }
          }}
        >
          {selectedProduct && (
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={handleCloseDialog}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  zIndex: 1,
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
              <ProductCard product={selectedProduct} onClose={handleCloseDialog} />
            </Box>
          )}
        </Dialog>

        <Snackbar
          open={showNotification}
          autoHideDuration={3000}
          onClose={hideNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ 
            '& .MuiSnackbar-root': {
              top: '24px',
              zIndex: 9999
            }
          }}
        >
          <Alert 
            onClose={hideNotification} 
            severity="success" 
            sx={{ 
              width: '100%',
              boxShadow: 3,
              '& .MuiAlert-message': {
                fontSize: '1rem',
                fontWeight: 500
              }
            }}
          >
            Producto agregado al carrito
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default ProductList;