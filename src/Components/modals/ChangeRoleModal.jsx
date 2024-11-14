import {useEffect, useState} from "react";
import Button from "../Button.jsx";
import {useAuthContext} from "../../contexts/AuthContext.jsx";
import Spinner from "../Spinner.jsx";

const ChangeRoleModal = ({currentRole, onConfirm, onCancel, isOpen}) => {
    const {roles, loading } = useAuthContext();

    const [selectedRole, setSelectedRole] = useState({});

    useEffect(() => {
        setSelectedRole(currentRole);
    }, [currentRole]);

    const handleChange = (e) => {
        const role = roles.find((role) => role.id == e.target.value);
        setSelectedRole(role);
    }


    if (!isOpen) return null;


    if (loading) {
        return <Spinner/>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-96">
                <h2 className="text-xl font-semibold mb-4 text-center">Cambiar rol</h2>
                <div className="mt-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Rol
                    </label>
                    <select
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="role"
                        value={selectedRole.id}
                        onChange={handleChange}>
                        <option value="" disabled>Selecciona un nuevo rol</option>
                        {roles.map((role) => (
                            <option key={role.id}
                                    value={role.id}
                                    disabled={role.id === selectedRole.id}>
                                {role.description}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-10 mt-6">
                    <Button onClick={onCancel} type="secondary" label="Cancelar"/>
                    <Button onClick={() => onConfirm(selectedRole)} type="primary" label="Confirmar"/>
                </div>
            </div>
        </div>
    );
};

export default ChangeRoleModal;
