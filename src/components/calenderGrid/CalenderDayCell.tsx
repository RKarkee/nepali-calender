import { CalendarDay } from "../../types/calendar";
import { toNepaliDigits } from "../../utils/calendar";

// Calendar Day Cell Component
const CalendarDayCell: React.FC<{
  day: CalendarDay;
  index: number;
  isToday: boolean;
  isSelected: boolean;
  isSaturday: boolean;
  handleDateClick: (index: number) => void;
  language: string;
}> = ({
  day,
  index,
  isToday,
  isSelected,
  isSaturday,
  handleDateClick,
  language,
}) => {
  const dayNumber = day.bsDate ? parseInt(day.bsDate.split("-")[2]) : "";
  const englishDay = day.adDate ? parseInt(day.adDate.split("-")[2]) : "";

  if (!dayNumber) {
    return <div className="calendar-cell opacity-0 cursor-default"></div>;
  }

  return (
    <button
      onClick={() => handleDateClick(index)}
      className={`
        calendar-cell relative p-1 sm:p-2 md:p-3 lg:p-4 rounded-lg transition-all h-full
        flex flex-col justify-center items-center
        ${isToday ? "bg-primary-50 border-2 border-primary-500" : ""}
        ${isSelected ? "bg-gray-100 ring-2 ring-gray-400" : ""}
        ${
          isSaturday && !isSelected
            ? "bg-red-50 text-red-600 hover:bg-red-100"
            : "hover:bg-gray-50"
        }
      `}
    >
      {/* BS Date - centered vertically and horizontally */}
      <div
        className={`
        text-center font-semibold mx-auto
        text-xs sm:text-sm md:text-lg lg:text-xl
        ${language === "ne" ? "font-nepali" : ""}
      `}
      >
        {language === "ne" ? toNepaliDigits(dayNumber) : dayNumber}
      </div>

      {/* Event indicator */}
      {day.events.length > 0 && (
        <div className="mt-1 sm:mt-2">
          <div className="flex gap-0.5 sm:gap-1">
            {day.events.slice(0, 3).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-accent-500"
              />
            ))}
          </div>
        </div>
    )}

    {/* AD Date - positioned bottom right */}
    <div
      className={`
      text-[0.5rem] sm:text-xs md:text-sm 
      absolute bottom-1 right-1 sm:bottom-2 sm:right-2
      ${isSaturday && !isSelected ? "text-red-500" : "text-gray-500"}
    `}
    >
      {englishDay}
    </div>
    </button>
  );
};

export default CalendarDayCell;
