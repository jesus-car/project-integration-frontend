import { Route, Routes, useLocation } from 'react-router-dom';
import { routes } from './utils/routes';
import Home from './routes/Home';
import PropertiesList from './routes/Properties'
import Header from './Components/Header';
import Administration from './routes/Administration';
import Footer from './Components/Footer';
import { ToastProvider } from './contexts/ToastContext';
import ProductDetails from './Components/ProductDetails';
import { ProductProvider } from './context/ProductContext';
import Login from "./routes/Login.jsx";

export default function App() {
  const location = useLocation();
  // Define rutas que deben ocultar Header y Footer
  const noLayoutRoutes = [routes.administration, routes.login];

  // Verifica si la ruta actual requiere layout o no
  const shouldHideLayout = noLayoutRoutes.some(route => location.pathname.startsWith(route));


  return (
      <ProductProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col">
            {!shouldHideLayout && <Header />}
            <div className={`flex-grow ${!shouldHideLayout ? 'pt-20' : ''}`}>
              <Routes>
                <Route path={routes.base} element={<Home />} />
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.properties} element={<PropertiesList />} />
                <Route path="/properties/:id" element={<ProductDetails />} />
                <Route path={routes.administration} element={<Administration />} />
                <Route path={routes.login} element={<Login />} />
              </Routes>
            </div>
            {!shouldHideLayout && <Footer />}
          </div>
        </ToastProvider>
      </ProductProvider>
  );
}
