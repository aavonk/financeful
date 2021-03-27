import '@reach/dialog/styles.css';
import { useState } from 'react';
import { Overlay, Content, Header, Title } from './style';
import IconButton from '@Common/IconButton';
import Button from '@Common/Button';
import { CloseIcon } from '@Common/Icons';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import Form from './Form';
import FormLoader from './FormLoader';
import {
  useFetchAccountsAndCategoriesQuery,
  useAddTransactionMutation,
} from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import { ViewError } from '@Components/ErrorViews';
import Progressbar from '@Common/Progressbar';
import { useTransactions } from '@Context/transactions/transactionContext';

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
  const [addTransactionMutation, submitting] = useAddTransactionMutation();
  const { dispatch } = useTransactions();
  const [showDialog, setShowDialog] = useState(false);
  const smallDevice = useMediaQuery('(max-width: 605px)');
  const { showAlert } = useAlert();

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const onFormSubmit = async (values: TransactionFields) => {
    const newValues = {
      ...values,
      // replace the possible commas in the amount or the math won't be right
      // e.g. 1,000.00 will be parsed to 100 rather than 1000
      amount: parseFloat(values.amount.replace(/,/g, '')) * 100,
    };
    const response = await addTransactionMutation({
      variables: { input: newValues },
    });

    if (response.data?.createTransaction) {
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: response.data.createTransaction,
      });
      showAlert('Transaction successfully added', 'info');
    }
    if (response.errors) {
      showAlert('There was an error creating your transaction', 'error', 5000);
    }
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
          {submitting.loading && <Progressbar />}
          {data && (
            <Form
              onFormSubmit={onFormSubmit}
              categories={data.getCategories}
              accounts={data.getAccounts}
              isSubmitting={submitting.loading}
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
