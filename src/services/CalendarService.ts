import { CalendarDay, MonthData,  } from '../types/calendar';
import { ICalendarRepository } from '../repositories/CalendarRepository';
import NepaliDate from 'nepali-date-converter';
import { CalendarEvent } from '../types/events';

export class CalendarService {
  constructor(private repository: ICalendarRepository) {}

  async getMonthDays(year: number, month: number): Promise<CalendarDay[]> {
    try {
      const [days, holidays, events] = await Promise.all([
        this.repository.getMonthDays(year, month),
        this.repository.getHolidays(year, month),
        this.repository.getEvents(year, month)
      ]);

      return days.map(day => ({
        ...day,
        holiday: holidays.has(day.bsDate),
        events: events.get(day.bsDate) || [] as CalendarEvent[]
      }));
    } catch (error) {
      console.error('Error fetching month days:', error);
      throw new Error('Failed to fetch month days');
    }
  }

  async getMonthData(year: number, month: number): Promise<MonthData> {
    try {
      const monthData = await this.repository.getMonthData(year, month);
      const holidays = await this.repository.getHolidays(year, month);
      const events = await this.repository.getEvents(year, month);

      return {
        ...monthData,
        days: monthData.days.map(day => ({
          ...day,
          holiday: holidays.has(day.bsDate),
          events: events.get(day.bsDate) || [] as CalendarEvent[]
        }))
      };
    } catch (error) {
      console.error('Error fetching month data:', error);
      throw new Error('Failed to fetch month data');
    }
  }

  getCurrentBSDate(): { year: number; month: number; day: number } {
    const today = new NepaliDate();
    return {
      year: today.getYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }

  getYearRange(): number[] {
    const years: number[] = [];
    for (let year = 2000; year <= 2100; year++) {
      years.push(year);
    }
    return years;
  }
} 