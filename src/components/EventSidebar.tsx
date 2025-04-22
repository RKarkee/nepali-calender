import React from 'react';
import { CalendarEvent } from '../types/events';
import { toNepaliDigits } from '../utils/calendar';
import { LANGUAGE_CONFIG } from '../config/language';

type SupportedLanguage = keyof typeof LANGUAGE_CONFIG;

interface EventSidebarProps {
  events: CalendarEvent[];
  selectedDate: string;
  selectedMonth: number;
  selectedYear: number;
  language: SupportedLanguage;
}

const EventSidebar: React.FC<EventSidebarProps> = ({
  events,
  selectedDate,
  selectedMonth,
  selectedYear,
  language
}) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'holiday':
        return '🎉';
      case 'tithi':
        return '🌙';
      default:
        return '📅';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'holiday':
        return 'text-red-500';
      case 'tithi':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const date = selectedDate.split('-')[2];

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {language === 'ne'
            ? `${toNepaliDigits(selectedYear)} ${LANGUAGE_CONFIG[language].months[selectedMonth - 1]} ${toNepaliDigits(parseInt(date))}`
            : `${LANGUAGE_CONFIG[language].months[selectedMonth - 1]} ${parseInt(date)}, ${selectedYear}`}
        </h2>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          {/* {LANGUAGE_CONFIG[language].events.noEvents} */}
        </p>
      ) : (
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${getEventColor(event.type)}`}
            >
              <div className="flex items-start gap-2">
                <span className="text-xl">{getEventIcon(event.type)}</span>
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventSidebar; 