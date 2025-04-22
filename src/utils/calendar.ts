import { MonthData } from '../types/calendar'
import NepaliDate from 'nepali-date-converter'
import dayjs from 'dayjs'
import { CalendarDay } from '../types/calendar'

export const NEPALI_MONTHS = {
  ne: [
    'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
    'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'
  ],
  en: [
    'Baishakh', 'Jestha', 'Ashar', 'Shrawan', 'Bhadra', 'Ashwin',
    'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
  ]
}

export const NEPALI_WEEKDAYS = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ne: ['आइत', 'सोम', 'मंगल', 'बुध', 'बिही', 'शुक्र', 'शनि']
}

export const NEPALI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']

export const toNepaliDigits = (number: number): string => {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']
  return number.toString().split('').map(digit => nepaliDigits[parseInt(digit)]).join('')
}

export function getMonthData(year: number, month: number): Promise<MonthData> {
  // In a real app, this would fetch from an API
  return import(`../data/${year}/${month.toString().padStart(2, '0')}.json`)
}

export const getMonthStartDay = (year: number, month: number): number => {
  const date = new NepaliDate(year, month - 1, 1)
  return date.getDay()
}

export const getDaysInMonth = (year: number, month: number): number => {
  const lastDay = new NepaliDate(year, month, 0)
  return lastDay.getDate()
}

export const convertBSToAD = (year: number, month: number, day: number): Date => {
  const nepaliDate = new NepaliDate(year, month - 1, day)
  return nepaliDate.toJsDate()
}

export const convertADToBS = (date: Date): { year: number; month: number; day: number } => {
  const nepaliDate = new NepaliDate(date)
  return {
    year: nepaliDate.getYear(),
    month: nepaliDate.getMonth() + 1,
    day: nepaliDate.getDate()
  }
}

export function getCurrentBSDate(): { year: number; month: number; day: number } {
  const today = new NepaliDate()
  return {
    year: today.getYear(),
    month: today.getMonth() + 1, // NepaliDate months are 0-based
    day: today.getDate()
  }
}

export function getYearRange(): number[] {
  const years: number[] = []
  for (let year = 2000; year <= 2100; year++) {
    years.push(year)
  }
  return years
}

export function getMonthName(year: number, month: number, language: 'en' | 'ne'): string {
  return NEPALI_MONTHS[language][month - 1]
}

export function getADMonthRange(bsYear: number, bsMonth: number): { start: Date; end: Date } {
  const startBS = new NepaliDate(bsYear, bsMonth - 1, 1)
  const startAD = startBS.toJsDate()
  return {
    start: startAD,
    end: dayjs(startAD).add(1, 'month').toDate()
  }
}

export const getMonthDays = async (year: number, month: number): Promise<CalendarDay[]> => {
  const nepaliDate = new NepaliDate(year, month - 1, 1)
  const daysInMonth = new NepaliDate(year, month - 1, 1).getDate()
  const firstDayOfMonth = nepaliDate.getDay()

  const days: CalendarDay[] = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({
      bsDate: '',
      adDate: '',
      tithi: '',
      events: [],
      holiday: false,
      horoscope: ''
    })
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new NepaliDate(year, month - 1, day)
    const adDate = currentDate.toJsDate()
    
    days.push({
      bsDate: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
      adDate: adDate.toISOString().split('T')[0],
      tithi: '', // TODO: Add tithi calculation
      events: [], // TODO: Add event loading
      holiday: currentDate.getDay() === 0, // Sunday is a holiday
      horoscope: '' // TODO: Add horoscope calculation
    })
  }

  return days
} 