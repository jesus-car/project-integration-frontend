// todo: contexto para manejar el estado del usuario (si está autenticado, la información del usuario, token de autenticación, roles, etc.)

import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Para saber si los datos están cargando
    
    const login = async (credentials) => {
        // Aquí iría la lógica de autenticación real (ejemplo: llamada a la API)
        const fakeUser = { id: 1, username: credentials.username, token: 'abc123' };
        setUser(fakeUser);
        localStorage.setItem('user', JSON.stringify(fakeUser)); // Guardamos el usuario en localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Removemos el usuario de localStorage
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Recuperamos el usuario del localStorage
        }
        setLoading(false); // Terminamos de cargar los datos
      }, []);
    

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useAuthContext(AuthContext);
