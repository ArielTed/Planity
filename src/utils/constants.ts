import { Event } from './types';

export const CALENDAR_START = '09:00';
export const CALENDAR_END = '21:00';

export const EVENTS: Event[] = [
  { id: 1, start: '13:00', duration: 60 },
  { id: 2, start: '13:30', duration: 120 },
  { id: 3, start: '15:00', duration: 60 },
];

export const EVENTS2: Event[] = [
  { id: 1, start: '10:00', duration: 90 },
  { id: 2, start: '13:00', duration: 120 },
  { id: 3, start: '13:00', duration: 60 },
  { id: 4, start: '16:00', duration: 60 },
  { id: 5, start: '16:30', duration: 120 },
  { id: 6, start: '18:00', duration: 60 },
];

export const EVENTS3: Event[] = [
  { id: 1, start: '10:00', duration: 90 },
  { id: 2, start: '13:00', duration: 120 },
  { id: 3, start: '13:00', duration: 60 },
  { id: 4, start: '16:00', duration: 120 },
  { id: 5, start: '16:00', duration: 60 },
];
