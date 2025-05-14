import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'mantas',
    name: 'Mantas',
    description: 'Mantas tejidas a mano con materiales naturales',
    image: 'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 'tapices',
    name: 'Tapices',
    description: 'Tapices decorativos con diseños únicos',
    image: 'https://images.pexels.com/photos/4946975/pexels-photo-4946975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 'alfombras',
    name: 'Alfombras',
    description: 'Alfombras tejidas con materiales naturales',
    image: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  },
  {
    id: 'frascos',
    name: 'Frascos',
    description: 'Frascos decorados con técnicas artesanales',
    image: 'https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750'
  }
];

export const ProductCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <Box 
      id="products" 
      sx={{ 
        py: 10, 
        bgcolor: 'background.paper',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(241,242,235,0.95) 0%, rgba(231,232,225,0.98) 100%)',
          zIndex: 0,
        }
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{ 
            mb: 6, 
            fontWeight: 'bold', 
            color: 'text.primary',
            fontSize: { xs: '3rem', md: '4rem' },
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              backgroundColor: 'primary.main',
              borderRadius: '2px'
            }
          }}
        >
          Nuestros Productos
        </Typography>

        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={3}>
              <Card 
                onClick={() => handleCategoryClick(category.id)}
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.1)',
                      filter: 'brightness(0.9)'
                    },
                    '& .MuiCardContent-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      transform: 'translateY(0)'
                    }
                  }
                }}
              >
                <Box sx={{ position: 'relative', paddingTop: '100%' }}>
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.name}
                  sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    transition: 'all 0.5s ease-in-out',
                    filter: 'brightness(0.8)'
                  }}
                />
                </Box>
                <CardContent
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    transform: { 
                      xs: 'translateY(0)',
                      md: 'translateY(100%)'
                    },
                    transition: 'all 0.3s ease-in-out',
                    backdropFilter: 'blur(5px)',
                    '&:hover': {
                      transform: 'translateY(0)'
                    }
                  }}
                >
                  <Typography gutterBottom variant="h5" component="h3" color="primary.main">
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="h4"
          align="center"
          sx={{ 
            mt: 6,
            color: 'primary.main',
            fontStyle: 'italic',
            fontWeight: 'light',
            opacity: 0.8,
            cursor: 'pointer',
            '&:hover': {
              opacity: 1,
              color: 'primary.dark'
            }
          }}
          onClick={() => navigate('/products')}
        >
          ... y mucho más!
        </Typography>
      </Container>
    </Box>
  );
}; 