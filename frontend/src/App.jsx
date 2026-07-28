import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Customize from './pages/Customize';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminProducts from './pages/AdminProducts';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminReviews from './pages/AdminReviews';
import AdminStats from './pages/AdminStats';
import AdminCustomization from './pages/AdminCustomization';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/add-product" element={<AdminAddProduct />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/stats" element={<AdminStats />} />
          <Route path="/admin/customization" element={<AdminCustomization />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;