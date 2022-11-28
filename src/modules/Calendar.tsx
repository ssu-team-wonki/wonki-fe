import type { Options } from '@toast-ui/calendar';
import TuiCalendar from '@toast-ui/react-calendar';
import { forwardRef } from 'react';

import { CalendarProps, Schedule } from '../types/Calendar';

import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import '../styles/calendar.css';

export const theme = {
  'month.dayname.fontSize': '13px',
  'month.schedule.borderRadius': '5px',
  'month.schedule.fontSize': '16px',
};

const templates: Options['template'] = {
  allday: function (schedule) {
    return schedule.raw.title;
  },
  milestone: function (schedule) {
    return schedule.raw.title;
  },
  task: function (schedule) {
    return schedule.raw.title;
  },
  time: function (schedule) {
    return schedule.raw.title;
  },
  popupIsAllday: function () {
    return '종일';
  },
  popupStateFree: function () {
    return '여유';
  },
  popupStateBusy: function () {
    return '바쁨';
  },
  titlePlaceholder: function () {
    return '제목';
  },
  locationPlaceholder: function () {
    return '위치';
  },
  startDatePlaceholder: function () {
    return '시작일';
  },
  endDatePlaceholder: function () {
    return '종료일';
  },
  popupSave: function () {
    return '저장';
  },
  popupUpdate: function () {
    return '변경';
  },
  popupDetailLocation: function (schedule) {
    return `장소 : ${schedule.location || ''}`;
  },
  popupDetailState: function (schedule) {
    return `상태 : ${schedule.state || ''}`;
  },
  popupDetailBody: function (schedule) {
    return `내용 : ${schedule.body || ''}`;
  },
  popupEdit: function () {
    return '수정';
  },
  popupDelete: function () {
    return '삭제';
  },
};

export const Calendar = forwardRef<TuiCalendar, CalendarProps>(function Calendar(
  { height, calendars, schedules, onScheduleClick },
  ref,
) {
  return (
    <TuiCalendar
      ref={ref}
      height={height}
      usageStatistics
      gridSelection={{
        enableClick: false,
        enableDblClick: false,
      }}
      view={'month'}
      calendars={calendars}
      events={schedules}
      isReadOnly
      useDetailPopup={false}
      useFormPopup={false}
      template={templates}
      theme={theme}
      onClickSchedule={({ schedule }) => onScheduleClick(schedule as Schedule)}
      week={{
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      }}
      month={{
        visibleEventCount: 3,
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      }}
    />
  );
});
