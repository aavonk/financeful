import React from 'react';
import { useHistory } from 'react-router-dom';
import { InsetInput } from '@Common/FormElements';
import { FormRow } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import { useLoginMutation } from '@Generated/graphql';
import { useAuth } from '@Context/auth/authContext';
import { useAlert } from '@Context/alert/alertContext';
import { Container, Header, Paper, Form } from './style';
import Progressbar from '@Common/Progressbar';
import Blob from './Blob';
import Logo from './Logo';
import Button from '@Common/Button';

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
  const [loginMutation, { loading }] = useLoginMutation();
  const { dispatch } = useAuth();
  const { showAlert } = useAlert();
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

      if (response.errors) {
        showAlert('Invalid Credentials', 'error');
      }
    } catch (e) {
      showAlert('Invalid Credentials', 'error');

      dispatch({
        type: 'AUTH_ERROR',
        payload: { error: 'An error has occured in the login process.' },
      });
    }
  };
  return (
    <Container>
      <Logo />
      <Blob />
      <Paper>
        <Form onSubmit={handleSubmit}>
          <Header>Welcome back!</Header>
          <FormRow>
            <InsetInput type="text" value={values.email} onChange={handleChange('email')}>
              Email
            </InsetInput>
          </FormRow>
          <FormRow>
            <InsetInput
              type="password"
              value={values.password}
              onChange={handleChange('password')}
            >
              Password
            </InsetInput>
          </FormRow>
          <FormRow style={{ marginTop: '20px' }}>
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              Log in
            </Button>
          </FormRow>
        </Form>
        {loading && <Progressbar />}
      </Paper>
    </Container>
  );
}

export default LoginPage;
