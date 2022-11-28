import { Button, Collapse, Grid, Input, Modal, Switch, Table, Text, User } from '@nextui-org/react';
import { useState } from 'react';
import { Edit, Calendar, Delete } from 'react-iconly';
import { useWindowSize } from 'react-use';

import { Schedule, SchedulePayload } from '../../types/Calendar';
import { User as IUser } from '../../types/User';

interface ScheduleModalProps {
  schedule?: Schedule;
  visible: boolean;
  onClose: () => void;
}

const columns: { key: keyof IUser; label: string }[] = [
  {
    key: 'username',
    label: '사용자',
  },
  {
    key: 'id',
    label: '설정',
  },
];

const renderCell = (user: IUser, columnKey: keyof IUser) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case 'username':
      return (
        <User squared src={user.profile_image} name={cellValue} css={{ p: 0 }}>
          {user.email}
        </User>
      );
    case 'id':
      return (
        <>
          <Delete set='bold' />
          <Delete set='bold' />
        </>
      );
  }
};

const ScheduleModal = ({ schedule, visible, onClose: closeHandler }: ScheduleModalProps) => {
  const { width } = useWindowSize();
  const isMobile = width < 650;

  const [schedulePayload, setSchedulePayload] = useState<Partial<SchedulePayload>>(
    schedule
      ? schedule['raw']
      : {
          title: '',
          contents: '',
          start_at: '',
          end_at: '',
          users: [],
        },
  );

  const [allday, setAllday] = useState(false);

  return (
    <Modal
      closeButton
      fullScreen={isMobile}
      autoMargin
      width={'70%'}
      aria-labelledby='schedule-modal-title'
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id='modal-title' size={18}>
          스케쥴 수정
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color='primary'
          placeholder='스케쥴 설명'
          contentLeft={<Edit />}
        />
        <Input.Textarea bordered fullWidth color='primary' placeholder='스케쥴 내용' />

        <Grid.Container>
          <Grid xs={3}>
            <Text>하루 종일</Text>
          </Grid>
          <Grid xs={9}>
            <Switch checked={allday} onChange={() => setAllday(prev => !prev)} />
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
              placeholder='스케쥴 시작 시간'
              contentLeft={<Calendar set='bold' />}
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
              title=''
              subtitle='(n)명의 사용자가 초대되었습니다.'
            >
              <Table
                aria-label='Example table with dynamic content'
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
        <Button auto flat color='error' onClick={closeHandler}>
          취소
        </Button>
        <Button auto onClick={closeHandler}>
          수정
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScheduleModal;
