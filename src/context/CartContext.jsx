import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.id && item.variantId === product.variantId
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.variantId === product.variantId
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevCart, product];
    });
    setShowNotification(true);
  };

  const removeFromCart = (productId, variantId) => {
    setCart(prevCart => 
      prevCart.filter(item => !(item.id === productId && item.variantId === variantId))
    );
  };

  const updateQuantity = (productId, variantId, newQuantity) => {
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === productId && item.variantId === variantId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price.replace('$', '')) 
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getWhatsAppMessage = () => {
    const items = cart.map(item => {
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price.replace('$', '')) 
        : item.price;
      return `- ${item.quantity}x ${item.name} ($${(price * item.quantity).toFixed(2)})`;
    }).join('\n');
    const total = getTotal();
    return `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${items}\n\nTotal: $${total.toFixed(2)}`;
  };

  const hideNotification = () => {
    setShowNotification(false);
  };

  return (
    <CartContext.Provider value={{
      cart,
      showNotification,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
      getWhatsAppMessage,
      hideNotification
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}