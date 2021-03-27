import '@reach/dialog/styles.css';
import { useState } from 'react';
import { Overlay, Content, Header, Title } from './style';
import IconButton from '@Common/IconButton';
import Button from '@Common/Button';
import { CloseIcon } from '@Common/Icons';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import { useAuth } from '@Context/auth/authContext';
import Form from './Form';
import FormLoader from './FormLoader';
import { useFetchAccountsAndCategoriesQuery } from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import { ViewError } from '@Components/ErrorViews';

export interface TransactionFields {
  date: Date;
  accountId: string;
  type: string;
  payee: string;
  description: string;
  amount: string;
  categoryId: string;
}

function TransactionForm() {
  const { data, loading, error } = useFetchAccountsAndCategoriesQuery();
  const [showDialog, setShowDialog] = useState(false);
  const smallDevice = useMediaQuery('(max-width: 605px)');
  const { showAlert } = useAlert();
  const {
    state: { user },
  } = useAuth();
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const onFormSubmit = (values: TransactionFields) => {
    //: Partial<Transaction>
    const newValues = {
      ...values,
      userId: user?.id,
      // replace the possible commas in the amount or the math won't be right
      // e.g. 1,000.00 will be parsed to 100 rather than 1000
      amount: parseFloat(values.amount.replace(/,/g, '')) * 100,
    };
    console.log(newValues);
    showAlert('Hello from alert!', 'info');
  };

  //TODO: Make sure each field is trimmed
  return (
    <div>
      <Button onClick={open} variant="primary">
        {smallDevice ? 'New' : 'New Transaction'}
      </Button>
      <Overlay isOpen={showDialog} onDismiss={close}>
        <Content aria-label="Add transaction form">
          <Header>
            <IconButton blue small onClick={close} ariaText="Close">
              <CloseIcon />
            </IconButton>
            <Title>Add transaction</Title>
          </Header>
          {data && (
            <Form
              onFormSubmit={onFormSubmit}
              categories={data.getCategories}
              accounts={data.getAccounts}
            />
          )}
          {loading && <FormLoader />}
          {error && (
            <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
              <ViewError
                reload
                subheading="We ran into trouble loading your accounts and categories. If you think something has gone wrong, please contact us."
              />
            </div>
          )}
        </Content>
      </Overlay>
    </div>
  );
}

export default TransactionForm;
