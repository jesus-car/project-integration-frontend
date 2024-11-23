import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { routes } from '../utils/routes';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {userHasAccess} from "../utils/utils.js";
import {MdAdminPanelSettings, MdLibraryBooks, MdLogout} from "react-icons/md";
import { label } from 'framer-motion/client';
import { AiTwotoneHeart } from "react-icons/ai";

const UserMenu = ({ user, isScrolled, isHome }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { logout } = useAuthContext();


    const options = [
        {
            label: "Panel de administración",
            onClick: () => navigate(routes.administrationHome),
            requiredRoles: ['ROLE_ADMIN', 'ROLE_OWNER'],
            icon: <MdAdminPanelSettings />
        },
        {
            label: "Mis reservas",
            onClick: () => navigate(routes.myBookings),
            requiredRoles: ['ROLE_ADMIN', 'ROLE_OWNER'],
            icon: <MdLibraryBooks />

        },
        {
            label:"Mis favoritos",
            onClick: () => navigate(routes.favs),
            requiredRoles: ['ROLE_USER'],
            icon: <AiTwotoneHeart/>
        },
        {
            label: "Cerrar sesión",
            labelClass: "text-red-600",
            onClick: logout,
            icon: <MdLogout />
        }
    ];

    const allowedOptions = options.filter(option => {
        return !option.requiredRoles || userHasAccess(user, option.requiredRoles);
    });

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
                {isOpen ? (
                    <IoIosArrowUp className="text-lg text-primaryHover" />
                ) : (
                    <IoIosArrowDown className="text-lg text-primaryHover" />
                )}
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
                    {allowedOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={option.onClick}
                            className={`w-full text-left py-2 px-4 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-3 ${ option.labelClass || 'text-primaryHover' }`}>
                            {option.icon}
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserMenu;
