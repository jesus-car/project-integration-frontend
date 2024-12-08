import Button from "../Button.jsx";
import {
    FaBed,
    FaBath,
    FaUsers,
    FaCalendarCheck,
    FaDollarSign,
    FaMapMarkerAlt
} from "react-icons/fa";
import {MdOutlineCleaningServices, MdNightlight} from "react-icons/md";
import {calculateNights, formatDateToString} from "../../utils/utils.js";

const BookingModal = ({isOpen = false, onSubmit, onCancel, bookingDetails}) => {
    const {
        detail,
        checkIn,
        checkOut,
        guests,
        totalCost,
        user,
    } = bookingDetails;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-screen-lg w-full  max-h-[90vh] md:max-h-max">
                <h2 className="text-2xl font-bold text-center mb-6">Confirma tu reserva</h2>

                {/* Información del usuario */}
                <div className="flex items-center mb-4 gap-4">
                    <div
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-lg font-medium">
                        {user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-lg font-semibold">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                            {user.email}
                        </p>
                    </div>

                </div>


                {/* Contenido principal */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Detalles de la propiedad */}
                    <div>
                        <p className="text-gray-700 text-lg font-semibold mb-2">{detail.name}</p>
                        <p className="text-sm text-gray-600 mb-4">{detail.description}</p>
                        <ul className="text-gray-700 space-y-2">
                            <li className="flex items-center">
                                <FaMapMarkerAlt className="mr-2 text-gray-700"/>
                                Ubicación: {detail.city.name}, {detail.city.country.name}
                            </li>
                            <li className="flex items-center">
                                <FaBed className="mr-2 text-gray-700"/>
                                Habitaciones: {detail.numRooms}
                            </li>
                            <li className="flex items-center">
                                <FaBath className="mr-2 text-gray-700"/>
                                Baños: {detail.numBathrooms}
                            </li>
                            <li className="flex items-center">
                                <FaUsers className="mr-2 text-gray-700"/>
                                Anfitrión: {detail.owner.firstName} {detail.owner.lastName}
                            </li>
                        </ul>
                    </div>

                    {/* Imagen principal */}
                    <div className="rounded-lg overflow-hidden h-64">
                        <img
                            src={detail.mainPhotoUrl}
                            alt={detail.name}
                            className="w-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* Detalles de la reserva */}
                <div className="mt-6">
                    <h3 className="text-gray-700 text-lg font-semibold mb-2">Detalles de la Reserva</h3>
                    <div className="grid grid-cols-2">
                        <ul className="text-gray-700 space-y-4">
                            <li className="flex items-center">
                                <FaCalendarCheck className="mr-2 text-gray-700"/>
                                Check-in: {formatDateToString(checkIn)}
                            </li>
                            <li className="flex items-center">
                                <FaCalendarCheck className="mr-2 text-gray-700"/>
                                Check-out: {formatDateToString(checkOut)}
                            </li>
                            <li className="flex items-center">
                                <MdNightlight className="mr-2 text-gray-700"/>
                                Noches: {calculateNights(checkIn, checkOut)}
                            </li>
                        </ul>
                        <ul className="text-gray-700 space-y-4">
                            <li className="flex items-center">
                                <FaUsers className="mr-2 text-gray-700"/>
                                Huéspedes: {guests}
                            </li>
                            <li className="flex items-center">
                                <MdOutlineCleaningServices className="mr-2 text-gray-700"/>
                                Limpieza: ${totalCost.cleaning}
                            </li>
                            <li className="flex items-center">
                                <FaDollarSign className="mr-2 text-gray-700"/>
                                Total: ${totalCost.total}
                            </li>
                        </ul>
                    </div>
                </div>


                {/* Botones */}
                <div className="flex justify-between gap-10 mt-8">
                    <Button onClick={onCancel} type="secondary" label="Cancelar"/>
                    <Button onClick={onSubmit} type="primary" label="Confirmar"/>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
