import type { Options, EventObject } from '@toast-ui/calendar';
import { User } from './User';

export type Schedule = Omit<EventObject, 'raw'> & {
  raw: SchedulePayload;
};

export interface SchedulePayload {
  id: number;
  user_id: number;
  title: string;
  contents: string;
  start_at: string;
  end_at: string;
  owner_id: number;
  created_at: string;
  users: User[];
  updated_at: string;
}

export interface CalendarProps {
  height: string;
  calendars: Options['calendars'];
  schedules: Schedule[];
  onScheduleClick: (schedule: Schedule) => void;
}
