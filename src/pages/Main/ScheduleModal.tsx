import { Button, Collapse, Grid, Input, Modal, Switch, Table, Text, User } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Edit, Calendar, Delete } from 'react-iconly';
import { useWindowSize } from 'react-use';

import { CalendarSchedule, SchedulePayload } from '../../types/Calendar';
import { User as IUser } from '../../types/User';
import { getDateToStdDate, getInputDateFormat } from '../../utils/date';

interface ScheduleModalProps {
  schedule?: CalendarSchedule;
  visible: boolean;
  onSubmit: (schedule: SchedulePayload) => void;
  onRemove: (scheduleId: number) => void;
  onClose: () => void;
}

const columns: { key: keyof IUser; label: string }[] = [
  {
    key: 'username',
    label: '사용자',
  },
  {
    key: 'userId',
    label: '설정',
  },
];

const renderCell = (user: IUser, columnKey: keyof IUser) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case 'username':
      return (
        <User squared src={user.profileImage} name={cellValue} css={{ p: 0 }}>
          {user.email}
        </User>
      );
    case 'userId':
      return (
        <>
          <Delete set='bold' />
          <Delete set='bold' />
        </>
      );
  }
};

const initSchedulePayload: SchedulePayload = {
  title: '',
  contents: '',
  isAllDay: 'N',
  startDt: '',
  endDt: '',
  users: [],
};

const ScheduleModal = ({
  schedule,
  visible,
  onRemove,
  onSubmit,
  onClose: closeHandler,
}: ScheduleModalProps) => {
  const { width } = useWindowSize();
  const isMobile = width < 650;
  const isEditMode = !!schedule;

  const [schedulePayload, setSchedulePayload] = useState<SchedulePayload>(
    isEditMode ? schedule.raw : initSchedulePayload,
  );

  // const isAllday =
  //   dayjs(schedulePayload.startDt).format('HH:mm:ss') === '00:00:00' &&
  //   dayjs(schedulePayload.endDt).format('HH:mm:ss') === '23:59:59';
  const [allday, setAllday] = useState(schedulePayload.isAllDay === 'Y');

  return (
    <Modal
      closeButton
      fullScreen={isMobile}
      autoMargin
      width={'70%'}
      aria-labelledby='schedule-modal'
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text size={18}>{isEditMode ? '스케쥴 수정' : '스케쥴 등록'}</Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color='primary'
          placeholder='스케쥴 제목'
          initialValue={schedulePayload.title}
          onChange={({ currentTarget }) =>
            setSchedulePayload({ ...schedulePayload, title: currentTarget.value })
          }
          contentLeft={<Edit />}
        />
        <Input.Textarea
          bordered
          fullWidth
          color='primary'
          placeholder='스케쥴 내용'
          initialValue={schedulePayload.contents}
          onChange={({ currentTarget }) =>
            setSchedulePayload({ ...schedulePayload, contents: currentTarget.value })
          }
        />

        <Grid.Container>
          <Grid xs={3}>
            <Text>하루 종일</Text>
          </Grid>
          <Grid xs={9}>
            <Switch
              checked={allday}
              onChange={() => {
                setSchedulePayload(prev => ({
                  ...prev,
                  isAllDay: prev.isAllDay === 'Y' ? 'N' : 'Y',
                }));
                setAllday(prev => !prev);
              }}
            />
          </Grid>
        </Grid.Container>

        <Grid.Container css={{ mt: 20 }}>
          <Grid xs={3} alignItems='center'>
            <Text>시작시간</Text>
          </Grid>
          <Grid xs={9}>
            <Input
              type={allday ? 'date' : 'datetime-local'}
              bordered
              fullWidth
              color='primary'
              placeholder='스케쥴 시작 시간'
              contentLeft={<Calendar set='bold' />}
              value={getInputDateFormat(allday, schedulePayload.startDt)}
              onChange={({ currentTarget }) =>
                setSchedulePayload(prev => ({
                  ...prev,
                  startDt: allday
                    ? getDateToStdDate(dayjs(currentTarget.value).format('YYYY-MM-DD 00:00:00'))
                    : getDateToStdDate(currentTarget.value),
                }))
              }
            />
          </Grid>
        </Grid.Container>

        <Grid.Container css={{ mt: 20 }}>
          <Grid xs={3} alignItems='center'>
            <Text>종료시간</Text>
          </Grid>
          <Grid xs={9}>
            <Input
              type={allday ? 'date' : 'datetime-local'}
              bordered
              fullWidth
              color='primary'
              placeholder='스케쥴 종료 시간'
              contentLeft={<Calendar set='bold' />}
              min={getInputDateFormat(allday, schedulePayload.startDt)}
              value={getInputDateFormat(allday, schedulePayload.endDt)}
              onChange={({ currentTarget }) =>
                setSchedulePayload(prev => ({
                  ...prev,
                  endDt: allday
                    ? getDateToStdDate(dayjs(currentTarget.value).format('YYYY-MM-DD 23:59:59'))
                    : getDateToStdDate(currentTarget.value),
                }))
              }
            />
          </Grid>
        </Grid.Container>

        <Grid.Container css={{ mt: 20 }}>
          <Grid xs={3} alignItems='center'>
            <Text>사용자</Text>
          </Grid>
          <Grid xs={9}>
            <Collapse
              css={{ w: '100%' }}
              bordered
              title=' '
              subtitle='0명의 사용자가 초대되었습니다.'
            >
              <Table
                css={{
                  height: 'auto',
                  minWidth: '100%',
                }}
              >
                <Table.Header columns={columns}>
                  {column => <Table.Column key={column.key}>{column.label}</Table.Column>}
                </Table.Header>
                <Table.Body items={schedulePayload.users}>
                  {item => (
                    <Table.Row>
                      {columnKey => (
                        <Table.Cell>{renderCell(item, columnKey as keyof IUser)}</Table.Cell>
                      )}
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </Collapse>
          </Grid>
        </Grid.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color='default' onClick={closeHandler}>
          취소
        </Button>
        {isEditMode && (
          <Button
            auto
            flat
            color='error'
            onClick={() => {
              onRemove(schedule.id);
              closeHandler();
            }}
          >
            삭제
          </Button>
        )}
        <Button
          auto
          onClick={() => {
            onSubmit(schedulePayload);
            closeHandler();
          }}
        >
          {isEditMode ? '수정' : '등록'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScheduleModal;
