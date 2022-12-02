import { Button, Collapse, Grid, Input, Modal, Switch, Table, Text, User } from '@nextui-org/react';
import { useState } from 'react';
import { Edit, Calendar, Delete } from 'react-iconly';
import { useWindowSize } from 'react-use';

import { Schedule } from '../../types/Calendar';
import { User as IUser } from '../../types/User';

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

const NotificationModal = ({ visible, onClose: closeHandler }: NotificationModalProps) => {
  const { width } = useWindowSize();
  const isMobile = width < 650;

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
          내 알람
        </Text>
      </Modal.Header>
      <Modal.Body></Modal.Body>
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

export default NotificationModal;
