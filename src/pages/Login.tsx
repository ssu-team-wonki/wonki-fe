import { Container, Grid, Input, Button, Image, Link } from '@nextui-org/react';
import { useState } from 'react';
import { Message, Lock } from 'react-iconly';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../providers/AuthProvider';

import Logo from '../assets/images/logo.png';
import { toast } from 'react-toastify';
import { fetchLogin, getLoginUserInfo } from '../services/user';

function Login() {
  const { saveToken, setProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const { token } = await fetchLogin(form);
      if (token) {
        const response = await getLoginUserInfo(token);
        setProfile({ ...response, email: form.email });
        saveToken(token);
        navigate('/');
      } else {
        toast.error('로그인 정보를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.log(error);
      toast.error('일시적인 오류입니다. 나중에 다시 시도해주세요.');
    }
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
