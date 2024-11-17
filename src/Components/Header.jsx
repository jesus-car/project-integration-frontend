import {useNavigate, useLocation} from "react-router-dom";
import {routes} from "../utils/routes.js";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import UserMenu from "./UserMenu";
import Button from "./Button.jsx";
import { useEffect } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const location = useLocation();
    
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
                } else {
                    header.classList.remove('scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    return (
        <div className={`${
            isHome 
            ? 'fixed top-0 left-0 right-0 transition-all duration-300 header-transparent' 
            : 'fixed top-0 left-0 right-0 bg-base shadow-md'
        } z-50 py-2 px-20 header-container`}>
            <div className="flex justify-between">
                <div className="flex items-center justify-center">
                    <img
                        onClick={() => goTo(routes.home)}
                        className={`cursor-pointer h-14 w-auto ${isHome ? 'opacity-0' : ''}`}
                        src="/images/logo_primary_base.png"
                        alt="Logo"
                    />
                </div>

                {user ? (
                    <UserMenu user={user}/>
                ) : (
                    <div className={`flex items-center gap-4 ${isHome ? 'opacity-0' : ''}`}>
                        <Button type="secondary"
                                label="Registrarse"
                                onClick={() => goTo(routes.register)}/>

                        <Button type="primary"
                                label="Ingresar"
                                onClick={() => goTo(routes.login)}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
