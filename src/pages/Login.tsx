import { Container, Grid, Input, Button } from "@nextui-org/react";

function Login() {
  return (
    <Container xs sm fluid>
      <Grid.Container gap={1.5} direction={"column"}>
        <Grid>
          <Input fullWidth placeholder="Username" />
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
