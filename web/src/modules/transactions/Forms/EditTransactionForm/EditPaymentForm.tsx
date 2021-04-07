import { useState } from 'react';
import Button from '@Common/Button';
import { Transaction, Category, Account, TransactionInput } from '@Generated/graphql';
import { Body, Footer } from '../style';
import {
  BorderedInput,
  BorderedSelect,
  ErrorMessage,
  BorderedDatePicker,
} from '@Common/FormElements';
import { Row, Col } from '@Globals/index';
import { useForm } from '@Hooks/useForm';
import {
  formatMoneyFromCentsToDollars,
  convertInputAmountToCents,
} from '@Lib/money-utils';
import { TransactionFields } from '../types';
import { paymentFormValidations } from '../formValidations';
import Progressbar from '@Common/Progressbar';

type Props = {
  transaction: Transaction;
  categories: Category[] | undefined;
  accounts: Account[] | undefined;
  onFormSubmit: (values: TransactionInput) => void;
  isSubmitting: boolean;
};

function EditPaymentForm({
  transaction,
  categories = [],
  accounts = [],
  onFormSubmit,
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
    validations: paymentFormValidations,
    onSubmit: () =>
      onFormSubmit({
        ...values,
        date: transDate,
        amount: convertInputAmountToCents(values.amount),
      }),
  });

  //TODO: Disable button when submitting and add progress bar
  return (
    <>
      {isSubmitting && <Progressbar />}
      <form onSubmit={handleSubmit}>
        <Body>
          <Row>
            <Col width="25%">
              <BorderedDatePicker
                selected={transDate}
                onChange={(date: Date) => setTransDate(date)}
                label="Date *"
              />

              <ErrorMessage>{errors.date ? errors.date : null}</ErrorMessage>
            </Col>
            <Col width="37.5%">
              <BorderedSelect
                value={values.accountId}
                onChange={handleChange('accountId')}
                label="Account *"
              >
                <option value="" disabled></option>
                {accounts.map((acct) => (
                  <option key={acct.id} value={acct.id} data-testid="acct-option">
                    {acct.accountName}
                  </option>
                ))}
              </BorderedSelect>
              <ErrorMessage>{errors.accountId ? errors.accountId : null}</ErrorMessage>
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
              <ErrorMessage>{errors.type ? errors.type : null}</ErrorMessage>
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
              <ErrorMessage>{errors.payee ? errors.payee : null}</ErrorMessage>
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
              <ErrorMessage>{errors.amount ? errors.amount : null}</ErrorMessage>
            </Col>
            <Col width="50%">
              <BorderedSelect
                value={values.categoryId}
                onChange={handleChange('categoryId')}
                label="Category"
              >
                <option value="" disabled></option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} data-testid="category-option">
                    {cat.name}
                  </option>
                ))}
              </BorderedSelect>
            </Col>
          </Row>
        </Body>
        <Footer>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            Save
          </Button>
        </Footer>
      </form>
    </>
  );
}

export default EditPaymentForm;
