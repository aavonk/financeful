/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@reach/dialog/styles.css';
import { useState } from 'react';
import { Overlay, Content, Header, Title } from '../style';
import IconButton from '@Common/IconButton';
import Button from '@Common/Button';
import { CloseIcon } from '@Common/Icons';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import PaymentForm from './PaymentForm';
import FormLoader from '../FormLoader';
import {
  useFetchAccountsAndCategoriesQuery,
  useAddTransactionMutation,
  GetTransactionsDocument,
  TransactionInput,
} from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import { ViewError } from '@Components/ErrorViews';
import Progressbar from '@Common/Progressbar';

function TransactionForm() {
  const { data, loading, error } = useFetchAccountsAndCategoriesQuery();
  const [addTransactionMutation, submitting] = useAddTransactionMutation();
  const [showDialog, setShowDialog] = useState(false);
  const smallDevice = useMediaQuery('(max-width: 605px)');
  const { showAlert } = useAlert();

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const onFormSubmit = async (values: TransactionInput) => {
    const response = await addTransactionMutation({
      variables: { input: values },
      update: (cache, { data: createTransaction }) => {
        cache.modify({
          fields: {
            getTransactions: (existingFieldData = []) => {
              const newTransactionRef = cache.writeQuery({
                data: createTransaction,
                query: GetTransactionsDocument,
              });
              return [newTransactionRef, ...existingFieldData];
            },
          },
        });
      },
    });

    if (response.data?.createTransaction) {
      showAlert('Transaction successfully added', 'info');
    }
    if (response.errors) {
      showAlert('There was an error creating your transaction', 'error', 5000);
    }
  };

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
            <PaymentForm
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
