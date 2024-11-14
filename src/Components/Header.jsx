import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes.js";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import UserMenu from "./UserMenu";
import Button from "./Button.jsx"; // Importamos el componente UserMenu

const Header = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();

    const goTo = (route) => {
        navigate(route);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 shadow-md bg-base py-3 px-6">
            <div className="flex justify-between">

                <div className="flex items-center justify-center">
                    <img
                        onClick={() => goTo(routes.home)}
                        className="cursor-pointer w-20"
                        src="/images/logo_primary_base.png"
                        alt="Logo"
                    />
                </div>

                {/* Condicional para mostrar el UserMenu si el usuario está autenticado o los botones de login/signup */}

                {user ? (
                    <UserMenu user={user}/> // Muestra el UserMenu si el usuario está autenticado
                ) : (
                    <div className="flex items-center gap-4">
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
