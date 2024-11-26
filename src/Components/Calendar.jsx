import {format} from "date-fns";
import es from "date-fns/locale/es";


const Calendar = ({
                      month,
                      onDateClick,
                      getDayClassName,
                      generateDays,
                  }) => {
    const days = generateDays(month);

    return (
        <div className="min-w-[250px]">
            <h3 className="text-center font-semibold mb-2">
                {format(month, "MMMM yyyy", { locale: es })}
            </h3>
            <div className="grid grid-cols-7 gap-1">
                {/* Días de la semana */}
                {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
                    <div
                        key={day}
                        className="text-center font-semibold text-gray-700"
                    >
                        {day}
                    </div>
                ))}
                {/* Días del mes */}
                {days.map((day) => (
                    <button
                        key={day}
                        className={`w-8 h-8 text-center rounded-full ${getDayClassName(day)}`}
                        onClick={() => onDateClick(day)}
                        disabled={getDayClassName(day).includes("cursor-not-allowed")}
                    >
                        {format(day, "d")}
                    </button>
                ))}
            </div>
        </div>
    );
};


export default Calendar;