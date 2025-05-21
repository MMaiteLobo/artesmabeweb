import React, { createContext, useContext, useState } from 'react';

const FloatingButtonsContext = createContext();

export const FloatingButtonsProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <FloatingButtonsContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </FloatingButtonsContext.Provider>
  );
};

export const useFloatingButtons = () => {
  const context = useContext(FloatingButtonsContext);
  if (!context) {
    throw new Error('useFloatingButtons must be used within a FloatingButtonsProvider');
  }
  return context;
}; 