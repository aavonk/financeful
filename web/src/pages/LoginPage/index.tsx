import * as React from 'react';
import { Card, CardBody } from '@Common/Card';
import IconSvg from '@Common/LogoSvg/IconSvg';
import { Container, Brand, ErrorMessage } from './style';
import { UnderlineInput } from '@Common/FormElements';
import { useForm } from '@Hooks/useForm';
import Button from '@Common/Button';
import { useLoginMutation } from '@Generated/graphql';
import { isApolloError } from '@apollo/client';

type User = {
  email: string;
  password: string;
};

type LoginErrors = {
  email?: string;
  password?: string;
  general?: string;
};

function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [loginErrors, setLoginErrors] = React.useState<LoginErrors | {}>({});
  const [loginMutation] = useLoginMutation();

  const { values, handleChange, handleSubmit } = useForm<User>({
    initialValue: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      submitHandler(values);
    },
  });

  const submitHandler = async (values: User) => {
    try {
      const response = await loginMutation({
        variables: { email: values.email, password: values.password },
      });

      if (response.data?.login) {
        console.log(response.data.login);
      }
    } catch (e) {
      if (isApolloError(e)) {
        for (const error of e.graphQLErrors) {
          const err: LoginErrors = error.extensions?.errors;
          console.log(error.extensions?.errors);
          setLoginErrors(err);
        }
      } else {
        setLoginErrors({
          general: 'An error has occured. Please try again later',
        });
      }
    }
  };
  return (
    <Container>
      {Object.keys(loginErrors).length > 0 &&
        Object.values(loginErrors).map((err) => (
          <ErrorMessage role="alert" key={err}>
            {err}
          </ErrorMessage>
        ))}
      <Card minWidth="400px">
        <CardBody>
          <Brand>
            <h1>financeful</h1>
            <IconSvg />
          </Brand>
          <form onSubmit={handleSubmit}>
            <UnderlineInput
              type="text"
              id="email"
              value={values.email}
              onChange={handleChange('email')}
            >
              Email
            </UnderlineInput>
            <UnderlineInput
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange('password')}
            >
              Password
            </UnderlineInput>
            <Button type="submit" fullWidth outline margin="1.2rem 0 0 0">
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default LoginPage;
