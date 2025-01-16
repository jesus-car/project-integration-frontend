import {useNavigate, useLocation} from "react-router-dom";
import {routes} from "../utils/routes.js";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import UserMenu from "./UserMenu";
import Button from "./Button.jsx";
import MobileMenu from "./MobileMenu.jsx";
import { useEffect, useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    const isHome = location.pathname === '/' || location.pathname === '/home';

    const goTo = (route) => {
        navigate(route);
    };

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header-container');
            if (isHome) {
                if (window.scrollY > 0) {
                    header.classList.add('scrolled');
                    setIsScrolled(true);
                } else {
                    header.classList.remove('scrolled');
                    setIsScrolled(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    return (
        <>
            <div className={`${
                isHome 
                ? 'fixed top-0 left-0 right-0 transition-all duration-300 header-transparent' 
                : 'fixed top-0 left-0 right-0 bg-base shadow-md'
            } z-50 py-2 px-4 md:px-8 lg:px-20 header-container`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center justify-center">
                        <img
                            onClick={() => goTo(routes.home)}
                            className={`cursor-pointer h-10 md:h-14 w-auto ${isHome && !isScrolled ? 'opacity-0' : ''}`}
                            src="/images/logo_primary_base.png"
                            alt="Logo"
                        />
                    </div>

                    {/* Menú para pantallas medianas y grandes */}
                    <div className="hidden md:block">
                        {user ? (
                            <UserMenu user={user} isScrolled={isScrolled} isHome={isHome}/>
                        ) : (
                            <div className={`flex items-center gap-4 ${isHome && !isScrolled ? 'opacity-0' : ''}`}>
                                <Button type="secondary"
                                        label="Registrarse"
                                        onClick={() => goTo(routes.register)}/>

                                <Button type="primary"
                                        label="Ingresar"
                                        onClick={() => goTo(routes.login)}/>
                            </div>
                        )}
                    </div>

                    {/* Botón de menú hamburguesa para móviles */}
                    <button 
                        className={`md:hidden transition-opacity duration-300 ${isHome && !isScrolled ? 'opacity-0' : ''}`}
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menú móvil */}
            <MobileMenu 
                user={user}
                goTo={goTo}
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </>
    );
};

export default Header;
