import * as React from 'react';
import { Card, CardBody } from '@Common/Card';
import IconSvg from '@Common/LogoSvg/IconSvg';
import { Container, Brand } from './style';
import { UnderlineInput } from '@Common/FormElements';
import { useForm } from '@Hooks/useForm';
import Button from '@Common/Button';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
type User = {
  email: string;
  password: string;
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      displayName
      firstName
      token
      avatar
    }
  }
`;

function LoginPage() {
  const [loginErrors, setLoginErrors] = React.useState({});

  const { data, errors, handleChange, handleSubmit } = useForm<User>({
    validations: {
      email: {
        custom: {
          isValid: (value) => value.length > 6,
          message: 'This must be a valid email address',
        },
      },
      password: {
        custom: {
          isValid: (value) => value.length > 0,
          message: 'A password is required',
        },
      },
    },
    onSubmit: () => console.log(data),
    initialValue: {
      email: '',
      password: '',
    },
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      setLoginErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: data,
  });

  return (
    <Container>
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
              value={data.email}
              onChange={handleChange('email')}
            >
              Email
            </UnderlineInput>
            {errors && errors.email && <p>{errors.email}</p>}
            <UnderlineInput
              type="password"
              id="password"
              value={data.password}
              onChange={handleChange('password')}
            >
              Password
            </UnderlineInput>
            {errors && errors.password && <p>{errors.password}</p>}

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
