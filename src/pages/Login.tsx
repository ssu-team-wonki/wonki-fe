import { Container, Grid, Input, Button, Image } from "@nextui-org/react";

import Logo from "../assets/images/logo.png";

function Login() {
  return (
    <Container xs>
      <Grid.Container gap={1.5} direction={"column"}>
        <Grid style={{ marginBottom: 20 }}>
          <Image src={Logo} width={180} />
        </Grid>
        <Grid>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
          />
        </Grid>
        <Grid>
          <Input fullWidth placeholder="Password" />
        </Grid>
        <Grid>
          <Button css={{ width: "100%" }}>Log in</Button>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

export default Login;
