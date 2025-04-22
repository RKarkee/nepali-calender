import React from 'react'
import { useCalendar } from '../context/CalendarContext'
import { DayData } from '../types/calendar'

export const Calendar: React.FC = () => {
  const { state, dispatch } = useCalendar()
  const { isLoading, error, monthData, selectedDate, language } = state
  const isNepali = language === 'ne'

  const setSelectedDate = (day: DayData) => {
    dispatch({ type: 'SET_DATE', payload: day })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !monthData) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error || 'Failed to load calendar data'}
      </div>
    )
  }

  const weekdays = isNepali
    ? ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const startDate = new Date(monthData.startDateAD)
  const startDayOffset = startDate.getDay()

  const renderCalendarDays = () => {
    const days = []
    
    // Add empty cells for offset days
    for (let i = 0; i < startDayOffset; i++) {
      days.push(
        <button key={`empty-${i}`} className="p-2 text-center" disabled>
          <span className="text-gray-400"></span>
        </button>
      )
    }

    // Add calendar days
    monthData.days.forEach((day: DayData) => {
      const isSelected = selectedDate?.dateBS === day.dateBS
      const isToday = new Date().toISOString().split('T')[0] === day.dateAD

      days.push(
        <button
          key={day.dateBS}
          onClick={() => setSelectedDate(day)}
          className={`
            p-2 text-center rounded-lg transition-colors
            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
            ${isToday ? 'ring-2 ring-blue-500' : ''}
          `}
        >
          <span className="block text-sm font-semibold">
            {isNepali ? day.dateBS.split('-')[2] : new Date(day.dateAD).getDate()}
          </span>
          {day.events.length > 0 && (
            <span className="block w-2 h-2 mx-auto mt-1 bg-red-500 rounded-full"></span>
          )}
        </button>
      )
    })

    return days
  }

  const daysWithEvents = monthData.days.filter((day: DayData) => day.events.length > 0)

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg p-4 gap-4">
      {/* Calendar Grid */}
      <div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((day: string) => (
            <div key={day} className="p-2 text-center font-semibold bg-gray-50">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Month Events */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">
          {isNepali ? 'महिनाका कार्यक्रमहरू' : 'Month Events'}
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-custom">
          {daysWithEvents.map((day: DayData) => (
            <div
              key={day.dateBS}
              className="p-2 bg-gray-50 rounded"
            >
              <div className="font-semibold">
                {isNepali ? day.dateBS : day.dateAD}
              </div>
              <ul className="list-disc list-inside">
                {day.events.map((event: string, index: number) => (
                  <li key={index} className="text-sm">{event}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 