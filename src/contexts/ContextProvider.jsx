import {ThemeProvider} from "./ThemeContext.jsx";
import {AuthProvider} from "./AuthContext.jsx";
import {ToastProvider} from "./ToastContext.jsx";
import {LoadingProvider} from "./LoadingContext.jsx";

const ContextProvider = ({children}) => {
    return (
        <LoadingProvider>
        <ToastProvider>
            <AuthProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </AuthProvider>
        </ToastProvider>
        </LoadingProvider>
    );
}

export default ContextProvider
