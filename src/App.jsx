import { Route, Routes, useLocation } from 'react-router-dom';
import { routes } from './utils/routes';
import Home from './routes/Home';
import Header from './Components/Header';
import Administration from './routes/Administration';
import AddProduct from './routes/AddProduct';
import Footer from './Components/Footer';
import { ToastProvider } from './contexts/ToastContext';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/administration');

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col">
        {!isAdminRoute && <Header />}
        <div className={`flex-grow ${!isAdminRoute ? 'pt-20' : ''}`}>
          <Routes>
            <Route path={routes.base} element={<Home />} />
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.administration} element={<Administration />} />
          </Routes>
        </div>
        {!isAdminRoute && <Footer />}
      </div>
    </ToastProvider>
  );
}
