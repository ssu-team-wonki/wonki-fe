import type { Options, EventObject } from '@toast-ui/calendar';
import { User } from './User';

export type CalendarSchedule = Omit<EventObject, 'raw'> & {
  raw: Schedule;
};

export interface Schedule {
  id: number;
  userId: number;
  title: string;
  contents: string;
  isAllDay: 'Y' | 'N';
  startDt: string;
  endDt: string;
  ownerId: number;
  users: User[];
  accept: 'Y' | 'N';
  createdAt: string;
}

export interface SchedulePayload {
  id?: number;
  title: string;
  contents: string;
  isAllDay: 'Y' | 'N';
  startDt: string;
  endDt: string;
  users: User[];
}

export interface CalendarProps {
  height: string;
  calendars: Options['calendars'];
  schedules: CalendarSchedule[];
  onScheduleClick: (schedule: CalendarSchedule) => void;
}
