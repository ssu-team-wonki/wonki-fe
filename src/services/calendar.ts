import { Schedule } from '../types/Calendar';
import { request, useBaseSWRFetcher } from './base';

interface SchedulePrams {
  title: string;
  contents: string;
  isAllDay: 'Y' | 'N';
  startDt: string;
  endDt: string;
  inviteUserList: string[];
}

export interface ScheduleResponse {
  id: number;
}

export const fetchAddSchedule = (body: SchedulePrams) =>
  request<ScheduleResponse>({
    method: 'POST',
    url: 'calendar/add',
    body,
  });

export const fetchUpdateSchedule = (body: SchedulePrams & { id: number }) =>
  request<ScheduleResponse>({
    method: 'POST',
    url: 'calendar/update',
    body,
  });

export const fetchRemoveSchedule = (body: { id: number }) =>
  request<ScheduleResponse>({
    method: 'POST',
    url: 'calendar/delete',
    body,
  });

export const useCalendar = () => useBaseSWRFetcher<Schedule[]>('calendar/get');
