import { Routes, Route } from 'react-router-dom'; 
import { Box } from '@mui/material'; 
import { Home } from './components/Home';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import { About } from './components/About';
import Custom from './components/Custom';
import Contact from './components/Contact';
import FloatingButtons from './components/FloatingButtons';
import { FloatingButtonsProvider } from './context/FloatingButtonsContext';

function App() {
  return (
    <FloatingButtonsProvider>
      <Box sx={{ position: 'relative', minHeight: '100vh' }}> 
        <Navbar /> 
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <FloatingButtons /> 
      </Box>
    </FloatingButtonsProvider>
  );
}

export default App;  