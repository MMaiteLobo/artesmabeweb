import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; /*Permite la navegación entre las páginas*/
import { ThemeProvider } from '@mui/material/styles'; /*Aplica un tema global de Material UI*/
import CssBaseline from '@mui/material/CssBaseline'; /*Resetea los estilos por defecto del navegador*/
import App from './App'; /*Componente principal de la aplicación*/
import { theme } from './theme'; /*Objeto de configuración de Material UI*/
import { CartProvider } from './context/CartContext'; /*Contexto para manejar el carrito*/
import './index.css'; /*Estilos globales personalizados*/

/*Arbol de componentes renderizados:*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <BrowserRouter> 
      <ThemeProvider theme={theme}> 
        <CartProvider> 
          <CssBaseline /> 
          <App />  
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);