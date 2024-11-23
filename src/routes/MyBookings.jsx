import {useEffect, useState} from "react";
import {bookingService} from "../services/bookingService.js";
import {useAuthContext} from "../contexts/AuthContext.jsx";
import Button from "../Components/Button.jsx";
import {useNavigate} from "react-router-dom";
import {FaArrowLeftLong, FaLocationDot} from "react-icons/fa6";
import {GrStatusGoodSmall} from "react-icons/gr";
import {formatPrice} from "../utils/formatters.js";
import {calculateNights} from "../utils/utils.js";

const MyBookings = () => {

    const [bookings, setBookings] = useState([]);

    const {user} = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProperties = async () => {
            try {
                const response = await bookingService.getUserBookings(user.sub);
                setBookings(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUserProperties();
    }, []);

    const statusMap = {
        'PENDING': {
            color: 'yellow',
            text: 'Pendiente'
        },
        'CONFIRMED': {
            color: 'green',
            text: 'Confirmada'
        },
        'CANCELLED': {
            color: 'red',
            text: 'Cancelada'
        },
        'COMPLETED': {
            color: 'blue',
            text: 'Finalizada'
        }
    }

    const goToHome = () => {
        navigate('/');
    }

    return (
        <div className="mx-auto px-12 md:px-20 lg:px-52">
            <h2 className="text-3xl font-semibold text-gray-900 py-6">Mis reservas</h2>

            {bookings.length === 0 ?
                <div className="flex flex-col items-center gap-6 p-10 border">
                    <p className="text-center">
                        Todavía no has realizado ninguna reserva. Regresa a la página de inicio para
                        consultar nuestras propiedades y escoger la que más te guste.
                    </p>
                    <div className="w-fit">
                        <Button label="Inicio" onClick={goToHome} icon={FaArrowLeftLong}/>
                    </div>

                </div>
                :
                <div className="grid grid-cols-1 gap-5">
                    {
                        bookings.map((booking) => (
                            <div key={booking.id}
                                 className="border rounded-2xl px-5 py-8 flex flex-col md:flex-row items-center gap-10">
                                <div className="w-full md:w-72">
                                    <img src={booking.property.mainPhotoUrl} alt={booking.property.name}
                                         className="object-cover aspect-square rounded-lg"/>
                                </div>
                                <div className="text-gray-600 grid grid-cols-1 md:grid-cols-3 md:gap-10 w-full">
                                    <div className="h-full flex flex-col gap-2 col-span-2">
                                        <p className="text-xl font-semibold text-black">{booking.property.name}</p>

                                        <div className="flex items-center gap-2">
                                            <FaLocationDot/>
                                            <p> {booking.property.city.name}, {booking.property.city.country.name}</p>
                                        </div>

                                        <div className="flex gap-4 mt-5">
                                            <p>{calculateNights(booking.startDate, booking.endDate)} {calculateNights(booking.startDate, booking.endDate) > 1 ? 'noches' : 'noche'}</p>
                                            |
                                            <p> {booking.numGuest} {booking.numGuest > 1 ? 'huéspedes' : 'huésped'}</p>
                                        </div>

                                        <p className="font-semibold ">Precio
                                            total: {formatPrice(booking.totalPrice)}</p>

                                        <div className="mt-5">
                                            <p>Ingreso: {booking.startDate}</p>
                                            <p>Salida: {booking.endDate}</p>
                                        </div>
                                    </div>

                                    <div
                                        className="flex md:flex-col-reverse items-end justify-between text-right w-full gap-10">


                                        <div>

                                             <span className="cursor-pointer underline text-sm"
                                                   onClick={() => navigate(`/properties/${booking.property.id}`)}>
                                                 Ver detalles de la propiedad
                                             </span>
                                        </div>

                                        <div className="text-right text-black font-semibold flex flex-col gap-3">
                                            <div className="flex items-center gap-3 text-xl justify-end">
                                                <p>{statusMap[booking.status].text}</p>
                                                <GrStatusGoodSmall color={statusMap[booking.status].color}/>
                                            </div>

                                            {
                                                booking.status === 'COMPLETED' ?
                                                    <span
                                                        className="cursor-pointer text-center text-white bg-primary rounded-2xl p-2"
                                                        onClick={() => navigate(`/properties/${booking.property.id}`)}>
                                                         Califica tu estadía
                                                    </span> : null
                                            }

                                        </div>


                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default MyBookings;