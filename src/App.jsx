import {Route, Routes, useLocation} from 'react-router-dom';
import {routes} from './utils/routes';
import Home from './routes/Home';
import PropertiesList from './routes/Properties'
import Header from './Components/Header';
import Administration from './routes/Administration';
import Footer from './Components/Footer';
import {ToastProvider} from './contexts/ToastContext';
import ProductDetails from './Components/ProductDetails';
import {ProductProvider} from './context/ProductContext';
import Login from "./routes/Login.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import Forbidden from "./routes/Forbidden.jsx";
import RegistrerUser from './Components/RegistrerUser.jsx';
import ScrollToTop from './Components/ScrollToTop';
import MyBookings from "./routes/MyBookings.jsx";
import Favorites from './Components/Favorites.jsx';

export default function App() {
    const location = useLocation();
    const isHome = location.pathname === '/' || location.pathname === '/home' || location.pathname === '/login' || location.pathname === '/register';
    
    // Define rutas que deben ocultar Header y Footer
    const noLayoutRoutes = [
        routes.administration,
        routes.administrationHome,
        routes.login,
        routes.register,
        routes.forbidden
    ];

    // Verifica si la ruta actual requiere layout o no
    const shouldHideLayout = noLayoutRoutes.some(route => location.pathname.startsWith(route));


    return (
        <ProductProvider>
            <ToastProvider>
                <div className="min-h-screen flex flex-col">
                    <ScrollToTop />
                    {!shouldHideLayout && <Header/>}
                    <div className={`flex-grow ${isHome ? 'home-content' : 'main-content'}`} >
                        <Routes>
                            <Route path={routes.login} element={<Login/>}/>
                            <Route path={routes.register} element={<RegistrerUser/>}/>
                            <Route path={routes.home} element={<Home/>}/>
                            <Route path={routes.base} element={<Home/>}/>
                            <Route path={routes.properties} element={<PropertiesList/>}/>
                            <Route path="/properties/:id" element={<ProductDetails/>}/>
                            <Route path={routes.forbidden} element={<Forbidden/>}/>

                            {/* Agrupación de rutas protegidas */}
                            <Route element={<ProtectedRoutes allowedRoles={["ROLE_ADMIN", "ROLE_OWNER"]} />}>
                                <Route path={routes.administration} element={<Administration/>}/>
                                <Route path={routes.myBookings} element={<MyBookings/>}/>
                                {/* Agrega más rutas protegidas */}
                            </Route>
                            <Route path={routes.favs} element={<Favorites />} />

                        </Routes>
                    </div>
                    {!shouldHideLayout && <Footer/>}
                </div>
            </ToastProvider>
        </ProductProvider>
    );
}
