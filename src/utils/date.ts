import dayjs from 'dayjs';

export const getDateToStdDate = (dt: Date | string) => {
  return dayjs(dt).format('YYYY-MM-DD HH:mm:ss');
};

export const getInputDateFormat = (isAllday: boolean, dt: Date | string) => {
  const date = dayjs(dt).format('YYYY-MM-DD');
  const time = dayjs(dt).format('HH:mm');
  if (isAllday) return date;
  return `${date}T${time}`;
};

export const getDateToAlldayFormat = (
  isAllday: boolean,
  dt: Date | string,
  useSecond?: boolean,
) => {
  let format = 'YYYY-MM-DD';
  if (!isAllday) {
    format += useSecond ? ' HH:mm:ss' : ' HH:mm';
  }
  return dayjs(dt).format(format);
};
