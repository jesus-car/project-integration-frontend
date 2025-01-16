import {useLoadingContext} from "../contexts/LoadingContext.jsx";

const LoadingOverlay = () => {
    const { isLoading } = useLoadingContext();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="p-6 flex flex-col items-center gap-4">
                <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
                <p className="text-lg font-medium text-white">Cargando...</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;
