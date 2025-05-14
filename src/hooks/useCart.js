import { useState, useCallback } from 'react';

export const useCart = () => {
  const [items, setItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const addToCart = useCallback((item) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => 
        i.id === item.id && i.variant.id === item.variant.id
      );

      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && i.variant.id === item.variant.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prevItems, item];
    });
    setShowNotification(true);
  }, []);

  const removeFromCart = useCallback((itemId, variantId) => {
    setItems(prevItems => 
      prevItems.filter(i => !(i.id === itemId && i.variant.id === variantId))
    );
  }, []);

  const updateQuantity = useCallback((itemId, variantId, quantity) => {
    setItems(prevItems =>
      prevItems.map(i =>
        i.id === itemId && i.variant.id === variantId
          ? { ...i, quantity }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
  }, [items]);

  const hideNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  return {
    items,
    showNotification,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    hideNotification
  };
}; 