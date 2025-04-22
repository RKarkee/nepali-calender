import React, { useEffect, useState } from "react";
import NepaliDate from "nepali-date-converter";
import { CalendarRepository } from "../repositories/CalendarRepository";
import { CalendarService } from "../services/CalendarService";
import { useCalendar } from "../context/CalendarContext";
import { CalendarDay } from "../types/calendar";
import CalendarHeader from "../components/calenderGrid/CalenderHeader";
import WeekdaysHeader from "../components/calenderGrid/WeeklyDaysHeader";
import CalendarDayCell from "../components/calenderGrid/CalenderDayCell";


const repository = new CalendarRepository();
const calendarService = new CalendarService(repository);

// Main Calendar Grid Component
const CalendarGrid: React.FC = () => {
  const { state, dispatch } = useCalendar();
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new NepaliDate());

  // Update current date every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new NepaliDate());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Update calendar when current date changes
  useEffect(() => {
    const loadMonthData = async () => {
      setIsLoading(true);
      try {
        const monthDays = await calendarService.getMonthDays(
          state.currentYear,
          state.currentMonth
        );
        setDays(monthDays);
        // Reset selected date when month/year changes
        dispatch({ type: "SET_DATE", payload: null });
      } catch (error) {
        console.error("Error loading month data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMonthData();
  }, [state.currentYear, state.currentMonth, currentDate]);

  const handleDateClick = (index: number) => {
    // Toggle selection - if already selected, deselect
    dispatch({
      type: "SET_DATE",
      payload: state.selectedDate === index ? null : index,
    });
  };

  const handlePrevMonth = () => {
    dispatch({ type: "PREV_MONTH" });
  };

  const handleNextMonth = () => {
    dispatch({ type: "NEXT_MONTH" });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_MONTH", payload: parseInt(e.target.value) });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_YEAR", payload: parseInt(e.target.value) });
  };

  const getEnglishMonthRange = (bsYear: number, bsMonth: number) => {
    const startDate = new NepaliDate(bsYear, bsMonth - 1, 1);
    const endDate = new NepaliDate(bsYear, bsMonth, 0);
    const startMonth = startDate
      .toJsDate()
      .toLocaleString("en-US", { month: "short" });
    const endMonth = endDate
      .toJsDate()
      .toLocaleString("en-US", { month: "short" });
    const year = startDate.toJsDate().getFullYear();

    return startMonth === endMonth
      ? `${startMonth} ${year}`
      : `${startMonth}/${endMonth} ${year}`;
  };

  const yearRange = Array.from({ length: 101 }, (_, i) => 2000 + i);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 h-full">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  // Check if we're viewing the current month
  const isCurrentMonth =
    state.currentYear === currentDate.getYear() &&
    state.currentMonth === currentDate.getMonth() + 1;

  // Render calendar grid with components
  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 h-full flex flex-col">
      <CalendarHeader
        isCurrentMonth={isCurrentMonth}
        language={state.language}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
        currentMonth={state.currentMonth}
        currentYear={state.currentYear}
        yearRange={yearRange}
        englishMonthRange={getEnglishMonthRange(
          state.currentYear,
          state.currentMonth
        )}
      />

      {/* Calendar content - uses flex-grow to take available space */}
      <div className="flex-grow flex flex-col min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px]">
        <WeekdaysHeader language={state.language} />

        {/* Calendar days grid */}
        <div
          className="grid grid-cols-7 gap-1 flex-grow"
          style={{ gridTemplateRows: "repeat(6, minmax(min-content, 1fr))" }}
        >
          {days.map((day: CalendarDay, index: number) => {
            const isToday =
              day.bsDate ===
              `${currentDate.getYear()}-${String(
                currentDate.getMonth() + 1
              ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
                2,
                "0"
              )}`;
            const isSelected = state.selectedDate === index;
            const isSaturday = index % 7 === 6;

            return (
              <CalendarDayCell
                key={index}
                day={day}
                index={index}
                isToday={isToday}
                isSelected={isSelected}
                isSaturday={isSaturday}
                handleDateClick={handleDateClick}
                language={state.language}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
