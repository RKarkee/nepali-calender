import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { CalendarState, CalendarAction } from '../types/calendar'
import { CalendarService } from '../services/CalendarService'
import { CalendarRepository } from '../repositories/CalendarRepository'
import NepaliDate from 'nepali-date-converter'

const repository = new CalendarRepository()
const calendarService = new CalendarService(repository)

const initialState: CalendarState = {
  currentYear: calendarService.getCurrentBSDate().year,
  currentMonth: calendarService.getCurrentBSDate().month,
  selectedDate: null,
  language: 'ne',
  isLoading: false,
  error: null,
  monthData: null
}

const CalendarContext = createContext<{
  state: CalendarState
  dispatch: React.Dispatch<CalendarAction>
}>({
  state: initialState,
  dispatch: () => null
})

const calendarReducer = (state: CalendarState, action: CalendarAction): CalendarState => {
  switch (action.type) {
    case 'SET_YEAR':
      return { ...state, currentYear: action.payload }
    case 'SET_MONTH':
      return { ...state, currentMonth: action.payload }
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload }
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    case 'PREV_MONTH':
      if (state.currentMonth === 1) {
        return {
          ...state,
          currentYear: state.currentYear - 1,
          currentMonth: 12
        }
      }
      return { ...state, currentMonth: state.currentMonth - 1 }
    case 'NEXT_MONTH':
      if (state.currentMonth === 12) {
        return {
          ...state,
          currentYear: state.currentYear + 1,
          currentMonth: 1
        }
      }
      return { ...state, currentMonth: state.currentMonth + 1 }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_MONTH_DATA':
      return { ...state, monthData: action.payload }
    default:
      return state
  }
}

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState)

  useEffect(() => {
    const loadMonthData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })
        dispatch({ type: 'SET_ERROR', payload: null })
        const monthData = await calendarService.getMonthData(state.currentYear, state.currentMonth)
        dispatch({ type: 'SET_MONTH_DATA', payload: monthData })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'An error occurred' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    loadMonthData()
  }, [state.currentYear, state.currentMonth])

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  )
}

export const useCalendar = () => {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider')
  }
  return context
} 