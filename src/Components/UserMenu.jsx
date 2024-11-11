import { useNavigate } from "react-router-dom";
import { routes } from "../utils/routes";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {useAuthContext} from "../contexts/AuthContext.jsx";

const UserMenu = ({ user }) => {

    const {logout} = useAuthContext();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null); // Ref para el contenedor del menú
    const navigate = useNavigate();
    const initialLetters = user.firstName.charAt(0) + user.lastName.charAt(0).toUpperCase();

    // Función para cerrar sesión
    const handleLogout = () => {
        // Lógica para cerrar sesión, puede ser un logout del contexto, o borrar el token
        console.log("Usuario ha cerrado sesión");
        logout();
        navigate("/login");
    };

    // Función para abrir el menú
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Cierra el menú si el clic es fuera del mismo
    useEffect(() => {
        // Función que detecta clics fuera del menú
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        // Añadir el event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Limpiar el event listener cuando el componente se desmonte
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative flex items-center">
            <div onClick={toggleMenu} className="flex items-center cursor-pointer gap-4">
                <span className="font-bold bg-primaryHover rounded-full text-white w-10 h-10 flex items-center justify-center">
                    {initialLetters}
                </span>
                {isMenuOpen ? (
                    <IoIosArrowUp className="text-2xl text-primaryHover" />
                ) : (
                    <IoIosArrowDown className="text-2xl text-primaryHover" />
                )}
            </div>

            {/* Menú desplegable */}
            {isMenuOpen && (
                <div ref={menuRef}
                    className="absolute -right-6 top-20 bg-base rounded-lg shadow-lg w-fit">
                    <ul className="py-6">
                        <li className={"px-8 pt-2 pb-4 text-secondaryHover font-bold border-b border-secondary "}>
                            Hola, {user.firstName}
                        </li>
                        <li className="px-8 py-2 text-nowrap cursor-pointer hover:bg-secondaryHover hover:text-white"
                            onClick={() => navigate(routes.administrationHome)}>
                            Panel de administración
                        </li>
                        <li className="px-8 py-2 text-nowrap cursor-pointer hover:bg-secondaryHover hover:text-white"
                            onClick={handleLogout}>
                            Cerrar sesión
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
