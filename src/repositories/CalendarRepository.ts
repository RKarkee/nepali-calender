import { CalendarDay, EventsData, MonthData } from '../types/calendar';
import { CalendarEvent } from '../types/events';
import NepaliDate from 'nepali-date-converter';
import { getMonthStartDay, getDaysInMonth, NEPALI_MONTHS } from '../utils/calendar';
import eventsData from '../data/events.json';

export interface ICalendarRepository {
  getMonthDays(year: number, month: number): Promise<CalendarDay[]>;
  getMonthData(year: number, month: number): Promise<MonthData>;
  getHolidays(year: number, month: number): Promise<Set<string>>;
  getEvents(): Promise<Map<string, string[]>>;
}

export class CalendarRepository implements ICalendarRepository {
  private events: EventsData = eventsData as unknown as EventsData;

  async getMonthDays(year: number, month: number): Promise<CalendarDay[]> {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getMonthStartDay(year, month);
    const days: CalendarDay[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({
        bsDate: '',
        adDate: '',
        tithi: '',
        events: [],
        holiday: false,
        horoscope: ''
      });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const nepaliDate = new NepaliDate(year, month - 1, day);
      const adDate = nepaliDate.toJsDate();
      
      // Format the date to ensure correct timezone handling
      const formattedAdDate = new Date(adDate.getTime() - (adDate.getTimezoneOffset() * 60000))
        .toISOString()
        .split('T')[0];
      
      const events = this.getEventsForDate(year, month, day);
      const isHoliday = events.some(event => event.type === 'holiday');
      const tithi = events.find(event => event.type === 'tithi')?.title || '';

      days.push({
        bsDate: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        adDate: formattedAdDate,
        tithi,
        events,
        holiday: isHoliday,
        horoscope: '' // TODO: Add horoscope calculation
      });
    }

    return days;
  }

  getEventsForDate(year: number, month: number, date: number): CalendarEvent[] {
    const yearStr = year.toString();
    const monthStr = month.toString();
    const dateStr = date.toString();

    return this.events[yearStr]?.[monthStr]?.[dateStr] || [];
  }

  async getMonthData(year: number, month: number): Promise<MonthData> {
    const days = await this.getMonthDays(year, month);
    const startDate = new NepaliDate(year, month - 1, 1);
    
    return {
      year,
      month,
      monthName: NEPALI_MONTHS.en[month - 1],
      startDate: {
        ad: startDate.toJsDate().toISOString().split('T')[0]
      },
      days
    };
  }

  async getHolidays(year: number, month: number): Promise<Set<string>> {
    const days = await this.getMonthDays(year, month);
    const holidays = new Set<string>();
    
    days.forEach(day => {
      if (day.holiday) {
        holidays.add(day.bsDate);
      }
    });

    return holidays;
  }

  async getEvents(): Promise<Map<string, string[]>> {
    const eventsMap = new Map<string, string[]>();
    
    // Convert events data to the expected format
    Object.entries(this.events).forEach(([year, months]) => {
      Object.entries(months).forEach(([month, dates]) => {
        Object.entries(dates).forEach(([date, events]) => {
          const bsDate = `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`;
          eventsMap.set(bsDate, events.map(event => event.title));
        });
      });
    });

    return eventsMap;
  }
} 