import {useNavigate} from "react-router-dom";
import Button from "../Components/Button.jsx";
import {routes} from "../utils/routes.js";

const Forbidden = () => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center p-10 gap-10">
            <img
                src="/images/logo_primary_base.png"
                alt="Logo"
                className={"h-20"}
            />
            <h1 className="text-2xl font-bold">403 - Acceso Denegado</h1>
            <p>Ups, no tienes permiso para acceder a esta página.</p>
            <div className="w-40">
                <Button onClick={() => navigate(routes.home)} type="primary" label="Regresar al inicio"/>
            </div>

        </div>
    );
};

export default Forbidden;
