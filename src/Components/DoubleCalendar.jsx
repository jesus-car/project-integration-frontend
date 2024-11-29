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
import Calendar from "./Calendar.jsx";
import { es } from 'date-fns/locale';

const DoubleCalendar = ({ occupiedRanges = [], onDateChange, initialDates = null }) => {
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
        if (isDayOccupied(day)) return;
        if (isBefore(day, new Date())) return;

        if (!selectedDates.startDate || selectedDates.endDate) {
            setSelectedDates({ startDate: day, endDate: null });
            onDateChange({
                startDate: day,
                endDate: null,
            });
        }
        else if (selectedDates.startDate && !selectedDates.endDate) {
            if (isRangeOccupied(selectedDates.startDate, day)) {
                alert("El rango seleccionado contiene días ocupados. Selecciona otro rango.");
                return;
            }

            if (isSameDay(selectedDates.startDate, day)) {
                alert("La fecha de inicio y la fecha de fin no pueden ser el mismo día.");
                return;
            }

            setSelectedDates(prev => ({ ...prev, endDate: day }));
            onDateChange({
                startDate: selectedDates.startDate,
                endDate: day,
            });
        }
    };

    useEffect(() => {
        if (initialDates) {
            setSelectedDates({
                startDate: initialDates.startDate ? new Date(initialDates.startDate) : null,
                endDate: initialDates.endDate ? new Date(initialDates.endDate) : null
            });
        }
    }, [initialDates]);

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

    const formattedDate = (date) => {
        if (!date) return "Agregar fecha";
        return format(date, "MMMM dd", { locale: es });
    };

    const handleClearDates = () => {
        setSelectedDates({ startDate: null, endDate: null });
        setIsCalendarOpen(false); // Cerrar el calendario al limpiar las fechas
    };

    return (
        <div className="relative w-full" ref={calendarRef}>
            {/* Input que despliega el calendario */}
            <div
                className="flex items-center border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 
                         transition-colors divide-x h-[42px] bg-white"
                onClick={() => setIsCalendarOpen((prev) => !prev)}
            >
                {/* Check in */}
                <div className="flex-1 px-2 ">
                    <div className="flex flex-col">
                        <span className="text-center text-xs font-medium text-gray-800">Fecha entrada</span>
                        <span className="text-center text-sm text-gray-600">
                            {formattedDate(selectedDates.startDate)}
                        </span>
                    </div>
                </div>

                {/* Check out */}
                <div className="flex-1 px-2 ">
                    <div className="flex flex-col">
                        <span className="text-center text-xs font-medium text-gray-800">Fecha salida</span>
                        <span className="text-center text-sm text-gray-600">
                            {formattedDate(selectedDates.endDate)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Calendario */}
            {isCalendarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div 
                        className="absolute bg-white rounded-lg shadow-xl p-4"
                        style={{
                            maxWidth: '800px',
                            width: '95%',
                            maxHeight: '90vh',
                            overflowY: 'auto'
                        }}
                    >
                        {/* Botón de cerrar */}
                        <button 
                            onClick={() => setIsCalendarOpen(false)}
                            className="absolute right-3 top-1 text-gray-500 hover:text-gray-700 z-10"
                        >
                            ✕
                        </button>

                        <div className="flex items-center justify-between w-full px-4 pt-2">
                            <button
                                onClick={handlePrevMonth}
                                className={`text-gray-700 text-[2rem] hover:bg-gray-200 rounded-full h-[42px] w-[42px] flex items-center justify-center ${
                                    currentMonth.getMonth() === new Date().getMonth() && 
                                    currentMonth.getFullYear() === new Date().getFullYear() 
                                        ? "cursor-not-allowed" 
                                        : ""
                                }`}
                                disabled={
                                    currentMonth.getMonth() === new Date().getMonth() && 
                                    currentMonth.getFullYear() === new Date().getFullYear()
                                }
                            >
                                <span className="block mb-[.3rem]">←</span>
                            </button>
                            <button onClick={handleNextMonth} className="text-gray-700 text-[2rem] hover:bg-gray-200 rounded-full h-[42px] w-[42px] flex items-center justify-center">
                                <span className="block mb-[.3rem]">→</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
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

                        <div className="flex justify-center gap-4 pt-4 border-t">
                            <button
                                onClick={handleClearDates}
                                className="px-4 py-2 text-red-500 hover:text-red-700"
                            >
                                Limpiar fechas
                            </button>
                            <button
                                onClick={() => setIsCalendarOpen(false)}
                                className="px-4 py-2 text-primary hover:text-primary/80"
                            >
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoubleCalendar;
