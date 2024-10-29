import React from 'react'
import { ThemeProvider } from "./ThemeContext.jsx";
import { AuthProvider } from "./AuthContext.jsx";

const ContextProvider =  ({ children }) => {
    return (
        <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
    );
}

export default ContextProvider
