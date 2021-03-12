import * as React from 'react';
import { isApolloError } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import IconSvg from '@Common/LogoSvg/IconSvg';
import Button from '@Common/Button';
import { Card, CardBody } from '@Common/Card';
import { UnderlineInput } from '@Common/FormElements';
import { useForm } from '@Hooks/useForm';
import { useLoginMutation } from '@Generated/graphql';
import { useAuth } from '@Context/auth/authContext';
import { Container, Brand, ErrorMessage } from './style';

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
  const [loginErrors, setLoginErrors] = React.useState<
    LoginErrors | Record<string, never>
  >({});
  const [loginMutation, { loading }] = useLoginMutation();
  const { dispatch } = useAuth();
  const history = useHistory();

  const { values, handleChange, handleSubmit } = useForm<User>({
    initialValue: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      submitHandler(values);
    },
  });

  if (loading) {
    console.log('LOADINGGGGG');
  }

  const submitHandler = async (values: User) => {
    try {
      const response = await loginMutation({
        variables: { email: values.email, password: values.password },
      });

      if (response.data?.login) {
        dispatch({
          type: 'LOG_IN',
          payload: response.data.login,
        });
        history.push('/dashboard');
      }
    } catch (e) {
      if (isApolloError(e)) {
        for (const error of e.graphQLErrors) {
          const err: LoginErrors = error.extensions?.errors;
          setLoginErrors(err);
          dispatch({
            type: 'AUTH_ERROR',
            payload: err,
          });
        }
      } else {
        setLoginErrors({
          general: 'An error has occured. Please try again later',
        });
        dispatch({
          type: 'AUTH_ERROR',
          payload: { error: 'An error has occured in the login process.' },
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
              autoFocus={true}
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
