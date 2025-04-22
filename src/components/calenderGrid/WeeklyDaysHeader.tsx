import { LANGUAGE_CONFIG } from "../../config/language";

// Calendar Weekdays Header Component
const WeekdaysHeader: React.FC<{
  language: keyof typeof LANGUAGE_CONFIG;
}> = ({ language }) => {
  return (
    <div className="grid grid-cols-7 gap-1 mb-2">
      {LANGUAGE_CONFIG[language].weekdays.map((day, index) => (
        <div
          key={day}
          className={`
            text-center font-semibold text-xs sm:text-sm md:text-base 
            bg-gray-100 rounded-lg py-3 px-2 sm:py-3 sm:px-3
            ${index === 6 ? "text-red-500" : "text-gray-600"}
          `}
        >
          {/* Show abbreviated name on mobile, full name on larger screens */}
          <span className="block md:hidden">
            {LANGUAGE_CONFIG[language].weekdays[index]}
          </span>
          <span className="hidden md:block">
            {LANGUAGE_CONFIG[language].weekdaysFull[index]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WeekdaysHeader;