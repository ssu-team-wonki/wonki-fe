import { Container, Grid, Input, Button, Image, Link } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { Message, Lock, User, Calendar } from 'react-iconly';

import Logo from '../assets/images/logo.png';
import { useInputs } from '../hooks/useInputs';
import { checkEmailRegex } from '../utils/regex';

function Register() {
  const today = useRef(dayjs().format('YYYY-MM-DD'));
  const passwordRef = useRef<HTMLInputElement>(null);

  const [form, onChange] = useInputs({
    email: { value: '', error: false, validator: checkEmailRegex },
    password: {
      value: '',
      error: false,
      validator: value => value.length > 8 && value === passwordRef.current?.value,
    },
    name: { value: '', error: false, validator: value => value.length >= 2 },
    birth: { value: '', error: false, validator: value => dayjs(value).isBefore(today.current) },
  });

  return (
    <Container
      xs
      display='flex'
      alignItems='center'
      justify='center'
      css={{ maxW: 480, minHeight: '100vh' }}
    >
      <Grid.Container gap={2.5} direction='column'>
        <Grid style={{ marginBottom: 20 }}>
          <Image src={Logo} width={180} />
        </Grid>
        <Grid>
          <Input
            type={'email'}
            color='primary'
            status={form.email.error ? 'error' : 'default'}
            helperText={form.email.error ? '이메일 형식이 올바르지 않습니다.' : ''}
            contentLeft={<Message />}
            name={'email'}
            value={form.email.value}
            onChange={onChange}
            bordered
            fullWidth
            placeholder='이메일'
          />
        </Grid>
        <Grid>
          <Input.Password
            ref={passwordRef}
            color='primary'
            contentLeft={<Lock />}
            bordered
            fullWidth
            placeholder='비밀번호'
          />
        </Grid>
        <Grid>
          <Input.Password
            color='primary'
            status={form.password.error ? 'error' : 'default'}
            helperText={
              form.password.error
                ? '비밀번호가 8자리 미만이거나 재입력 패스워드가 일치하지 않습니다.'
                : ''
            }
            contentLeft={<Lock />}
            value={form.password.value}
            name={'password'}
            onChange={onChange}
            bordered
            fullWidth
            placeholder='비밀번호 재입력'
          />
        </Grid>
        <Grid>
          <Input
            color='primary'
            status={form.name.error ? 'error' : 'default'}
            helperText={form.name.error ? '이름은 2자리 이상이어야 합니다.' : ''}
            contentLeft={<User />}
            value={form.name.value}
            name={'name'}
            onChange={onChange}
            bordered
            fullWidth
            placeholder='이름'
          />
        </Grid>
        <Grid>
          <Input
            type='date'
            color='primary'
            status={form.birth.error ? 'error' : 'default'}
            helperText={form.birth.error ? '생년월일을 올바르게 입력해주세요.' : ''}
            contentLeft={<Calendar />}
            value={form.birth.value}
            name={'birth'}
            onChange={onChange}
            bordered
            fullWidth
            max={today.current}
            placeholder='생년월일'
          />
        </Grid>
        <Grid>
          <Button css={{ width: '100%' }}>회원가입</Button>
        </Grid>
        <Grid>
          <Link css={{ margin: '0 auto' }} href='/login'>
            이미 계정이 있으신가요?
          </Link>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

export default Register;
