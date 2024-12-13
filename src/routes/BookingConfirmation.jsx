import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaUsers, FaEnvelope } from 'react-icons/fa';
import { formatPrice } from '../utils/formatters';
import { routes } from '../utils/routes';

const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingDetails = location.state;

    if (!bookingDetails) {
        return <Navigate to="/" replace />;
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className=" flex items-center justify-center mt-16 p-4">
            <div className="w-full max-w-lg">
                {/* Confirmation Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
                    {/* Success Banner */}
                    <div className="bg-[#91b07c] text-white px-6 py-4 flex items-center gap-3">
                        <FaCheckCircle className="w-5 h-5" />
                        <span className="font-medium">Reserva confirmada</span>
                    </div>

                    {/* Property Section */}
                    <div className="px-6 py-4 border-b border-dashed border-gray-200">
                        <h1 className="text-xl font-bold text-gray-800">{bookingDetails.propertyName}</h1>
                        <div className="flex items-center gap-2 mt-1 text-gray-600">
                            <FaUsers className="w-4 h-4" />
                            <span>{bookingDetails.guests} {bookingDetails.guests === 1 ? 'huésped' : 'huéspedes'}</span>
                        </div>
                    </div>

                    {/* Dates Section */}
                    <div className="grid grid-cols-2 divide-x divide-dashed divide-gray-200">
                        <div className="px-6 py-4">
                            <p className="text-sm text-gray-500">Check-in</p>
                            <p className="font-semibold text-gray-800 mt-1">{formatDate(bookingDetails.checkIn)}</p>
                        </div>
                        <div className="px-6 py-4">
                            <p className="text-sm text-gray-500">Check-out</p>
                            <p className="font-semibold text-gray-800 mt-1">{formatDate(bookingDetails.checkOut)}</p>
                        </div>
                    </div>

                    {/* Price Details */}
                    <div className="px-6 py-4 bg-gray-50">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Noches</span>
                                <span>{formatPrice(bookingDetails.totalCost.nights)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Limpieza</span>
                                <span>{formatPrice(bookingDetails.totalCost.cleaning)}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold text-gray-800 pt-2 border-t border-gray-200">
                                <span>Total</span>
                                <span>{formatPrice(bookingDetails.totalCost.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute left-0 top-1/2 -ml-3 w-6 h-6 bg-gray-100 rounded-full"></div>
                    <div className="absolute right-0 top-1/2 -mr-3 w-6 h-6 bg-gray-100 rounded-full"></div>
                </div>

                {/* Email Notification */}
                <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 text-sm bg-white/50 py-2 px-4 rounded-lg">
                    <FaEnvelope className="w-4 h-4" />
                    <p>Hemos enviado los detalles a tu correo electrónico</p>
                </div>

                {/* Actions */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                    <button
                        onClick={() => navigate(routes.myBookings)}
                        className="w-full px-4 py-3 bg-[#91b07c] text-white rounded-lg hover:bg-[#82a06e] transition-colors font-medium text-sm"
                    >
                        Ver mis reservas
                    </button>
                    <button
                        onClick={() => navigate(routes.home)}
                        className="w-full px-4 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm border border-gray-200"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;