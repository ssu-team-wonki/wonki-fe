import { Button, Grid, Image, Text } from '@nextui-org/react';
import TuiCalendar from '@toast-ui/react-calendar';
import dayjs from 'dayjs';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Notification, Calendar, Edit } from 'react-iconly';
import update from 'immutability-helper';

import { Calendar as CustomCalendar } from '../../modules/Calendar';
import ScheduleModal from './ScheduleModal';
import { CalendarSchedule, Schedule } from '../../types/Calendar';
import { useAuth } from '../../providers/AuthProvider';
import {
  fetchAddSchedule,
  fetchRemoveSchedule,
  fetchUpdateSchedule,
  useCalendar,
} from '../../services/calendar';
import { getDateToStdDate } from '../../utils/date';

const scheduleNormalize = (schedules: Schedule[]): CalendarSchedule[] => {
  console.log(schedules);
  return schedules.map(schedule => {
    const isOwnSchedule = schedule.ownerId === schedule.userId;
    return {
      id: schedule.id,
      title: schedule.title,
      color: '#fff',
      borderColor: isOwnSchedule ? 'var(--nextui-colors-primary)' : '#31B547',
      backgroundColor: isOwnSchedule ? 'var(--nextui-colors-primary)' : '#31B547',
      start: dayjs(schedule.startDt).toDate(),
      end: dayjs(schedule.endDt).toDate(),
      raw: { ...schedule, users: [] },
    } as CalendarSchedule;
  });
};

function Main() {
  const calendarRef = useRef<TuiCalendar>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const [visibleScheduleModal, setVisibleScheduleModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<CalendarSchedule>();
  const [calendarDate, setCalendarDate] = useState(dayjs());

  const { data: calendarData, mutate } = useCalendar();

  const handlePrevMonth = () => {
    const prevMonth = calendarDate.subtract(1, 'month');
    if (!calendarRef.current) return;
    setCalendarDate(prevMonth);
    calendarRef.current.getInstance()?.setDate(prevMonth.toDate());
  };

  const handleNextMonth = () => {
    const nextMonth = calendarDate.add(1, 'month');
    if (!calendarRef.current) return;
    setCalendarDate(nextMonth);
    calendarRef.current.getInstance()?.setDate(nextMonth.toDate());
  };

  const handleCurrentMonth = () => {
    const today = dayjs();
    if (!calendarRef.current) return;
    setCalendarDate(today);
    calendarRef.current.getInstance()?.setDate(today.toDate());
    navigate('/');
  };

  useEffect(() => {
    if (!calendarRef.current) return;
    calendarRef.current.getInstance()?.setDate(calendarDate.toDate());
  }, [calendarDate]);

  const schedules = useMemo(() => {
    if (!calendarData) return [];
    return scheduleNormalize(calendarData);
  }, [calendarData]);

  return (
    <>
      <Grid.Container gap={2}>
        <Grid xs={6}>
          <Text size='larger' weight='bold' css={{ color: '$primary' }}>
            {calendarDate.format('YYYY년 MM월')}
          </Text>
        </Grid>
        <Grid xs={6}>
          <Grid.Container gap={0}>
            <Grid xs={4} justify='flex-end'>
              <Button auto light icon={<ChevronLeft />} onClick={handlePrevMonth} />
            </Grid>
            <Grid xs={4} justify='flex-end'>
              <Button auto light icon={<ChevronRight />} onClick={handleNextMonth} />
            </Grid>
            <Grid xs={4} justify='flex-end'>
              <Button
                auto
                icon={<Edit set='bold' />}
                onClick={() => {
                  setSelectedSchedule(undefined);
                  setVisibleScheduleModal(true);
                }}
              />
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>

      <CustomCalendar
        ref={calendarRef}
        height='calc(100vh - 64px * 2)'
        calendars={[]}
        schedules={schedules}
        onScheduleClick={schedule => {
          setSelectedSchedule(schedule);
          setVisibleScheduleModal(true);
        }}
      />

      <Grid.Container gap={2}>
        <Grid xs={4} justify='center' css={{ borderTop: '1px solid $border' }}>
          <Button
            auto
            light
            css={{ color: '$primary' }}
            icon={<Calendar set='bold' primaryColor='currentColor' />}
            onClick={handleCurrentMonth}
          />
        </Grid>
        <Grid xs={4} justify='center' css={{ borderTop: '1px solid $border' }}>
          <Button
            auto
            light
            css={{ color: '$primary' }}
            icon={<Notification set='bold' primaryColor='gray' />}
          />
        </Grid>
        <Grid
          xs={4}
          justify='center'
          css={{ borderTop: '1px solid $border', lineHeight: '40px', alignItems: 'center' }}
        >
          {auth.user && (
            <Image
              src={auth.user.profileImage}
              width={28}
              height={28}
              css={{
                borderRadius: '50%',
              }}
            />
          )}
        </Grid>
      </Grid.Container>

      {visibleScheduleModal && (
        <ScheduleModal
          schedule={selectedSchedule}
          visible={visibleScheduleModal}
          onSubmit={schedule => {
            if (!selectedSchedule) {
              fetchAddSchedule({
                title: schedule.title,
                contents: schedule.contents,
                isAllDay: schedule.isAllDay,
                startDt: getDateToStdDate(dayjs(schedule.startDt).subtract(9, 'h').toDate()),
                endDt: getDateToStdDate(dayjs(schedule.endDt).subtract(9, 'h').toDate()),
                inviteUserList: [],
              }).then(({ id }) => {
                mutate(
                  update(calendarData, {
                    $push: [
                      {
                        id,
                        ...schedule,
                        userId: auth.user?.userId,
                        ownerId: auth.user?.userId,
                        accept: 'Y',
                        createdAt: getDateToStdDate(dayjs().toDate()),
                      } as Schedule,
                    ],
                  }),
                );
              });
            } else {
              if (!calendarData) return;

              fetchUpdateSchedule({
                id: selectedSchedule.raw.id,
                title: schedule.title,
                contents: schedule.contents,
                isAllDay: schedule.isAllDay,
                startDt: getDateToStdDate(dayjs(schedule.startDt).subtract(9, 'h').toDate()),
                endDt: getDateToStdDate(dayjs(schedule.endDt).subtract(9, 'h').toDate()),
                inviteUserList: [],
              }).then(() => {
                const scheduleIndex = calendarData.findIndex(
                  schedule => schedule.id === selectedSchedule.raw.id,
                );

                mutate(
                  update(calendarData, {
                    [scheduleIndex]: {
                      $set: {
                        id: selectedSchedule.raw.id,
                        userId: auth.user?.userId,
                        ownerId: auth.user?.userId,
                        accept: 'Y',
                        createdAt: getDateToStdDate(dayjs().toDate()),
                        ...schedule,
                      } as Schedule,
                    },
                  }),
                );
              });
            }
          }}
          onRemove={id => {
            fetchRemoveSchedule({ id }).then(response => {
              if (!calendarData) return;
              const scheduleIndex = calendarData.findIndex(schedule => schedule.id === id);

              mutate(
                update(calendarData, {
                  $splice: [[scheduleIndex, 1]],
                }),
              );
            });
          }}
          onClose={() => {
            setSelectedSchedule(undefined);
            setVisibleScheduleModal(false);
          }}
        />
      )}
    </>
  );
}

export default Main;
