import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Link,
  Paper,
  IconButton
} from '@mui/material';
import {
  Instagram,
  WhatsApp,
  Email,
  Phone
} from '@mui/icons-material';

function Contact() {
  return (
    <Box id="contact" sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container>
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
          Contacto
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom color="primary.main">
                ¡Conectemos!
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                Estoy disponible para responder tus consultas y ayudarte a encontrar
                la pieza perfecta para tu hogar.
              </Typography>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton
                  href="https://instagram.com/artes.mabe"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: 'transparent',
                    color: 'primary.main',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    '&:hover': { 
                      bgcolor: 'primary.dark',
                      color: 'white'
                    },
                    width: 48,
                    height: 48
                  }}
                >
                  <Instagram />
                </IconButton>

                <IconButton
                  href="https://wa.me/5491167924239"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: 'transparent',
                    color: 'primary.main',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    '&:hover': { 
                      bgcolor: 'primary.dark',
                      color: 'white'
                    },
                    width: 48,
                    height: 48
                  }}
                >
                  <WhatsApp />
                </IconButton>

                <IconButton
                  component={Link}
                  href="tel:+541167924239"
                  sx={{
                    bgcolor: 'transparent',
                    color: 'primary.main',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    '&:hover': { 
                      bgcolor: 'primary.dark',
                      color: 'white'
                    },
                    width: 48,
                    height: 48
                  }}
                >
                  <Phone />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Contact;