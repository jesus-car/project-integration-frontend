import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { routes } from '../utils/routes';

const UserMenu = ({ user, isScrolled, isHome }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { logout } = useAuthContext();

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-primary/10 backdrop-blur-3xl transition-colors"
            >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-lg font-medium">
                    {user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:flex flex-col items-start">
                    <span className={`text-sm font-medium transition-colors ${
                        isHome && !isScrolled ? 'text-gray-50' : 'text-gray-700'
                    }`}>
                        {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs text-gray-500">
                        {getRoleDescription(user.role)}
                    </span>
                </div>
                <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Menú desplegable */}
            <div
                className={`absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg transform transition-all duration-200 ${
                    isOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
            >
                {/* Header del menú */}
                <div className="bg-primary p-4 rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl font-medium shadow-inner">
                            {user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-medium">
                                {user.firstName} {user.lastName}
                            </span>
                            <span className="text-sm text-white/80">
                                {getRoleDescription(user.role)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Opciones del menú */}
                <div className="p-2">
                    {user.role === 'ROLE_ADMIN' && (
                        <button
                            onClick={() => navigate(routes.administrationHome)}
                            className="w-full text-left py-2 px-4 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-3 text-primaryHover"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            Panel de administración
                        </button>
                    )}

                    <button
                        onClick={handleLogout}
                        className="w-full text-left py-2 px-4 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
