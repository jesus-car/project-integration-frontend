import {createContext, useContext, useState} from 'react';

const LoadingContext = createContext();

let setLoadingExternally;

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    setLoadingExternally = setIsLoading;

    return (
        <LoadingContext.Provider value={{ isLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Método global para manejar el estado desde fuera del contexto
export const setLoadingState = (state) => {
    if (setLoadingExternally) {
        setLoadingExternally(state);
    }
};

export const useLoadingContext = () => useContext(LoadingContext);
