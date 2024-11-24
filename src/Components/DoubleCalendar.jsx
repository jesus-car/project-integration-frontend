import { useState, useRef, useEffect } from "react";
import {
    addMonths,
    subMonths,
    format,
    isSameDay,
    isWithinInterval,
    parseISO,
    getDay,
    eachDayOfInterval,
    isBefore,
} from "date-fns";
import es from "date-fns/locale/es";
import Calendar from "./Calendar.jsx";

const DoubleCalendar = ({ occupiedRanges = [], onDateChange }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDates, setSelectedDates] = useState({
        startDate: null,
        endDate: null,
    });
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendarRef = useRef();

    // Manejo de clics fuera del calendario
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setIsCalendarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Verifica si un día está ocupado
    const isDayOccupied = (day) => {
        return (
            occupiedRanges &&
            occupiedRanges.some((range) =>
                isWithinInterval(day, {
                    start: parseISO(range.startDate),
                    end: parseISO(range.endDate),
                })
            )
        );
    };

    // Verifica si cualquier día dentro del rango está ocupado
    const isRangeOccupied = (startDate, endDate) => {
        const daysInRange = eachDayOfInterval({ start: startDate, end: endDate });
        return daysInRange.some((day) => isDayOccupied(day));
    };

    const handleDateClick = (day) => {
        if (isDayOccupied(day)) return; // No permite seleccionar días ocupados
        if (isBefore(day, new Date())) return; // No permite seleccionar días anteriores al día actual

        if (!selectedDates.startDate || selectedDates.endDate) {
            const newStartDate = day;
            setSelectedDates({ startDate: newStartDate, endDate: null });

            // Convertir la fecha de inicio al formato AAAA-MM-DD
            onDateChange({
                startDate: format(newStartDate, "yyyy-MM-dd"),
                endDate: null,
            });
        }
        else if (selectedDates.startDate && !selectedDates.endDate) {
            const newEndDate = day;

            // Verificar si el rango seleccionado contiene días ocupados
            if (isRangeOccupied(selectedDates.startDate, newEndDate)) {
                alert("El rango seleccionado contiene días ocupados. Selecciona otro rango.");
                return; // No se permite la selección de este rango
            }

            // Validación de que la fecha de inicio y la fecha de fin no sean el mismo día
            if (isSameDay(selectedDates.startDate, newEndDate)) {
                alert("La fecha de inicio y la fecha de fin no pueden ser el mismo día.");
                return; // No permite seleccionar el mismo día como inicio y fin
            }

            setSelectedDates({ ...selectedDates, endDate: newEndDate });
            setIsCalendarOpen(false);

            // Convertir las fechas seleccionadas al formato AAAA-MM-DD
            onDateChange({
                startDate: format(selectedDates.startDate, "yyyy-MM-dd"),
                endDate: format(newEndDate, "yyyy-MM-dd"),
            });
        }
    };


    // Genera los días del mes, ajustando para que empiece en lunes
    const generateDays = (month) => {
        const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
        const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

        const startDay = getDay(startOfMonth);
        const daysInMonth = endOfMonth.getDate();

        const days = [];
        for (let i = 1 - startDay + 1; i <= daysInMonth; i++) { // Ajuste para que comience en lunes
            days.push(new Date(month.getFullYear(), month.getMonth(), i));
        }
        return days;
    };

    const handlePrevMonth = () => {
        // Solo permite retroceder si no estamos en el mes actual
        if (currentMonth.getMonth() > new Date().getMonth() || currentMonth.getFullYear() > new Date().getFullYear()) {
            setCurrentMonth(subMonths(currentMonth, 1));
        }
    };
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    // Estilo de los días seleccionados u ocupados
    const getDayClassName = (day) => {
        if (isBefore(day, new Date())) return "bg-gray-200 text-gray-400 cursor-not-allowed"; // Días anteriores deshabilitados
        if (selectedDates.startDate && isBefore(day, selectedDates.startDate)) return "bg-gray-200 text-gray-400 cursor-not-allowed"; // Días anteriores a la fecha de inicio deshabilitados
        if (isDayOccupied(day)) return "bg-red-200 text-red-600 cursor-not-allowed"; // Días ocupados
        if (
            isSameDay(day, selectedDates.startDate) ||
            isSameDay(day, selectedDates.endDate)
        )
            return "bg-blue-500 text-white";
        if (
            selectedDates.startDate &&
            selectedDates.endDate &&
            isWithinInterval(day, {
                start: selectedDates.startDate,
                end: selectedDates.endDate,
            })
        )
            return "bg-blue-100";
        return "bg-white hover:bg-gray-200";
    };

    const formattedStartDate = selectedDates.startDate
        ? format(selectedDates.startDate, "dd/MM/yyyy")
        : "Fecha inicio";
    const formattedEndDate = selectedDates.endDate
        ? format(selectedDates.endDate, "dd/MM/yyyy")
        : "Fecha fin";

    const handleClearDates = () => {
        setSelectedDates({ startDate: null, endDate: null });
        setIsCalendarOpen(false); // Cerrar el calendario al limpiar las fechas
    };

    return (
        <div className="relative w-full" ref={calendarRef}>
            {/* Input que despliega el calendario */}
            <div
                className="flex justify-between items-center border p-2 rounded cursor-pointer"
                onClick={() => setIsCalendarOpen((prev) => !prev)}
            >
                <span>{`${formattedStartDate} - ${formattedEndDate}`}</span>
                <span className="text-gray-600">▼</span>
            </div>

            {/* Calendario */}
            {isCalendarOpen && (
                <div className="absolute -top-20 md:top-12 right-0 bg-white border rounded shadow-lg z-50">
                    <div className="flex items-center justify-between w-full px-4 pt-2">
                        <button
                            onClick={handlePrevMonth}
                            className={`text-gray-700 ${currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear() ? "cursor-not-allowed" : ""}`}
                            disabled={currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()} // Deshabilitar si estamos en el mes actual
                        >
                            ←
                        </button>
                        <button onClick={handleNextMonth} className="text-gray-700">
                            →
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 pt-0 w-max">
                        {/* Mes actual */}
                        <Calendar
                            month={currentMonth}
                            onDateClick={handleDateClick}
                            selectedDates={selectedDates}
                            getDayClassName={getDayClassName}
                            generateDays={generateDays}
                        />

                        {/* Mes siguiente */}
                        <Calendar
                            month={addMonths(currentMonth, 1)}
                            onDateClick={handleDateClick}
                            selectedDates={selectedDates}
                            getDayClassName={getDayClassName}
                            generateDays={generateDays}
                        />
                    </div>

                    <div className="p-4 text-center">
                        <button
                            onClick={handleClearDates}
                            className="text-red-500 hover:text-red-700"
                        >
                            Limpiar fechas
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoubleCalendar;
