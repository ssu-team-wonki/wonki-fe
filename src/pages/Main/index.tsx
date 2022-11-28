import { Button, Grid, Image, Text } from '@nextui-org/react';
import TuiCalendar from '@toast-ui/react-calendar';
import dayjs from 'dayjs';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, Calendar, Edit } from 'react-iconly';

import { Calendar as CustomCalendar } from '../../modules/Calendar';
import ScheduleModal from './ScheduleModal';
import { Schedule } from '../../types/Calendar';
import { useAuth } from '../../Providers/AuthProvider';

function Main() {
  const calendarRef = useRef<TuiCalendar>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const [visibleScheduleModal, setVisibleScheduleModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
  const [calendarDate, setCalendarDate] = useState(dayjs());

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
        schedules={[]}
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
            icon={<Search set='bold' primaryColor='gray' />}
          />
        </Grid>
        <Grid
          xs={4}
          justify='center'
          css={{ borderTop: '1px solid $border', lineHeight: '40px', alignItems: 'center' }}
        >
          {auth.user && (
            <Image
              src={auth.user.profile_image}
              width={28}
              height={28}
              css={{
                borderRadius: '50%',
              }}
            />
          )}
        </Grid>
      </Grid.Container>

      <ScheduleModal
        schedule={selectedSchedule}
        visible={visibleScheduleModal}
        onClose={() => setVisibleScheduleModal(false)}
      />
    </>
  );
}

export default Main;
