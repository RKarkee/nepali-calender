import { CalendarEvent } from './events';

export interface CalendarDay {
  bsDate: string;
  adDate: string;
  tithi: string;
  events: CalendarEvent[];
  holiday: boolean;
  horoscope?: string;
}

export interface CalendarMonth {
  year: number;
  month: number;
  days: CalendarDay[];
}

export interface MonthData {
  year: number;
  month: number;
  monthName: string;
  startDate: {
    ad: string;
  };
  days: CalendarDay[];
}

export interface EventsData {
  [year: string]: {
    [month: string]: {
      [date: string]: CalendarEvent[];
    };
  };
}

export interface CalendarState {
  currentYear: number;
  currentMonth: number;
  selectedDate: number | null;
  language: 'en' | 'ne';
  isLoading: boolean;
  error: string | null;
  monthData: MonthData | null;
}

export type CalendarAction =
  | { type: 'SET_YEAR'; payload: number }
  | { type: 'SET_MONTH'; payload: number }
  | { type: 'SET_DATE'; payload: number | null }
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'ne' }
  | { type: 'PREV_MONTH' }
  | { type: 'NEXT_MONTH' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MONTH_DATA'; payload: MonthData | null }; 