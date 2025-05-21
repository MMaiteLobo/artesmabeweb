import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

export const About = () => {
  return (
    <Box id="about" sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/foto.JPG"
              alt="Artesana Mabe"
              sx={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h2"
              sx={{ 
                mb: 4, 
                fontWeight: 'bold', 
                color: 'primary.main',
                fontSize: { xs: '3rem', md: '4rem' },
                position: 'relative',
                textAlign: { xs: 'center', md: 'left' },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: { xs: '50%', md: 0 },
                  transform: { xs: 'translateX(-50%)', md: 'none' },
                  width: '80px',
                  height: '4px',
                  backgroundColor: 'primary.main',
                  borderRadius: '2px'
                }
              }}
            >
              Sobre mí
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              Soy una artesana apasionada por el arte textil. Cada pieza que creo está hecha con amor y dedicación, utilizando técnicas tradicionales y materiales naturales de la más alta calidad.
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              Mi objetivo es preservar las técnicas artesanales mientras creo piezas únicas y modernas que aporten calidez y estilo a tu hogar.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 