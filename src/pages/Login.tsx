import { Container, Grid, Input, Button, Image, Link } from '@nextui-org/react';
import { useState } from 'react';
import { Message, Lock } from 'react-iconly';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../Providers/AuthProvider';

import Logo from '../assets/images/logo.png';

function Login() {
  const { setProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    setProfile({
      id: 1,
      username: 'johndoe',
      profile_image: 'https://i.pravatar.cc/150?img=1',
      email: form.email,
      birth_dt: '1990-01-01',
      created_at: '2021-01-01',
      number: '123456789',
      updated_at: '2021-01-01',
    });

    navigate('/');
  };

  return (
    <Container
      xs
      display='flex'
      alignItems='center'
      justify='center'
      css={{ maxW: 480, minHeight: '100vh' }}
    >
      <Grid.Container gap={1.5} direction='column'>
        <Grid style={{ marginBottom: 20 }}>
          <Image src={Logo} width={180} />
        </Grid>
        <Grid>
          <Input
            color='primary'
            contentLeft={<Message />}
            onChange={e => setForm({ ...form, email: e.target.value })}
            bordered
            fullWidth
            placeholder='이메일'
          />
        </Grid>
        <Grid>
          <Input.Password
            color='primary'
            contentLeft={<Lock />}
            onChange={e => setForm({ ...form, password: e.target.value })}
            bordered
            fullWidth
            placeholder='비밀번호'
          />
        </Grid>
        <Grid>
          <Button css={{ width: '100%' }} onClick={handleLogin}>
            로그인
          </Button>
        </Grid>
        <Grid>
          <Link css={{ margin: '0 auto' }} href='/register'>
            아직 회원이 아니신가요?
          </Link>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

export default Login;
