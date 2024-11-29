import { useState } from 'react';
import { routes } from "../utils/routes.js";
import Button from "./Button.jsx";
import { useAuthContext } from '../contexts/AuthContext.jsx';
import { AiTwotoneHeart } from "react-icons/ai";

const MobileMenu = ({ user, goTo, isOpen, onClose }) => {
    const getRoleDescription = (roleName) => {
        switch (roleName) {
            case 'ROLE_ADMIN':
                return 'Administrador';
            case 'ROLE_USER':
                return 'Usuario';
            case 'ROLE_OWNER':
                return 'Propietario';
            default:
                return 'Usuario';
        }
    };

    const handleNavigation = (route) => {
        onClose();
        setTimeout(() => {
            goTo(route); 
        }, 300);
    }
    
    const {logout} = useAuthContext();
    const handleLogout = () => {
        logout();
        handleNavigation("/login");
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
            <div className={`fixed right-0 top-0 h-full xs:w-[320px] w-[320px] bg-base shadow-lg transform transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-primaryHover hover:text-primary transition-colors"
                >
                    <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <div className="flex flex-col h-full">
                    {!user ? (
                        <div className="flex flex-col gap-4 p-8">
                            <img className="w-16 mb-4" src='/public/images/logo_primary_base.png' alt="Roomly" />
                            <Button 
                                type="secondary"
                                label="Registrarse"
                                onClick={() => handleNavigation(routes.register)}
                                className="w-full shadow-sm"
                            />
                            <Button 
                                type="primary"
                                label="Ingresar"
                                onClick={() => handleNavigation(routes.login)}
                                className="w-full shadow-sm"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col h-full">
                            {/* Header del menú */}
                            <div className="bg-primary p-8 text-white">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl font-medium shadow-inner">
                                        {user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-medium">
                                            {user.firstName} {user.lastName}
                                        </span>
                                        <span className="text-sm text-white/80">
                                            {getRoleDescription(user.role)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Opciones del menú */}
                            <div className="flex-1 p-6">
                                <div className="space-y-2">
                                    {user.role === 'ROLE_ADMIN' && (
                                        <button
                                            onClick={() => handleNavigation(routes.administrationHome)}
                                            className="w-full text-left py-3 px-4 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-3 text-primaryHover"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                            </svg>
                                            Panel de administración
                                        </button>
                                    )}
                                    
                                    <button
                                        onClick={() => handleNavigation(routes.favs)}
                                        className="w-full text-left py-3 px-4 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-3 text-primaryHover"
                                    >
                                        <AiTwotoneHeart/>
                                        Mis favoritos
                                    </button>
                                    <button
                                        onClick={() => handleLogout()}
                                        className="w-full text-left py-3 px-4 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Cerrar sesión
                                    </button>
                                </div>
                            </div>

                            {/* Footer del menú */}
                            <div className="p-6 border-t border-gray-200">
                                <div className="text-xs text-gray-500 text-center">
                                    © 2024 Roomly. Todos los derechos reservados.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileMenu; 