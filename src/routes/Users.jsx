import {useEffect, useState} from "react";
import {userService} from "../services/userService.js";
import Button from "../Components/Button.jsx";
import Spinner from "../Components/Spinner.jsx";
import ChangeRoleModal from "../Components/modals/ChangeRoleModal.jsx";
import {roleService} from "../services/roleService.js";

const Users = () => {

    const [users, setUsers] = useState([]);

    const [loadingUsers, setLoadingUsers] = useState(true);

    const [error, setError] = useState('');

    const [selectedUser, setSelectedUser] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const headers = [
        "Nombre",
        "Correo",
        "Rol",
        "Acciones"
    ]

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAllUsers();
                setUsers(response.data.content)
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchUsers()

    }, []);

    useEffect(() => {
        if (selectedUser) {
            setIsModalOpen(true);
        }
    }, [selectedUser]);

    const confirmChange = async (newRole) => {
        if (newRole.id == selectedUser.role.id) {
            return;
        }
        await roleService.changeUserRole(selectedUser.id, newRole.id);
        const updatedUsers = users.map((user) => {
            if (user.id === selectedUser.id) {
                return {
                    ...user,
                    role: newRole
                };
            }
            return user;
        });
        setUsers(updatedUsers);

        setIsModalOpen(false);
        setSelectedUser(null);
        // Llamar a la API para cambiar el rol
    };

    const cancelChange = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };


    return (
        <div>
            {loadingUsers ? (
                <Spinner/>
            ) : (
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header) => (
                            <th key={header}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">{user.firstName} {user.lastName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.role.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Button onClick={() => setSelectedUser(user)}
                                        type="primary"
                                        label="Cambiar rol"/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            )}

            <ChangeRoleModal isOpen={isModalOpen}
                             onConfirm={confirmChange}
                             onCancel={cancelChange}
                             currentRole={selectedUser?.role}/>
        </div>
    );
};

export default Users;