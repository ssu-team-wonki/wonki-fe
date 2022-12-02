import { Container, Grid, Input, Button, Image, Link } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { Message, Lock, User, Calendar } from 'react-iconly';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Logo from '../assets/images/logo.png';
import { useInputs } from '../hooks/useInputs';
import { fetchRegister } from '../services/user';
import { checkEmailRegex } from '../utils/regex';

function Register() {
  const today = useRef(dayjs().format('YYYY-MM-DD'));
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [form, onChange] = useInputs({
    email: { value: '', error: false, validator: checkEmailRegex },
    password: {
      value: '',
      error: false,
      validator: value => value.length > 3 && value === passwordRef.current?.value,
    },
    username: { value: '', error: false, validator: value => value.length >= 2 },
    birth: { value: '', error: false, validator: value => dayjs(value).isBefore(today.current) },
  });

  const handleRegister = () => {
    fetchRegister({
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      birthDt: dayjs(form.birth.value).format('YYYY-MM-DD'),
    })
      .then(response => {
        if (response) {
          toast.success('회원가입이 완료되었습니다.');
          navigate('/login');
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('일시적인 오류입니다. 나중에 다시 시도해주세요.', {
          type: 'error',
        });
      });
  };

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
                ? '비밀번호가 4자리 미만이거나 재입력 패스워드가 일치하지 않습니다.'
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
            status={form.username.error ? 'error' : 'default'}
            helperText={form.username.error ? '이름은 2자리 이상이어야 합니다.' : ''}
            contentLeft={<User />}
            value={form.username.value}
            name={'username'}
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
            name={'birth'}
            onChange={onChange}
            bordered
            fullWidth
            max={today.current}
            placeholder='생년월일'
          />
        </Grid>
        <Grid>
          <Button css={{ width: '100%' }} onClick={handleRegister}>
            회원가입
          </Button>
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
