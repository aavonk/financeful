import '@reach/dialog/styles.css';
import { useState, useRef } from 'react';
import { Overlay, Content, Header, Title } from './style';
import IconButton from '@Common/IconButton';
import Button from '@Common/Button';
import { CloseIcon } from '@Common/Icons';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import Form from './Form';
// import { Transaction, Category, Account } from '@Generated/graphql';
import { useFetchCategoriesQuery } from '@Generated/graphql';

export interface TransactionFields {
  date: string;
  account: string;
  type: string;
  payee: string;
  description: string;
  amount: string;
  categoryId: string;
}

function TransactionForm() {
  const { data, loading, error } = useFetchCategoriesQuery();
  const [showDialog, setShowDialog] = useState(false);
  const initialRef = useRef<HTMLInputElement>(null);
  const smallDevice = useMediaQuery('(max-width: 605px)');

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const onFormSubmit = (values: TransactionFields) => {
    //: Partial<Transaction>
    const newValues = {
      ...values,
      accountId: 'testingaccountid',
      amount: parseFloat(values.amount) * 100,
      userId: 'asbcds',
    };
    console.log(newValues);
  };

  if (error) {
    //Dispatch an alert
    //Stil return a button, but with a different style so its not usable
    console.log(error);
  }
  //TODO: Make sure each field is trimmed
  return (
    <div>
      <Button onClick={open} variant="primary" disabled={loading}>
        {smallDevice ? 'New' : 'New Transaction'}
      </Button>
      <Overlay
        isOpen={showDialog}
        onDismiss={close}
        initialFocusRef={initialRef}
      >
        <Content aria-label="Add transaction form">
          <Header>
            <IconButton blue small onClick={close} ariaText="Close">
              <CloseIcon />
            </IconButton>
            <Title>Add transaction</Title>
          </Header>
          <Form
            initialRef={initialRef}
            onFormSubmit={onFormSubmit}
            categories={data?.getCategories}
          />
        </Content>
      </Overlay>
    </div>
  );
}

export default TransactionForm;
