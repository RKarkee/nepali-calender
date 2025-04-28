import { LANGUAGE_CONFIG } from "../../config/language";
import { toNepaliDigits } from "../../utils/calendar";

// Calendar Header Component
const CalendarHeader: React.FC<{
  isCurrentMonth: boolean;
  language: keyof typeof LANGUAGE_CONFIG;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleMonthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  currentMonth: number;
  currentYear: number;
  yearRange: number[];
  englishMonthRange: string;
}> = ({
  isCurrentMonth,
  language,
  handlePrevMonth,
  handleNextMonth,
  handleMonthChange,
  handleYearChange,
  currentMonth,
  currentYear,
  yearRange,
  englishMonthRange,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 py-2 sm:py-3 mb-2 sm:mb-4 bg-primary-50 rounded-lg p-2 sm:p-3">
      <button
        // onClick={handleTodayClick}
        className={`calendar-header-btn text-xs sm:text-sm md:text-base 
          px-2 py-1 sm:px-3 sm:py-1.5 rounded-md transition-colors
          ${
            isCurrentMonth
              ? "bg-primary-500 text-white hover:bg-primary-600"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
      >
        {LANGUAGE_CONFIG[language].navigation.today}
      </button>

      <div className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={handlePrevMonth} 
          className="calendar-header-btn px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline text-xs sm:text-sm md:text-base ml-1">
            {LANGUAGE_CONFIG[language].navigation.previous}
          </span>
        </button>

        <select
          value={currentMonth}
          onChange={handleMonthChange}
          className="calendar-select text-xs sm:text-sm md:text-base 
            px-2 py-1 sm:px-3 sm:py-1.5 
            border-gray-300 rounded-md bg-white hover:border-gray-400 focus:border-primary-500 
            focus:ring focus:ring-primary-500 focus:ring-opacity-50 transition-all"
        >
          {LANGUAGE_CONFIG[language].months.map((month, index) => (
            <option key={month} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={currentYear}
          onChange={handleYearChange}
          className="calendar-select text-xs sm:text-sm md:text-base
            px-2 py-1 sm:px-3 sm:py-1.5
            border-gray-300 rounded-md bg-white hover:border-gray-400 focus:border-primary-500
            focus:ring focus:ring-primary-500 focus:ring-opacity-50 transition-all"
        >
          {yearRange.map((year) => (
            <option key={year} value={year}>
              {language === "ne" ? toNepaliDigits(year) : year}
            </option>
          ))}
        </select>

        <button 
          onClick={handleNextMonth} 
          className="calendar-header-btn px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <span className="hidden sm:inline text-xs sm:text-sm md:text-base mr-1">
            {LANGUAGE_CONFIG[language].navigation.next}
          </span>
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="text-xs sm:text-sm md:text-base text-orange-600  font-bold">
        {englishMonthRange}
      </div>
    </div>
  );
};

export default CalendarHeader;