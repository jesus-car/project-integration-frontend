import {ThemeProvider} from "./ThemeContext.jsx";
import {AuthProvider} from "./AuthContext.jsx";
import {ToastProvider} from "./ToastContext.jsx";

const ContextProvider = ({children}) => {
    return (
        <ToastProvider>
            <AuthProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </AuthProvider>
        </ToastProvider>
    );
}

export default ContextProvider
