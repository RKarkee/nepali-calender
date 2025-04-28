import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCalendar } from '../context/CalendarContext';
import { toNepaliDigits } from '../utils/calendar';
import { LANGUAGE_CONFIG } from '../config/language';

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const { state, dispatch } = useCalendar();

  // Initialize language on component mount
  useEffect(() => {
    // Set initial language to Nepali
    i18n.changeLanguage('ne');
  }, []);

  const toggleLanguage = () => {
    const newLang = state.language === 'en' ? 'ne' : 'en';
    i18n.changeLanguage(newLang);
    dispatch({ type: 'SET_LANGUAGE', payload: newLang });
  };

  const currentMonthName = LANGUAGE_CONFIG[state.language].months[state.currentMonth - 1];

  return (
    <header className="bg-white border-b border-orange-200 sticky top-0 z-50 py-2 md:py-3 lg:py-4">
      <div className="container mx-auto px-3 md:px-4 lg:px-6">
        {/* Top row with title and controls */}
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-500 truncate">
              {state.language === 'ne'
                ? `${toNepaliDigits(state.currentYear)} ${currentMonthName}`
                : `${currentMonthName} ${state.currentYear}`}
            </h1>
          </div>
          
          <div className="flex-shrink-0 ml-3">
            <button
              onClick={toggleLanguage}
              className="calendar-header-btn bg-primary-500 text-white hover:bg-primary-600 rounded-md
                px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2
                text-xs sm:text-sm md:text-base border-2 border-primary-500"
            >
              {state.language === 'en' ? 'नेपाली' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;