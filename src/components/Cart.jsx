import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  TextField
} from '@mui/material';
import { Close, Delete, WhatsApp, Add, Remove } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

function Cart({ open, onClose }) {
  const { cart, removeFromCart, clearCart, getTotal, getWhatsAppMessage, updateQuantity } = useCart();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(getWhatsAppMessage());
    window.open(`https://wa.me/5491167924239?text=${message}`, '_blank');
  };

  const formatPrice = (price) => {
    return typeof price === 'string' ? price : `$${price.toFixed(2)}`;
  };

  const handleQuantityChange = (itemId, variantId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, variantId, newQuantity);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Carrito de Compras</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {cart.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
            El carrito está vacío
          </Typography>
        ) : (
          <>
            <List>
              {cart.map((item) => (
                <ListItem 
                  key={`${item.id}-${item.variantId}`} 
                  disableGutters
                  sx={{ 
                    py: 2,
                    px: 0,
                    '&:hover': {
                      backgroundColor: { xs: 'transparent', sm: 'action.hover' }
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 1,
                        flexShrink: 0
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {item.variant}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {formatPrice(item.price)}
                            </Typography>
                          </>
                        }
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          overflow: 'hidden',
                          '&:hover': {
                            borderColor: 'primary.main'
                          }
                        }}>
                          <IconButton
                            onClick={() => handleQuantityChange(item.id, item.variantId, item.quantity - 1)}
                            size="small"
                            sx={{ 
                              borderRadius: 0,
                              borderRight: '1px solid',
                              borderColor: 'divider',
                              '&:hover': {
                                bgcolor: 'action.hover'
                              }
                            }}
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, item.variantId, parseInt(e.target.value) || 1)}
                            type="number"
                            inputProps={{ 
                              min: 1,
                              style: { 
                                textAlign: 'center',
                                padding: '8px 0',
                                width: '40px',
                                MozAppearance: 'textfield',
                                WebkitAppearance: 'none',
                                margin: 0
                              }
                            }}
                            sx={{ 
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  border: 'none'
                                },
                                '&:hover fieldset': {
                                  border: 'none'
                                },
                              },
                              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0
                              }
                            }}
                          />
                          <IconButton
                            onClick={() => handleQuantityChange(item.id, item.variantId, item.quantity + 1)}
                            size="small"
                            sx={{ 
                              borderRadius: 0,
                              borderLeft: '1px solid',
                              borderColor: 'divider',
                              '&:hover': {
                                bgcolor: 'action.hover'
                              }
                            }}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => removeFromCart(item.id, item.variantId)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 2 }}>
              Total: ${getTotal().toFixed(2)}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<WhatsApp />}
                onClick={handleWhatsAppClick}
                fullWidth
              >
                Hacer Pedido por WhatsApp
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={clearCart}
                fullWidth
              >
                Vaciar Carrito
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

export default Cart;