import { useState } from 'react';
import IconButton from '@Common/IconButton';
import Button from '@Common/Button';
import Progressbar from '@Common/Progressbar';
import { CloseIcon } from '@Common/Icons';
import {
  Transaction,
  Category,
  Account,
  TransactionInput,
} from '@Generated/graphql';
import { Overlay, Content, Header, Title, Body, Footer } from '../style';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
  BorderedDatePicker,
} from '@Common/FormElements';
import { Row, Col } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import {
  isValidCurrencyFormat,
  formatMoneyFromCentsToDollars,
  convertInputAmountToCents,
} from '@Lib/money-utils';
import { TransactionFields } from '../types';
import FormLoader from '../FormLoader';

type Props = {
  transaction: Transaction;
  categories: Category[] | undefined;
  accounts: Account[] | undefined;
  isOpen: boolean;
  closeModal: () => void;
  onFormSubmit: (values: TransactionInput) => void;
  isFetching: boolean;
  isSubmitting: boolean;
};

const validations = {
  date: {
    required: {
      value: true,
      message: 'Required',
    },
  },
  accountId: {
    required: {
      value: true,
      message: 'Which account?',
    },
  },
  type: {
    required: {
      value: true,
      message: 'Income or Expense?',
    },
  },
  payee: {
    required: {
      value: true,
      message: 'Please add a payee',
    },
  },
  amount: {
    required: {
      value: true,
      message: 'Please add an amount',
    },
    custom: {
      isValid: (value: string) => isValidCurrencyFormat(value),
      message: 'Must be in $1,000.00 format',
    },
  },
};

function EditForm({
  transaction,
  categories = [],
  accounts = [],
  isOpen,
  closeModal,
  onFormSubmit,
  isFetching,
  isSubmitting,
}: Props) {
  const [transDate, setTransDate] = useState(new Date(transaction.date));
  const initialValue = {
    date: new Date(transaction.date),
    accountId: transaction.accountId ? transaction.accountId : '',
    description: transaction.description ? transaction.description : '',
    categoryId: transaction.category?.id ? transaction.category.id : '',
    type: transaction.type,
    payee: transaction.payee,
    amount: formatMoneyFromCentsToDollars(transaction.amount, false),
  };
  const {
    values,
    handleSubmit,
    handleChange,
    handleTrim,
    errors,
  } = useForm<TransactionFields>({
    initialValue,
    validations,
    onSubmit: () =>
      onFormSubmit({
        ...values,
        date: transDate,
        amount: convertInputAmountToCents(values.amount),
      }),
  });

  //TODO: Disable button when submitting and add progress bar
  return (
    <Overlay isOpen={isOpen} onDismiss={closeModal}>
      <Content aria-label="Add transaction form">
        <Header>
          <IconButton blue small onClick={closeModal} ariaText="Close">
            <CloseIcon />
          </IconButton>
          <Title>Edit transaction</Title>
        </Header>
        {isSubmitting && <Progressbar />}
        {isFetching ? (
          <FormLoader />
        ) : (
          <form onSubmit={handleSubmit}>
            <Body>
              <Row>
                <Col width="25%">
                  <BorderedDatePicker
                    selected={transDate}
                    onChange={(date: Date) => setTransDate(date)}
                    label="Date *"
                  />

                  <ErrorMessage>
                    {errors.date ? errors.date : null}
                  </ErrorMessage>
                </Col>
                <Col width="37.5%">
                  <BorderedSelect
                    value={values.accountId}
                    onChange={handleChange('accountId')}
                    label="Account *"
                  >
                    <option value="" disabled></option>
                    {accounts.map((acct) => (
                      <option
                        key={acct.id}
                        value={acct.id}
                        data-testid="acct-option"
                      >
                        {acct.accountName}
                      </option>
                    ))}
                  </BorderedSelect>
                  <ErrorMessage>
                    {errors.accountId ? errors.accountId : null}
                  </ErrorMessage>
                </Col>
                <Col width="37.5%">
                  <BorderedSelect
                    value={values.type}
                    onChange={handleChange('type')}
                    label="Type *"
                  >
                    <option value="" disabled></option>
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                  </BorderedSelect>
                  <ErrorMessage>
                    {errors.type ? errors.type : null}
                  </ErrorMessage>
                </Col>
              </Row>
              <Row>
                <Col width="100%">
                  <BorderedInput
                    value={values.payee}
                    type="text"
                    onChange={handleChange('payee')}
                    onBlur={handleTrim('payee')}
                  >
                    Payee *
                  </BorderedInput>
                  <ErrorMessage>
                    {errors.payee ? errors.payee : null}
                  </ErrorMessage>
                </Col>
              </Row>
              <Row>
                <Col width="100%">
                  <BorderedInput
                    value={values.description}
                    type="text"
                    onChange={handleChange('description')}
                    onBlur={handleTrim('description')}
                  >
                    Description
                  </BorderedInput>
                </Col>
              </Row>
              <Row>
                <Col width="50%">
                  <BorderedInput
                    value={values.amount}
                    type="text"
                    onChange={handleChange('amount')}
                    onBlur={handleTrim('amount')}
                    withPrefix
                    prefix="$"
                  >
                    Amount *
                  </BorderedInput>
                  <ErrorMessage>
                    {errors.amount ? errors.amount : null}
                  </ErrorMessage>
                </Col>
                <Col width="50%">
                  <BorderedSelect
                    value={values.categoryId}
                    onChange={handleChange('categoryId')}
                    label="Category"
                  >
                    <option value="" disabled></option>
                    {categories.map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.id}
                        data-testid="category-option"
                      >
                        {cat.name}
                      </option>
                    ))}
                  </BorderedSelect>
                </Col>
              </Row>
            </Body>
            <Footer>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </Footer>
          </form>
        )}
      </Content>
    </Overlay>
  );
}

export default EditForm;
