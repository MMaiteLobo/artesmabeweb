import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  useScrollTrigger,
  Badge,
  Menu,
  MenuItem
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, ShoppingCart } from '@mui/icons-material';
import Cart from './Cart';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo-mabe.svg';

const mainNavItems = ['Inicio', 'Productos'];
const subMenuItems = ['Sobre mí', 'Nuestros productos', 'Personalizados', 'Contacto'];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = (section) => {
    scrollToSection(section);
    setMobileOpen(false);
  };

  const handleMenuOpen = (event) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    const timeout = setTimeout(() => {
      setAnchorEl(null);
    }, 200);
    setCloseTimeout(timeout);
  };

  const scrollToSection = (section) => {
    if (location.pathname === '/') {
      const sectionId = section === 'Inicio' ? 'home' :
                       section === 'Sobre mí' ? 'about' :
                       section === 'Nuestros productos' ? 'products' :
                       section === 'Personalizados' ? 'custom' : 'contact';
      
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64; // Altura del navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setMobileOpen(false);
        handleMenuClose();
      }
    } else {
      navigate('/', { state: { scrollTo: section } });
    }
  };

  const handleProductsClick = () => {
    navigate('/products');
  };

  return (
    <>
    <AppBar
      position="fixed"
      sx={{
          bgcolor: location.pathname === '/' 
            ? (trigger ? 'background.paper' : 'transparent')
            : (trigger ? 'background.paper' : 'background.default'),
          boxShadow: trigger ? 1 : 0,
          transition: 'box-shadow 0.05s ease-in',
          zIndex: 1100
        }}
      >
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Box
                component="img"
                src={logo}
                alt="Artes Mabe"
                sx={{
                  height: 40,
                  width: 'auto',
                  mr: 2
                }}
              />
          <Typography
            variant="h6"
            component="div"
                sx={{ 
                  flexGrow: 1,
                  color: 'primary.main',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.dark'
                  }
                }}
                onClick={() => scrollToSection('Inicio')}
          >
            Artes Mabe
          </Typography>
        </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
              <Box
                onMouseEnter={handleMenuOpen}
                onMouseLeave={handleMenuClose}
                sx={{ position: 'relative' }}
              >
                <Button
              sx={{
                    color: location.pathname === '/' ? 'primary.main' : 'text.primary',
                    '&:hover': { 
                      color: 'primary.main',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      padding: '8px 24px'
                    },
                    width: '80px',
                    padding: '8px 16px',
                    textTransform: 'none',
                    fontSize: '1rem',
                fontWeight: 500,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&::after': location.pathname === '/' ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '2px',
                      backgroundColor: 'primary.main',
                      borderRadius: '1px'
                    } : {}
                  }}
                >
                  Inicio
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    onMouseEnter: () => clearTimeout(closeTimeout),
                    onMouseLeave: handleMenuClose
                  }}
                  sx={{ 
                    mt: 1,
                    '& .MuiPaper-root': {
                      minWidth: '180px',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      padding: '4px 0',
                      position: 'fixed',
                      zIndex: 1201
                    }
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  disableScrollLock
                >
                  {subMenuItems.map((item) => (
                    <MenuItem 
                      key={item} 
                      onClick={() => scrollToSection(item)}
                      sx={{
                        padding: '8px 16px',
                        fontSize: '0.95rem',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          color: 'primary.main'
                        },
                        '&:active': {
                          backgroundColor: 'rgba(0, 0, 0, 0.08)'
                        }
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Button
                onClick={handleProductsClick}
                sx={{ 
                  color: location.pathname === '/products' ? 'primary.main' : 'text.primary',
                  '&:hover': { 
                    color: 'primary.main',
                    backgroundColor: 'transparent'
                  },
                  width: '80px',
                  padding: '8px 16px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&::after': location.pathname === '/products' ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '2px',
                    backgroundColor: 'primary.main',
                    borderRadius: '1px'
                  } : {}
                }}
              >
                Productos
              </Button>
              <IconButton
                onClick={() => setCartOpen(true)}
                sx={{ 
                  color: 'text.primary',
                  '&:hover': { 
                    color: 'primary.main',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  },
                  marginLeft: 2
                }}
              >
                <Badge badgeContent={cartItemCount} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
        </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
              <IconButton
                onClick={() => setCartOpen(true)}
                sx={{ color: 'text.primary' }}
              >
                <Badge badgeContent={cartItemCount} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
      </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            bgcolor: 'background.paper',
            zIndex: 1200
          }
        }}
      >
        <List>
          <ListItem 
            onClick={() => handleMenuItemClick('Inicio')} 
            sx={{ 
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                '& .MuiListItemText-primary': {
                  color: 'primary.dark'
                }
              }
            }}
          >
            <ListItemText 
              primary="Inicio" 
              primaryTypographyProps={{
                sx: {
                  color: 'primary.main',
                  fontWeight: 500,
                  transition: 'color 0.3s'
                }
              }}
            />
          </ListItem>
          <ListItem 
            onClick={() => handleMenuItemClick('Sobre mí')} 
            sx={{ 
              pl: 4,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                '& .MuiListItemText-primary': {
                  color: 'primary.main'
                }
              }
            }}
          >
            <ListItemText 
              primary="Sobre mí" 
              primaryTypographyProps={{
                sx: {
                  color: 'text.primary',
                  transition: 'color 0.3s'
                }
              }}
            />
          </ListItem>
          <ListItem 
            onClick={() => handleMenuItemClick('Nuestros productos')} 
            sx={{ 
              pl: 4,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                '& .MuiListItemText-primary': {
                  color: 'primary.main'
                }
              }
            }}
          >
            <ListItemText 
              primary="Nuestros productos" 
              primaryTypographyProps={{
                sx: {
                  color: 'text.primary',
                  transition: 'color 0.3s'
                }
              }}
            />
          </ListItem>
          <ListItem 
            onClick={() => handleMenuItemClick('Personalizados')} 
            sx={{ 
              pl: 4,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                '& .MuiListItemText-primary': {
                  color: 'primary.main'
                }
              }
            }}
          >
            <ListItemText 
              primary="Personalizados" 
              primaryTypographyProps={{
                sx: {
                  color: 'text.primary',
                  transition: 'color 0.3s'
                }
              }}
            />
          </ListItem>
          <ListItem 
            onClick={() => handleMenuItemClick('Contacto')} 
            sx={{ 
              pl: 4,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                '& .MuiListItemText-primary': {
                  color: 'primary.main'
                }
              }
            }}
          >
            <ListItemText 
              primary="Contacto" 
              primaryTypographyProps={{
                sx: {
                  color: 'text.primary',
                  transition: 'color 0.3s'
                }
              }}
            />
          </ListItem>
          <ListItem 
            onClick={() => {
              handleProductsClick();
              setMobileOpen(false);
            }} 
            sx={{ 
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                '& .MuiListItemText-primary': {
                  color: 'primary.dark'
                }
              }
            }}
          >
            <ListItemText 
              primary="Productos" 
              primaryTypographyProps={{
                sx: {
                  color: 'primary.main',
                  fontWeight: 500,
                  transition: 'color 0.3s'
                }
              }}
            />
          </ListItem>
        </List>
      </Drawer>

      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Navbar;