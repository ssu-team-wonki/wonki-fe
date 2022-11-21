import { Container, Grid, Input, Button, Image, Link } from '@nextui-org/react';
import { useState } from 'react';
import { Message, Lock } from 'react-iconly';

import Logo from '../assets/images/logo.png';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

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
          <Button css={{ width: '100%' }}>로그인</Button>
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
