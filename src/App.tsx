import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ToastStack } from './components/ToastStack/ToastStack';
import { Home } from './pages/Home/Home';
import { Shop } from './pages/Shop/Shop';
import { ProductDetails } from './pages/ProductDetails/ProductDetails';
import { Cart } from './pages/Cart/Cart';
import { Favorites } from './pages/Favorites/Favorites';
import { NotFound } from './pages/NotFound/NotFound';

/** Scrolls to top on every route change so navigating never leaves the
 *  visitor stranded halfway down the previous page. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastStack />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <CartProvider>
            <ToastProvider>
              <BrowserRouter>
                <ScrollToTop />
                <AppShell />
              </BrowserRouter>
            </ToastProvider>
          </CartProvider>
        </FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
