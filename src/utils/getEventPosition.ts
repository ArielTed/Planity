import { CALENDAR_START, CALENDAR_END } from './constants';
import { Event, EventPosition, EventLayout } from './types';

const convertTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const sortEventsByTime = (events: Event[]): Event[] => {
  return [...events].sort((a, b) => convertTimeToMinutes(a.start) - convertTimeToMinutes(b.start));
};

const isOverlapping = (event1: Event, event2: Event): boolean => {
  const start1 = convertTimeToMinutes(event1.start);
  const end1 = start1 + event1.duration;
  const start2 = convertTimeToMinutes(event2.start);
  const end2 = start2 + event2.duration;

  return start1 < end2 && start2 < end1;
};

// Function to calculate event position on the vertical axis based on its start time relative to the calendar's start time,
// with top and height calculated to fit within the screen height.
export const getEventPosition = (event: Event, windowHeight: number): EventPosition => {
  const eventStartMinutes = convertTimeToMinutes(event.start);
  const calendarStartMinutes = convertTimeToMinutes(CALENDAR_START);
  const calendarEndMinutes = convertTimeToMinutes(CALENDAR_END);

  const totalCalendarMinutes = calendarEndMinutes - calendarStartMinutes;
  const eventStartFromCalendarStart = eventStartMinutes - calendarStartMinutes;
  const pixelPerMinute = windowHeight / totalCalendarMinutes;

  const topPosition = eventStartFromCalendarStart * pixelPerMinute;
  const eventHeight = event.duration * pixelPerMinute;

  return { top: topPosition, height: eventHeight };
};

// Function to find overlapping events, sort them, and then place them side by side horizontally with equal width,
// ensuring that they do not visually overlap.
// The left position is calculated to distribute the events evenly across the available window width.
export const getEventLayout = (events: Event[], windowHeight: number, windowWidth: number): EventLayout[] => {
  const sortedEvents = sortEventsByTime(events);

  const eventLayout: EventLayout[] = [];

  // Iterate through each event
  let i = 0;
  while (i < sortedEvents.length) {
    // Find events that overlap with current event of the loop (sortedEvents[i])
    const overlappingEvents = sortedEvents.filter(
      (otherEvent) => otherEvent.id !== sortedEvents[i].id && isOverlapping(sortedEvents[i], otherEvent)
    );
    // All events overlapping with current event, including the current event
    const currentLineEvents = [sortedEvents[i], ...sortEventsByTime(overlappingEvents)];

    // Calculate position of each events of the line
    currentLineEvents.forEach((overlappingEvent, index, array) => {
      const { top, height } = getEventPosition(overlappingEvent, windowHeight);
      const left = (windowWidth / array.length) * index;
      const width = windowWidth / array.length;
      if (!eventLayout.find((layout) => layout.id === overlappingEvent.id)) {
        // If the event is not already in the result array, add it
        eventLayout.push({ top, left, width, height, id: overlappingEvent.id });
      }
    });

    // Skip to the next event that was not part of the group of overlapping events determined in this loop
    i += currentLineEvents.length;
  }

  return eventLayout;
};
