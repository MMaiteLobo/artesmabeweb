import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack,
  IconButton,
  useScrollTrigger
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { About } from './About';
import { ProductCategories } from './ProductCategories';
import Custom from './Custom';
import Contact from './Contact';
import mobileBg from '../assets/home_fondo1-mobile.png';
import desktopBg from '../assets/home_fondo1-desktop.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from './Footer';
import { useEffect } from 'react';

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo === 'Inicio' ? 'home' :
                       location.state.scrollTo === 'Sobre mí' ? 'about' :
                       location.state.scrollTo === 'Nuestros productos' ? 'products' :
                       location.state.scrollTo === 'Personalizados' ? 'custom' : 'contact';
      
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [location.state]);

  return (
    <>
      <Box
        id="home"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          pt: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: {
              xs: `url(${mobileBg})`,
              md: `url(${desktopBg})`,
            },
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
          }
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 1, py: 8 }}>
          <Box maxWidth="md" mx="auto" textAlign="center">
            <Typography 
              variant="h1" 
              component="h1"
              sx={{ 
                mb: 2,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '4.5rem', lg: '5rem' },
                fontWeight: 'bold',
                color: 'text.primary',
                textAlign: 'center',
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
              Artes Mabe
              <Typography
                component="span"
                display="block"
                color="primary.main"
                sx={{ 
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '4rem', lg: '4.5rem' },
                  mt: 1,
                  textAlign: 'center'
                }}
              >
                Tejidos Artesanales
              </Typography>
            </Typography>

            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                textAlign: 'center',
                px: { xs: 2, md: 0 }
              }}
            >
              Creamos piezas únicas hechas a mano con amor y dedicación,
              usando materiales naturales y técnicas tradicionales
              para darle calidez a tu hogar.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/products')}
                sx={{ 
                  px: 4,
                  width: { xs: '100%', sm: 'auto' },
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                Ver Productos
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="https://instagram.com/artes.mabe"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  px: 4,
                  width: { xs: '100%', sm: 'auto' },
                  borderColor: 'primary.main',
                  color: 'black',
                  background: 'linear-gradient(135deg, rgba(241,242,235,0.95) 0%, rgba(231,232,225,0.98) 100%)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  '&:hover': { 
                    borderColor: 'primary.dark',
                    color: 'primary.dark',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }
                }}
              >
                Seguinos en Instagram
              </Button>
            </Stack>
          </Box>
        </Container>

        <IconButton
          onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
          sx={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'primary.main',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
              '50%': { transform: 'translateX(-50%) translateY(10px)' }
            }
          }}
        >
          <KeyboardArrowDown />
        </IconButton>
      </Box>
      <About />
      <ProductCategories />
      <Custom />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
