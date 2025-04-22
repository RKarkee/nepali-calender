export type EventType = 'holiday' | 'tithi' | 'event';

export interface CalendarEvent {
  type: EventType;
  title: string;
  description: string;
}

export interface EventsData {
  [year: string]: {
    [month: string]: {
      [date: string]: CalendarEvent[];
    };
  };
} 