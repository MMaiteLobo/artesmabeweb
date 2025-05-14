import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  ImageList,
  ImageListItem
} from '@mui/material';
import { Message } from '@mui/icons-material';

function Custom() {
  const customImages = [
    {
      img: 'https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      title: 'Ejemplo de trabajo personalizado 1'
    },
    {
      img: 'https://images.pexels.com/photos/4946975/pexels-photo-4946975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      title: 'Ejemplo de trabajo personalizado 2'
    },
    {
      img: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      title: 'Ejemplo de trabajo personalizado 3'
    },
    {
      img: 'https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      title: 'Ejemplo de trabajo personalizado 4'
    }
  ];

  return (
    <Box id="custom" sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{ 
            mb: 6, 
            fontWeight: 'bold', 
            color: 'primary.main',
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
          Pedidos Personalizados
        </Typography>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" color="text.primary" gutterBottom>
              Diseños Únicos a tu Medida
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
              ¿Tienes una idea especial en mente? En Artes Mabe creamos piezas personalizadas 
              adaptadas a tus necesidades y preferencias. Cada proyecto es único y recibe 
              nuestra total atención y dedicación.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 4, color: 'text.secondary' }}>
              Proceso de Pedido:
            </Typography>
            
            <List>
              {[
                'Contáctanos con tu idea',
                'Discutimos detalles, materiales y medidas',
                'Enviamos presupuesto personalizado',
                'Comenzamos la creación de tu pieza única'
              ].map((step, index) => (
                <ListItem 
                  key={step} 
                  disableGutters
                  sx={{ 
                    py: 0.5,
                    px: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      cursor: 'default'
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold', mr: 1 }}>
                          {index + 1}.
                        </Box>
                        {step}
                      </Typography>
                    }
                    sx={{
                      '& .MuiListItemText-primary': {
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>

            <Button
              variant="contained"
              size="large"
              startIcon={<Message />}
              href="https://wa.me/5491167924239?text=¡Hola! Me gustaría solicitar un pedido personalizado. ¿Podrías ayudarme?"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                mt: 4,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              Solicitar Pedido Personalizado
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <ImageList
              sx={{
                width: '100%',
                height: 450,
                transform: 'translateZ(0)',
              }}
              rowHeight={220}
              gap={8}
              cols={2}
            >
              {customImages.map((item) => (
                <ImageListItem
                  key={item.img}
                  sx={{
                    overflow: 'hidden',
                    '& img': {
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      borderRadius: 8,
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Custom;