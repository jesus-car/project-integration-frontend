import App from './App.jsx'
import './styles/index.css'
import ReactDOM from "react-dom/client";
import {BrowserRouter} from 'react-router-dom';
import ContextProvider from './contexts/ContextProvider.jsx';
import LoadingOverlay from "./Components/LoadingOverlay.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ContextProvider>
            <App/>
            <LoadingOverlay/>
        </ContextProvider>
    </BrowserRouter>
);