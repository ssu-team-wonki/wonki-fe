import { Container, Grid, Input, Button, Image, Link } from '@nextui-org/react';

import Logo from '../assets/images/logo.png';

function Register() {
  return (
    <Container
      xs
      display='flex'
      alignItems='center'
      justify='center'
      css={{ maxW: 480, h: '100vh' }}
    >
      <Grid.Container gap={1.5} direction='column'>
        <Grid style={{ marginBottom: 20 }}>
          <Image draggable={false} src={Logo} width={180} />
        </Grid>
        <Grid>
          <Input color='primary' bordered fullWidth placeholder='Email' />
        </Grid>
        <Grid>
          <Input.Password color='primary' bordered fullWidth placeholder='비밀번호' />
        </Grid>
        <Grid>
          <Button css={{ width: '100%' }}>로그인</Button>
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
